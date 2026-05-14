import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: number | undefined;
  onChange: (categoryId: number | undefined) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onChange,
}) => {
  return (
    <div className="category-filter">
      <label htmlFor="category-select">Категория:</label>
      <select
        id="category-select"
        value={selectedCategoryId ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value ? Number(value) : undefined);
        }}
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
