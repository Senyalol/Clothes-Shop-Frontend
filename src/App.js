import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Auth from './components/Auth/Auth';
import RegForm from './components/Auth/RegForm';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState('main'); // 'main', 'auth', 'register'
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleAccountClick = () => {
    if (user) {
      // Если пользователь авторизован - разлогиниваем
      setUser(null);
    } else {
      setCurrentView('auth');
    }
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

  // Если показываем формы аутентификации
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

  // Основной вид приложения
  return (
    <div className="App">
      <Header 
        cartItems={cartItems} 
        onAccountClick={handleAccountClick}
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
    </div>
  );
}

export default App;