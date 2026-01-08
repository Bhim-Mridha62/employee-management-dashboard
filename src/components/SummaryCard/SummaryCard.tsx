import React, { ReactNode } from 'react';
import './SummaryCard.css';

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, variant = 'primary' }) => {
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
