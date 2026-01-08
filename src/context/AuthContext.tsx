import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../utils/helpers';

interface User {
    username: string;
    name: string;
    loginTime: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock credentials
const MOCK_USER = {
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const savedUser = storage.get<User>('auth_user');
        if (savedUser) {
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            const userData: User = {
                username: MOCK_USER.username,
                name: MOCK_USER.name,
                loginTime: new Date().toISOString(),
            };
            setUser(userData);
            storage.set('auth_user', userData);
            return { success: true };
        }

        return { success: false, error: 'Invalid username or password' };
    };

    const logout = () => {
        setUser(null);
        storage.remove('auth_user');
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
