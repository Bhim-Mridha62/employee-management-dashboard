import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import EmployeeForm from './pages/EmployeeForm/EmployeeForm';
import './index.css';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <AuthProvider>
                    <EmployeeProvider>
                        <Router>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<Login />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute>
                                            <Layout />
                                        </ProtectedRoute>
                                    }
                                >
                                    <Route index element={<Navigate to="/dashboard" replace />} />
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="employees" element={<Employees />} />
                                    <Route path="employees/add" element={<EmployeeForm />} />
                                    <Route path="employees/edit/:id" element={<EmployeeForm />} />
                                </Route>

                                {/* Catch all */}
                                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                            </Routes>
                        </Router>
                    </EmployeeProvider>
                </AuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
};

export default App;
