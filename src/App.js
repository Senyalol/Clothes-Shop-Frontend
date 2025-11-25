import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Auth from './components/Auth/Auth';
import RegForm from './components/Auth/RegForm';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState('main');
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const handleAccountClick = () => {
    if (user) {
      setUser(null);
    } else {
      setCurrentView('auth');
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToAuth = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentView('main');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'auth') {
    return (
      <div className="App auth-view">
        <Auth 
          switchMode={switchToRegister} 
          setUser={handleAuthSuccess}
          onBack={handleBackToMain}
        />
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className="App auth-view">
        <RegForm 
          switchMode={switchToAuth} 
          setUser={handleAuthSuccess}
          onBack={handleBackToMain}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        cartItems={cartItems} 
        onAccountClick={handleAccountClick}
        onCartClick={handleCartClick}
        user={user}
      />
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

      {isCartOpen && (
        <Cart 
          cartItems={cartItems}
          onUpdateCart={updateCart}
          onClose={handleCloseCart}
        />
      )}
    </div>
  );
}

export default App;