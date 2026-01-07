import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { formatDate, capitalize } from '../../utils/helpers';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onToggleStatus, onDelete }) => {
    const navigate = useNavigate();

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handlePrintSingle = (employee) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Details - ${employee.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { border-bottom: 2px solid #6366f1; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #1e293b; margin: 0; }
            .profile { display: flex; gap: 30px; }
            .avatar { width: 120px; height: 120px; border-radius: 12px; background: #6366f1; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold; }
            .avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; }
            .details { flex: 1; }
            .field { margin-bottom: 12px; }
            .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
            .value { color: #1e293b; font-size: 16px; margin-top: 4px; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
            .status.active { background: #dcfce7; color: #166534; }
            .status.inactive { background: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Employee Details</h1>
          </div>
          <div class="profile">
            <div class="avatar">
              ${employee.profileImage ? `<img src="${employee.profileImage}" alt="${employee.fullName}" />` : getInitials(employee.fullName)}
            </div>
            <div class="details">
              <div class="field">
                <div class="label">Employee ID</div>
                <div class="value">${employee.id}</div>
              </div>
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${employee.fullName}</div>
              </div>
              <div class="field">
                <div class="label">Gender</div>
                <div class="value">${capitalize(employee.gender)}</div>
              </div>
              <div class="field">
                <div class="label">Date of Birth</div>
                <div class="value">${formatDate(employee.dob)}</div>
              </div>
              <div class="field">
                <div class="label">State</div>
                <div class="value">${employee.state}</div>
              </div>
              <div class="field">
                <div class="label">Status</div>
                <div class="value">
                  <span class="status ${employee.isActive ? 'active' : 'inactive'}">
                    ${employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="employee-table-wrapper">
            <div className="employee-table-scroll">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>State</th>
                            <th>Status</th>
                            <th className="no-print">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    <span className="employee-id">{employee.id}</span>
                                </td>
                                <td>
                                    <div className="employee-avatar">
                                        {employee.profileImage ? (
                                            <img src={employee.profileImage} alt={employee.fullName} />
                                        ) : (
                                            getInitials(employee.fullName)
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <span className="employee-name">{employee.fullName}</span>
                                </td>
                                <td>
                                    <span className={`gender-badge ${employee.gender}`}>
                                        {capitalize(employee.gender)}
                                    </span>
                                </td>
                                <td>{formatDate(employee.dob)}</td>
                                <td>{employee.state}</td>
                                <td>
                                    <Toggle
                                        isActive={employee.isActive}
                                        onToggle={() => onToggleStatus(employee.id)}
                                    />
                                </td>
                                <td className="no-print">
                                    <div className="action-buttons">
                                        <button
                                            className="action-btn edit"
                                            onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                            title="Edit employee"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => onDelete(employee)}
                                            title="Delete employee"
                                        >
                                            🗑️
                                        </button>
                                        <button
                                            className="action-btn print"
                                            onClick={() => handlePrintSingle(employee)}
                                            title="Print employee details"
                                        >
                                            🖨️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
