import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEmployees } from '../../context/EmployeeContext';
import { useNotification } from '../../context/NotificationContext';
import { INDIAN_STATES, GENDER_OPTIONS } from '../../utils/constants';
import { formatDateForInput } from '../../utils/helpers';
import { EmployeeFormData } from '../../types';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import Toggle from '../../components/Toggle/Toggle';
import Loader from '../../components/Loader/Loader';
import './EmployeeForm.css';

const EmployeeForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addEmployee, updateEmployee, getEmployeeById, isLoading } = useEmployees();
    const { showNotification } = useNotification();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<EmployeeFormData>({
        fullName: '',
        gender: '' as any,
        dob: '',
        profileImage: undefined,
        state: '',
        isActive: true,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEditMode && id) {
            const employee = getEmployeeById(id);
            if (employee) {
                setFormData({
                    fullName: employee.fullName,
                    gender: employee.gender,
                    dob: formatDateForInput(employee.dob),
                    profileImage: employee.profileImage,
                    state: employee.state,
                    isActive: employee.isActive,
                });
            } else {
                showNotification('Employee not found', 'error');
                navigate('/employees');
            }
        }
    }, [id, isEditMode, getEmployeeById, navigate, showNotification]);

    const validateForm = () => {
        const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        if (!formData.gender) {
            newErrors.gender = 'Please select a gender';
        }

        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        } else {
            const dobDate = new Date(formData.dob);
            const today = new Date();
            if (dobDate >= today) {
                newErrors.dob = 'Date of birth must be in the past';
            }
        }

        if (!formData.state) {
            newErrors.state = 'Please select a state';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof EmployeeFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when field changes
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
            if (isEditMode && id) {
                updateEmployee(id, formData);
                showNotification('Employee updated successfully', 'success');
            } else {
                addEmployee(formData);
                showNotification('New employee added successfully', 'success');
            }
            navigate('/employees');
        } catch (error) {
            console.error('Error saving employee:', error);
            showNotification('Failed to save employee. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loader text="Loading..." />;
    }

    return (
        <div className="employee-form-page">
            <div className="form-header">
                <h2>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h2>
                <p>
                    {isEditMode
                        ? 'Update the employee information below'
                        : 'Fill in the details to add a new employee'}
                </p>
            </div>

            <div className="employee-form-card">
                <form className="employee-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Full Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-input ${errors.fullName ? 'error' : ''}`}
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                            />
                            {errors.fullName && (
                                <span className="form-error">{errors.fullName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Date of Birth <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                className={`form-input ${errors.dob ? 'error' : ''}`}
                                value={formData.dob}
                                onChange={(e) => handleChange('dob', e.target.value)}
                            />
                            {errors.dob && <span className="form-error">{errors.dob}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Gender <span className="required">*</span>
                            </label>
                            <div className="radio-group">
                                {GENDER_OPTIONS.map((option) => (
                                    <label key={option.value} className="radio-option">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option.value}
                                            checked={formData.gender === option.value}
                                            onChange={(e) => handleChange('gender', e.target.value)}
                                            className="radio-input"
                                        />
                                        <span className="radio-label">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.gender && (
                                <span className="form-error">{errors.gender}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                State <span className="required">*</span>
                            </label>
                            <select
                                className={`form-select ${errors.state ? 'error' : ''}`}
                                value={formData.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                            >
                                <option value="">Select a state</option>
                                {INDIAN_STATES.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && (
                                <span className="form-error">{errors.state}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <ImageUpload
                            value={formData.profileImage}
                            onChange={(image) => handleChange('profileImage', image)}
                        />

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <div className="status-toggle">
                                <span className="status-label">Employee Status:</span>
                                <Toggle
                                    isActive={formData.isActive}
                                    onToggle={() => handleChange('isActive', !formData.isActive)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/employees" className="btn-cancel">
                            Cancel
                        </Link>
                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="loader-spinner small"></span>
                                    Saving...
                                </>
                            ) : isEditMode ? (
                                'Update Employee'
                            ) : (
                                'Add Employee'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
