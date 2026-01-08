import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../../context/EmployeeContext';
import { useNotification } from '../../context/NotificationContext';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import EmployeeGrid from '../../components/EmployeeGrid/EmployeeGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { ViewMode } from '../../types';
import { ITEMS_PER_PAGE } from '../../utils/constants'; // Kept as default fallback
import { FaTh, FaList, FaPrint, FaUserPlus, FaTrash, FaSearch } from 'react-icons/fa';
import './Employees.css';

const Employees: React.FC = () => {
    const {
        filteredEmployees,
        isLoading,
        searchQuery,
        genderFilter,
        statusFilter,
        setSearchQuery,
        setGenderFilter,
        setStatusFilter,
        clearFilters,
        toggleEmployeeStatus,
        deleteEmployee,
        deleteMultipleEmployees,
    } = useEmployees();

    const { showNotification } = useNotification();

    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; employeeId: string | null, isBulk: boolean }>({
        isOpen: false,
        employeeId: null,
        isBulk: false
    });

    // Reset page and selection when filters change
    useEffect(() => {
        setCurrentPage(1);
        setSelectedIds([]);
    }, [searchQuery, genderFilter, statusFilter, itemsPerPage]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

    const handleSelectOne = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredEmployees.map(emp => emp.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleDeleteClick = (employee: { id: string, fullName: string }) => {
        setDeleteModal({ isOpen: true, employeeId: employee.id, isBulk: false });
    };

    const handleBulkDeleteClick = () => {
        setDeleteModal({ isOpen: true, employeeId: null, isBulk: true });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.isBulk) {
            deleteMultipleEmployees(selectedIds);
            showNotification(`Successfully deleted ${selectedIds.length} employees`, 'success');
            setSelectedIds([]);
        } else if (deleteModal.employeeId) {
            deleteEmployee(deleteModal.employeeId);
            showNotification('Employee deleted successfully', 'success');
        }
        setDeleteModal({ isOpen: false, employeeId: null, isBulk: false });
    };

    const handlePrintAll = () => {
        window.print();
    };

    if (isLoading) {
        return <Loader text="Loading employees..." />;
    }

    return (
        <div className="employees-page">
            <div className="employees-header">
                <div className="header-title-group">
                    <h2>Employee Directory</h2>
                    <p className="employees-count">
                        Showing <strong>{filteredEmployees.length}</strong> employee{filteredEmployees.length !== 1 ? 's' : ''}
                    </p>
                    <div className="items-per-page-selector">
                        <label htmlFor="itemsPerPage">Show:</label>
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="ipp-select"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={40}>40</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
                <div className="employees-actions">
                    {selectedIds.length > 0 && (
                        <button className="btn-bulk-delete" onClick={handleBulkDeleteClick}>
                            <FaTrash /> Delete ({selectedIds.length})
                        </button>
                    )}
                    <button className="btn-print-all" onClick={handlePrintAll}>
                        <FaPrint /> Print List
                    </button>
                    <Link to="/employees/add" className="btn-add-employee">
                        <FaUserPlus /> Add Employee
                    </Link>
                </div>
            </div>

            <div className="controls-bar">
                <SearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    genderFilter={genderFilter}
                    onGenderChange={setGenderFilter}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    onClearFilters={clearFilters}
                />

                <div className="view-toggle">
                    <button
                        className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                        title="Table View"
                    >
                        <FaList />
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                    >
                        <FaTh />
                    </button>
                </div>
            </div>

            {filteredEmployees.length > 0 ? (
                <>
                    {viewMode === 'table' ? (
                        <EmployeeTable
                            employees={paginatedEmployees}
                            onToggleStatus={toggleEmployeeStatus}
                            onDelete={(emp) => handleDeleteClick(emp)}
                            selectedIds={selectedIds}
                            onSelectOne={handleSelectOne}
                            onSelectAll={handleSelectAll}
                        />
                    ) : (
                        <EmployeeGrid
                            employees={paginatedEmployees}
                            onToggleStatus={toggleEmployeeStatus}
                            onDelete={(emp) => handleDeleteClick(emp)}
                            selectedIds={selectedIds}
                            onSelectOne={handleSelectOne}
                        />
                    )}

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            ) : (
                <EmptyState
                    icon={<FaSearch />}
                    title="No Employees Found"
                    message="No employees match your current filters. Try adjusting your search criteria."
                    actionText="Clear Filters"
                    onAction={clearFilters}
                />
            )}

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, employeeId: null, isBulk: false })}
                onConfirm={handleConfirmDelete}
                title={deleteModal.isBulk ? "Delete Employees" : "Delete Employee"}
                message={deleteModal.isBulk
                    ? `Are you sure you want to delete ${selectedIds.length} selected employees? This action cannot be undone.`
                    : "Are you sure you want to delete this employee? This action cannot be undone."}
                confirmText="Delete"
                cancelText="Cancel"
                type="warning"
            />
        </div>
    );
};

export default Employees;
