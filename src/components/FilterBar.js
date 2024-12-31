import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onSortChange }) => {
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('date-asc');

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter);
        onFilterChange(newFilter);  // Pass only filter value
    };


    const handleSortChange = (e) => {
        setSort(e.target.value);
        onSortChange(e.target.value);  // Trigger sorting in App.js
    };

    return (
        <div className="filter-bar">
            <input 
                type="text"
                placeholder="Filter by City or Venue"
                value={filter}
                onChange={handleFilterChange}
            />
            <select value={sort} onChange={handleSortChange}>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="date-desc">Date (Newest First)</option>
                <option value="name-asc">Event Name (A–Z)</option>
                <option value="name-desc">Event Name (Z–A)</option>
            </select>
        </div>
    );
};

export default FilterBar;
