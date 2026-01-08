import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes
} from 'react-icons/fa';
import './Notification.css';

const Notification = () => {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length === 0) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <FaCheckCircle className="notification-icon" />;
            case 'error': return <FaExclamationCircle className="notification-icon" />;
            case 'warning': return <FaExclamationTriangle className="notification-icon" />;
            case 'info': return <FaInfoCircle className="notification-icon" />;
            default: return <FaInfoCircle className="notification-icon" />;
        }
    };

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`notification-toast ${notification.type}`}
                >
                    {getIcon(notification.type)}
                    <span className="notification-message">{notification.message}</span>
                    <button
                        className="notification-close"
                        onClick={() => removeNotification(notification.id)}
                    >
                        <FaTimes />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;
