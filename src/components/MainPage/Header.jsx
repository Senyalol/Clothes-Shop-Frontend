import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount, toggleCart } = useCart();

  const handleAccountClick = () => {
    if (user) {
      // Можно добавить выпадающее меню
      logout();
    } else {
      navigate('/auth');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <h1>FashionStore</h1>
        </div>
        
        <nav className="nav">
          <ul>
            <li><a href="/" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>Главная</a></li>
            <li><a href="#women">Женское</a></li>
            <li><a href="#men">Мужское</a></li>
            <li><a href="#accessories">Аксессуары</a></li>
            <li><a href="#sale">Распродажа</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Поиск..." />
            <button>🔍</button>
          </div>
          <button className="cart-btn" onClick={toggleCart}>
            🛒 Корзина ({cartCount})
          </button>
          <button className="account-btn" onClick={handleAccountClick}>
            {user ? `👤 ${user.login || user.username || 'Пользователь'}` : '👤 Войти'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;