import React, { useState } from 'react';
import Hero from '../MainPage/Hero'; // Изменено с '../components/MainPage/Hero'
import Categories from '../MainPage/Categories'; // Изменено с '../components/MainPage/Categories'
import ProductGrid from '../MainPage/ProductGrid'; // Изменено с '../components/MainPage/ProductGrid'
import Newsletter from '../MainPage/Newsletter'; // Изменено с '../components/MainPage/Newsletter'

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <>
      <Hero />
      <Categories 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductGrid selectedCategory={selectedCategory} />
      <Newsletter />
    </>
  );
};

export default HomePage;