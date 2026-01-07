import React from 'react';
import './Toggle.css';

const Toggle = ({ isActive, onToggle, showLabel = true }) => {
    return (
        <div className="toggle-container">
            <button
                type="button"
                className={`toggle-switch ${isActive ? 'active' : ''}`}
                onClick={onToggle}
                aria-label={isActive ? 'Set inactive' : 'Set active'}
            >
                <span className="toggle-slider"></span>
            </button>
            {showLabel && (
                <span className={`toggle-label ${isActive ? 'active' : 'inactive'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                </span>
            )}
        </div>
    );
};

export default Toggle;
