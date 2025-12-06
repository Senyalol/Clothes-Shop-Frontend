import React from 'react';
import './Categories.css';

const Categories = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'women', name: 'Женская одежда' },
    { id: 'men', name: 'Мужская одежда' },
    { id: 'accessories', name: 'Аксессуары' },
    { id: 'shoes', name: 'Обувь' },
    { id: 'sale', name: 'Распродажа' }
  ];

  return (
    <section className="categories">
      <div className="container">
        <h3>Категории</h3>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;