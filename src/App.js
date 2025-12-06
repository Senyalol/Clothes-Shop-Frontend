import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
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

  // Проверяем localStorage при загрузке приложения
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('Пользователь восстановлен из localStorage');
      } catch (error) {
        console.error('Ошибка при чтении пользователя из localStorage:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.selectedSize === product.selectedSize && 
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity: product.quantity || 1 
      }];
    });
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const handleAccountClick = () => {
    if (user) {
      // Выход из аккаунта
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
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
    setCurrentView('main'); // Переключаемся на главную страницу
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  // Главная страница с товарами
  const MainPage = () => (
    <>
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
    </>
  );

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route 
            path="/product/:productId" 
            element={
              <>
                <Header 
                  cartItems={cartItems} 
                  onAccountClick={handleAccountClick}
                  onCartClick={handleCartClick}
                  user={user}
                />
                <ProductDetail onAddToCart={addToCart} />
                <Footer />
              </>
            } 
          />
        </Routes>

        {isCartOpen && (
          <Cart 
            cartItems={cartItems}
            onUpdateCart={updateCart}
            onClose={handleCloseCart}
          />
        )}
      </div>
    </Router>
  );
}

export default App;