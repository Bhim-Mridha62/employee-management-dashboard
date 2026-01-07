import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../../context/EmployeeContext';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import EmptyState from '../../components/EmptyState/EmptyState';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { formatDate, capitalize } from '../../utils/helpers';
import './Employees.css';

const Employees = () => {
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
    } = useEmployees();

    const [deleteModal, setDeleteModal] = useState({ isOpen: false, employee: null });

    const handleDeleteClick = (employee) => {
        setDeleteModal({ isOpen: true, employee });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.employee) {
            deleteEmployee(deleteModal.employee.id);
            setDeleteModal({ isOpen: false, employee: null });
        }
    };

    const handlePrintAll = () => {
        const printWindow = window.open('', '_blank');
        const tableRows = filteredEmployees
            .map(
                (emp) => `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.fullName}</td>
          <td>${capitalize(emp.gender)}</td>
          <td>${formatDate(emp.dob)}</td>
          <td>${emp.state}</td>
          <td><span class="status ${emp.isActive ? 'active' : 'inactive'}">${emp.isActive ? 'Active' : 'Inactive'}</span></td>
        </tr>
      `
            )
            .join('');

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
            .meta { color: #64748b; margin-bottom: 20px; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f3f4f6; color: #374151; text-align: left; padding: 12px; font-size: 12px; text-transform: uppercase; }
            td { padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
            .status.active { background: #dcfce7; color: #166534; }
            .status.inactive { background: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>
          <h1>Employee List</h1>
          <p class="meta">Generated on ${new Date().toLocaleDateString('en-IN')} | Total: ${filteredEmployees.length} employees</p>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    if (isLoading) {
        return <Loader text="Loading employees..." />;
    }

    return (
        <div className="employees-page">
            <div className="employees-header">
                <h2>Employee Directory</h2>
                <div className="employees-actions">
                    <button className="btn-print-all" onClick={handlePrintAll}>
                        <span>🖨️</span>
                        Print List
                    </button>
                    <Link to="/employees/add" className="btn-add-employee">
                        <span>➕</span>
                        Add Employee
                    </Link>
                </div>
            </div>

            <SearchFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                genderFilter={genderFilter}
                onGenderChange={setGenderFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                onClearFilters={clearFilters}
            />

            <p className="employees-count">
                Showing <strong>{filteredEmployees.length}</strong> employee
                {filteredEmployees.length !== 1 ? 's' : ''}
            </p>

            {filteredEmployees.length > 0 ? (
                <EmployeeTable
                    employees={filteredEmployees}
                    onToggleStatus={toggleEmployeeStatus}
                    onDelete={handleDeleteClick}
                />
            ) : (
                <EmptyState
                    icon="🔍"
                    title="No Employees Found"
                    message="No employees match your current filters. Try adjusting your search criteria."
                    actionText="Clear Filters"
                    onAction={clearFilters}
                />
            )}

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, employee: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Employee"
                message={`Are you sure you want to delete "${deleteModal.employee?.fullName}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="warning"
            />
        </div>
    );
};

export default Employees;
