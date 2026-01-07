import React from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../../context/EmployeeContext';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import './Dashboard.css';

const Dashboard = () => {
    const { stats } = useEmployees();

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
                    icon="👥"
                    variant="primary"
                />
                <SummaryCard
                    title="Active Employees"
                    value={stats.active}
                    icon="✅"
                    variant="success"
                />
                <SummaryCard
                    title="Inactive Employees"
                    value={stats.inactive}
                    icon="⏸️"
                    variant="warning"
                />
            </div>

            <div className="quick-actions">
                <h3 className="quick-actions-title">Quick Actions</h3>
                <div className="quick-actions-grid">
                    <Link to="/employees/add" className="quick-action-btn">
                        <span className="quick-action-icon">➕</span>
                        Add New Employee
                    </Link>
                    <Link to="/employees" className="quick-action-btn">
                        <span className="quick-action-icon">📋</span>
                        View All Employees
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
