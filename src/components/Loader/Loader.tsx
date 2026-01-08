import React from 'react';
import './Loader.css';

interface LoaderProps {
    fullScreen?: boolean;
    text?: string;
    size?: 'small' | 'normal' | 'large';
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false, text = 'Loading...', size = 'normal' }) => {
    if (fullScreen) {
        return (
            <div className="loader-overlay">
                <div className="loader-container">
                    <div className={`loader-spinner ${size}`}></div>
                    {text && <span className="loader-text">{text}</span>}
                </div>
            </div>
        );
    }

    return (
        <div className="loader-inline">
            <div className="loader-container">
                <div className={`loader-spinner ${size}`}></div>
                {text && <span className="loader-text">{text}</span>}
            </div>
        </div>
    );
};

export default Loader;
