import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ title, value, icon, variant = 'primary' }) => {
    return (
        <div className="summary-card">
            <div className={`summary-card-icon ${variant}`}>{icon}</div>
            <div className="summary-card-content">
                <div className="summary-card-value">{value}</div>
                <div className="summary-card-label">{title}</div>
            </div>
        </div>
    );
};

export default SummaryCard;
