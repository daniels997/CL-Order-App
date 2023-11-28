import React from 'react';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-list">
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => {
            // Remove '@' and '#' from category name
            const displayName = category.replace(/[@#]/g, '');

            return (
              <li 
                key={index} 
                className={selectedCategory === category ? 'active-category' : ''}
                onClick={() => onSelectCategory(category)}
              >
                {displayName}
              </li>
            );
          })
        ) : (
          <li>No categories available</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
