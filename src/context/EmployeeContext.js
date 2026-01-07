import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage, generateEmployeeId } from '../utils/helpers';
import { mockEmployees } from '../utils/mockData';

const EmployeeContext = createContext(null);

const STORAGE_KEY = 'employees_data';

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Initialize employees from localStorage or mock data
    useEffect(() => {
        const savedEmployees = storage.get(STORAGE_KEY);
        if (savedEmployees && savedEmployees.length > 0) {
            setEmployees(savedEmployees);
        } else {
            setEmployees(mockEmployees);
            storage.set(STORAGE_KEY, mockEmployees);
        }
        setIsLoading(false);
    }, []);

    // Save to localStorage whenever employees change
    useEffect(() => {
        if (!isLoading && employees.length >= 0) {
            storage.set(STORAGE_KEY, employees);
        }
    }, [employees, isLoading]);

    // Add new employee
    const addEmployee = (employeeData) => {
        const newEmployee = {
            ...employeeData,
            id: generateEmployeeId(),
        };
        setEmployees((prev) => [...prev, newEmployee]);
        return newEmployee;
    };

    // Update existing employee
    const updateEmployee = (id, employeeData) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === id ? { ...emp, ...employeeData } : emp))
        );
    };

    // Delete employee
    const deleteEmployee = (id) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    // Toggle active status
    const toggleEmployeeStatus = (id) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === id ? { ...emp, isActive: !emp.isActive } : emp))
        );
    };

    // Get employee by ID
    const getEmployeeById = (id) => {
        return employees.find((emp) => emp.id === id) || null;
    };

    // Filtered employees based on search and filters
    const filteredEmployees = useMemo(() => {
        return employees.filter((emp) => {
            // Search filter
            const matchesSearch = emp.fullName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            // Gender filter
            const matchesGender =
                genderFilter === 'all' || emp.gender === genderFilter;

            // Status filter
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && emp.isActive) ||
                (statusFilter === 'inactive' && !emp.isActive);

            return matchesSearch && matchesGender && matchesStatus;
        });
    }, [employees, searchQuery, genderFilter, statusFilter]);

    // Statistics
    const stats = useMemo(() => {
        const total = employees.length;
        const active = employees.filter((emp) => emp.isActive).length;
        const inactive = total - active;
        return { total, active, inactive };
    }, [employees]);

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setGenderFilter('all');
        setStatusFilter('all');
    };

    const value = {
        employees,
        filteredEmployees,
        isLoading,
        stats,
        searchQuery,
        genderFilter,
        statusFilter,
        setSearchQuery,
        setGenderFilter,
        setStatusFilter,
        clearFilters,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,
        getEmployeeById,
    };

    return (
        <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
    );
};

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
};
