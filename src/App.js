import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Hero />
      <Categories 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductGrid 
        selectedCategory={selectedCategory}
        onAddToCart={addToCart}
      />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;