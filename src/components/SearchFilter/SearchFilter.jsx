import React from 'react';
import { GENDER_FILTER_OPTIONS, STATUS_OPTIONS } from '../../utils/constants';
import './SearchFilter.css';

const SearchFilter = ({
    searchQuery,
    onSearchChange,
    genderFilter,
    onGenderChange,
    statusFilter,
    onStatusChange,
    onClearFilters,
}) => {
    const hasActiveFilters =
        searchQuery || genderFilter !== 'all' || statusFilter !== 'all';

    return (
        <div className="search-filter">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by employee name..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="filter-group">
                <select
                    className="filter-select"
                    value={genderFilter}
                    onChange={(e) => onGenderChange(e.target.value)}
                >
                    {GENDER_FILTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button
                    className="clear-filters-btn"
                    onClick={onClearFilters}
                    disabled={!hasActiveFilters}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
