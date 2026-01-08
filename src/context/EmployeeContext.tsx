import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { storage, generateEmployeeId } from '../utils/helpers';
import { mockEmployees } from '../utils/mockData';
import { Employee, EmployeeFormData, GenderFilter, StatusFilter } from '../types';

interface EmployeeStats {
    total: number;
    active: number;
    inactive: number;
}

interface EmployeeContextType {
    employees: Employee[];
    filteredEmployees: Employee[];
    isLoading: boolean;
    stats: EmployeeStats;
    searchQuery: string;
    genderFilter: GenderFilter;
    statusFilter: StatusFilter;
    setSearchQuery: (query: string) => void;
    setGenderFilter: (filter: GenderFilter) => void;
    setStatusFilter: (filter: StatusFilter) => void;
    clearFilters: () => void;
    addEmployee: (employeeData: EmployeeFormData) => Employee;
    updateEmployee: (id: string, employeeData: Partial<Employee>) => void;
    deleteEmployee: (id: string) => void;
    deleteMultipleEmployees: (ids: string[]) => void;
    toggleEmployeeStatus: (id: string) => void;
    getEmployeeById: (id: string) => Employee | null;
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

const STORAGE_KEY = 'employees_data';

interface EmployeeProviderProps {
    children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    // Initialize employees from localStorage or mock data
    useEffect(() => {
        const savedEmployees = storage.get<Employee[]>(STORAGE_KEY);
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

    // Add new employee - prepend to show at top
    const addEmployee = (employeeData: EmployeeFormData): Employee => {
        const newEmployee: Employee = {
            ...employeeData,
            id: generateEmployeeId(),
        };
        setEmployees((prev) => [newEmployee, ...prev]);
        return newEmployee;
    };

    // Update existing employee
    const updateEmployee = (id: string, employeeData: Partial<Employee>) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === id ? { ...emp, ...employeeData } : emp))
        );
    };

    // Delete employee
    const deleteEmployee = (id: string) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    // Delete multiple employees (bulk delete)
    const deleteMultipleEmployees = (ids: string[]) => {
        setEmployees((prev) => prev.filter((emp) => !ids.includes(emp.id)));
    };

    // Toggle active status
    const toggleEmployeeStatus = (id: string) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === id ? { ...emp, isActive: !emp.isActive } : emp))
        );
    };

    // Get employee by ID
    const getEmployeeById = (id: string): Employee | null => {
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
    const stats = useMemo((): EmployeeStats => {
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

    const value: EmployeeContextType = {
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
        deleteMultipleEmployees,
        toggleEmployeeStatus,
        getEmployeeById,
    };

    return (
        <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
    );
};

export const useEmployees = (): EmployeeContextType => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
};
