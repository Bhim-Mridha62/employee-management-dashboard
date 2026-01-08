import React from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../../context/EmployeeContext';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import { FaUsers, FaUserCheck, FaUserSlash, FaPlus, FaList } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const { stats, employees, toggleEmployeeStatus, deleteEmployee } = useEmployees();

    // Get latest 10 employees (assuming new ones are at the top)
    const previewEmployees = employees.slice(0, 10);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Welcome to Employee Management</h2>
                <p className="dashboard-subtitle">
                    Overview of your workforce and quick actions
                </p>
            </div>

            <div className="summary-cards">
                <SummaryCard
                    title="Total Employees"
                    value={stats.total}
                    icon={<FaUsers />}
                    variant="primary"
                />
                <SummaryCard
                    title="Active Employees"
                    value={stats.active}
                    icon={<FaUserCheck />}
                    variant="success"
                />
                <SummaryCard
                    title="Inactive Employees"
                    value={stats.inactive}
                    icon={<FaUserSlash />}
                    variant="warning"
                />
            </div>

            <div className="quick-actions">
                <h3 className="quick-actions-title">Quick Actions</h3>
                <div className="quick-actions-grid">
                    <Link to="/employees/add" className="quick-action-btn">
                        <span className="quick-action-icon"><FaPlus /></span>
                        Add New Employee
                    </Link>
                    <Link to="/employees" className="quick-action-btn">
                        <span className="quick-action-icon"><FaList /></span>
                        View All Employees
                    </Link>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h3 className="section-title">New Employees</h3>
                    <Link to="/employees" className="view-all-link">View All Employees &rarr;</Link>
                </div>
                {previewEmployees.length > 0 ? (
                    <div className="dashboard-table-container">
                        <EmployeeTable
                            employees={previewEmployees}
                            onToggleStatus={toggleEmployeeStatus}
                            onDelete={(emp) => deleteEmployee(emp.id)}
                        // Selection props are optional now
                        />
                    </div>
                ) : (
                    <p className="no-data-msg">No employees found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
