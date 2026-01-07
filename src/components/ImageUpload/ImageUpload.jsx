import React, { useRef } from 'react';
import { fileToBase64 } from '../../utils/helpers';
import './ImageUpload.css';

const ImageUpload = ({ value, onChange, error }) => {
    const inputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                return;
            }

            try {
                const base64 = await fileToBase64(file);
                onChange(base64);
            } catch (err) {
                console.error('Error converting file to base64:', err);
            }
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="image-upload">
            <label className="image-upload-label">Profile Image</label>
            <div className={`image-upload-area ${value ? 'has-image' : ''}`}>
                <input
                    ref={inputRef}
                    type="file"
                    className="image-upload-input"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {value ? (
                    <>
                        <img src={value} alt="Preview" className="image-preview" />
                        <div className="image-upload-actions">
                            <button
                                type="button"
                                className="remove-image-btn"
                                onClick={handleRemove}
                            >
                                Remove
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="image-upload-placeholder">
                        <span className="image-upload-icon">📷</span>
                        <span className="image-upload-text">
                            Click to upload
                            <br />
                            or drag & drop
                        </span>
                    </div>
                )}
            </div>
            {error && <span className="image-upload-error">{error}</span>}
        </div>
    );
};

export default ImageUpload;
