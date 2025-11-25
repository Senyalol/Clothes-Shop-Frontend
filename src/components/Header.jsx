import React from 'react';
import './Header.css';

const Header = ({ cartItems, onAccountClick, user, onCartClick }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>FashionStore</h1>
        </div>
        
        <nav className="nav">
          <ul>
            <li><a href="#home">Главная</a></li>
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
          <button className="cart-btn" onClick={onCartClick}>
            🛒 Корзина ({cartItems.length})
          </button>
          <button className="account-btn" onClick={onAccountClick}>
            {user ? `👤 ${user.username || user.email.split('@')[0]}` : '👤'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;