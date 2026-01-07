import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';

const AuthContext = createContext(null);

// Mock credentials
const MOCK_USER = {
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const savedUser = storage.get('auth_user');
        if (savedUser) {
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (username === MOCK_USER.username && password === MOCK_USER.password) {
            const userData = {
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

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
