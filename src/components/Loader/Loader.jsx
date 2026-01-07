import React from 'react';
import './Loader.css';

const Loader = ({ fullScreen = false, text = 'Loading...', size = 'normal' }) => {
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
