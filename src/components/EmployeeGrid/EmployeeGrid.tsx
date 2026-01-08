import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { formatDate, capitalize } from '../../utils/helpers';
import { Employee } from '../../types';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import './EmployeeGrid.css';

interface EmployeeGridProps {
    employees: Employee[];
    onToggleStatus: (id: string) => void;
    onDelete: (employee: Employee) => void;
    selectedIds: string[];
    onSelectOne: (id: string) => void;
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({
    employees,
    onToggleStatus,
    onDelete,
    selectedIds,
    onSelectOne
}) => {
    const navigate = useNavigate();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="employee-grid">
            {employees.map((employee) => (
                <div key={employee.id} className={`employee-card ${selectedIds.includes(employee.id) ? 'selected' : ''}`}>
                    <div className="card-header">
                        <div className="card-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(employee.id)}
                                onChange={() => onSelectOne(employee.id)}
                            />
                        </div>
                        <div className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                            {employee.isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="card-avatar">
                            {employee.profileImage ? (
                                <img src={employee.profileImage} alt={employee.fullName} />
                            ) : (
                                getInitials(employee.fullName)
                            )}
                        </div>
                        <h3 className="card-name">{employee.fullName}</h3>
                        <p className="card-id">{employee.id}</p>

                        <div className="card-details">
                            <div className="detail-item">
                                <span className="detail-label">Gender:</span>
                                <span className="detail-value">{capitalize(employee.gender)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">DOB:</span>
                                <span className="detail-value">{formatDate(employee.dob)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">State:</span>
                                <span className="detail-value">{employee.state}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="toggle-wrapper">
                            <Toggle
                                isActive={employee.isActive}
                                onToggle={() => onToggleStatus(employee.id)}
                            />
                        </div>
                        <div className="card-actions">
                            <button
                                className="action-btn-icon edit"
                                onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                title="Edit"
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="action-btn-icon delete"
                                onClick={() => onDelete(employee)}
                                title="Delete"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeGrid;
