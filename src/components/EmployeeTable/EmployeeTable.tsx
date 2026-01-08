import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { formatDate, capitalize } from '../../utils/helpers';
import { Employee } from '../../types';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import './EmployeeTable.css';

interface EmployeeTableProps {
    employees: Employee[];
    onToggleStatus: (id: string) => void;
    onDelete: (employee: Employee) => void;
    selectedIds?: string[];
    onSelectOne?: (id: string) => void;
    onSelectAll?: (checked: boolean) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
    employees,
    onToggleStatus,
    onDelete,
    selectedIds = [],
    onSelectOne,
    onSelectAll
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

    const handlePrintSingle = (employee: Employee) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Details - ${employee.fullName}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #f9fafb; color: #1f2937; }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #e5e7eb; }
            .header { background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 40px; color: white; text-align: center; }
            .avatar-container { margin-bottom: 16px; position: relative; }
            .avatar { width: 120px; height: 120px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: bold; color: #4f46e5; border: 4px solid rgba(255,255,255,0.3); margin: 0 auto; overflow: hidden; }
            .avatar img { width: 100%; height: 100%; object-fit: cover; }
            h1 { margin: 0; font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
            .role { font-size: 1.1rem; opacity: 0.9; font-weight: 500; }
            .content { padding: 40px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
            .field { background: #f3f4f6; padding: 16px; border-radius: 12px; }
            .label { font-size: 0.875rem; color: #6b7280; margin-bottom: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
            .value { font-size: 1.125rem; font-weight: 500; color: #111827; }
            .status-badge { display: inline-flex; padding: 4px 12px; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; }
            .status-active { background: #dcfce7; color: #166534; }
            .status-inactive { background: #fee2e2; color: #991b1b; }
            .footer { padding: 24px; text-align: center; color: #6b7280; font-size: 0.875rem; border-top: 1px solid #e5e7eb; background: #f9fafb; }
            
            @media print {
              body { padding: 0; background: white; }
              .container { box-shadow: none; border: none; max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="avatar-container">
                <div class="avatar">
                  ${employee.profileImage ? `<img src="${employee.profileImage}" alt="${employee.fullName}" />` : getInitials(employee.fullName)}
                </div>
              </div>
              <h1>${employee.fullName}</h1>
              <div class="role">Employee ID: ${employee.id}</div>
            </div>
            
            <div class="content">
              <div class="grid">
                <div class="field">
                  <div class="label">Date of Birth</div>
                  <div class="value">${formatDate(employee.dob)}</div>
                </div>
                <div class="field">
                  <div class="label">Gender</div>
                  <div class="value">${capitalize(employee.gender)}</div>
                </div>
                <div class="field">
                  <div class="label">State</div>
                  <div class="value">${employee.state}</div>
                </div>
                <div class="field">
                  <div class="label">Status</div>
                  <div class="value">
                    <span class="status-badge ${employee.isActive ? 'status-active' : 'status-inactive'}">
                      ${employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="footer">
              Generated on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    const isAllSelected = employees.length > 0 && selectedIds.length === employees.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < employees.length;

    return (
        <div className="employee-table-wrapper">
            <div className="employee-table-scroll">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th className="checkbox-column">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={input => {
                                        if (input) input.indeterminate = isIndeterminate;
                                    }}
                                    onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                                    disabled={!onSelectAll}
                                />
                            </th>
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
                            <tr key={employee.id} className={selectedIds.includes(employee.id) ? 'selected-row' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(employee.id)}
                                        onChange={() => onSelectOne && onSelectOne(employee.id)}
                                        disabled={!onSelectOne}
                                    />
                                </td>
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
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => onDelete(employee)}
                                            title="Delete employee"
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="action-btn print"
                                            onClick={() => handlePrintSingle(employee)}
                                            title="Print employee details"
                                        >
                                            <FaPrint />
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
