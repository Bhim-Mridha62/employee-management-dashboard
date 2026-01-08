import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { FaUsers, FaChartPie, FaUserPlus, FaSignOutAlt, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import Notification from '../Notification/Notification';
import './Layout.css';

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${getPageTitle()} | Employee Dashboard`;
    }, [location]);

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
            <Notification />
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon"><FaUsers /></div>
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
                        <span className="nav-link-icon"><FaChartPie /></span>
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/employees"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                        end
                    >
                        <span className="nav-link-icon"><FaUsers /></span>
                        Employees
                    </NavLink>
                    <NavLink
                        to="/employees/add"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <span className="nav-link-icon"><FaUserPlus /></span>
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
                        <span className="nav-link-icon"><FaSignOutAlt /></span>
                        Logout
                    </button>
                </div>
            </aside>

            <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <FaBars />
                        </button>
                        <h1 className="header-title">{getPageTitle()}</h1>
                    </div>
                    <div className="header-actions">
                        <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                            {theme === 'dark' ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </header>

                <div className="page-content"><Outlet /></div>
            </main>
        </div>
    );
};

export default Layout;
