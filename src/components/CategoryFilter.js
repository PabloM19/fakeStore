// src/components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="mb-3">
      <select 
        className="form-select" 
        value={selectedCategory} 
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
