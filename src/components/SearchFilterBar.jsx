import React, { useState } from 'react';
import './SearchFilterBar.css';

function SearchFilterBar({ onFilterChange }) {
  const [searchText, setSearchText] = useState('');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');

  const updateFilters = (next) => {
    onFilterChange(next);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    updateFilters({ searchText: value, priority, status });
  };

  const handlePriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
    updateFilters({ searchText, priority: value, status });
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    updateFilters({ searchText, priority, status: value });
  };

  return (
    <div className="search-filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search tasks..."
        value={searchText}
        onChange={handleSearchChange}
      />

      <select className="filter-select" value={priority} onChange={handlePriorityChange}>
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select className="filter-select" value={status} onChange={handleStatusChange}>
        <option value="All">All Statuses</option>
        <option value="To Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default SearchFilterBar;