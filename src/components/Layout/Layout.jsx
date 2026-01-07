import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/' || path === '/dashboard') return 'Dashboard';
        if (path === '/employees') return 'Employees';
        if (path === '/employees/add') return 'Add Employee';
        if (path.includes('/employees/edit')) return 'Edit Employee';
        return 'Dashboard';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="layout">
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon">👥</div>
                        <div>
                            <div className="logo-text">EmpManager</div>
                            <div className="logo-subtext">Dashboard</div>
                        </div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <span className="nav-link-icon">📊</span>
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/employees"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <span className="nav-link-icon">👤</span>
                        Employees
                    </NavLink>
                    <NavLink
                        to="/employees/add"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <span className="nav-link-icon">➕</span>
                        Add Employee
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user?.name || 'Admin'}</div>
                            <div className="user-role">Administrator</div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </aside>

            <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

            <main className="main-content">
                <header className="header">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>
                    <h1 className="header-title">{getPageTitle()}</h1>
                    <div className="header-actions"></div>
                </header>

                <div className="page-content">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
