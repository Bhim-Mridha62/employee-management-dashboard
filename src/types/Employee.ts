export interface Employee {
    id: string;
    fullName: string;
    gender: 'male' | 'female' | 'other';
    dob: string;
    state: string;
    isActive: boolean;
    profileImage?: string;
}

export type EmployeeFormData = Omit<Employee, 'id'>;

export type GenderFilter = 'all' | 'male' | 'female' | 'other';
export type StatusFilter = 'all' | 'active' | 'inactive';
export type ViewMode = 'table' | 'grid';
