import React from 'react';
import { GENDER_FILTER_OPTIONS, STATUS_OPTIONS } from '../../utils/constants';
import { GenderFilter, StatusFilter } from '../../types';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchFilter.css';

interface SearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    genderFilter: GenderFilter;
    onGenderChange: (filter: GenderFilter) => void;
    statusFilter: StatusFilter;
    onStatusChange: (filter: StatusFilter) => void;
    onClearFilters: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
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
                <span className="search-icon"><FaSearch /></span>
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
                    onChange={(e) => onGenderChange(e.target.value as GenderFilter)}
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
                    onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
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
                    <FaTimes /> Clear Filters
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
