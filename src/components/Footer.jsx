import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>FashionStore</h4>
            <p>Магазин стильной одежды и аксессуаров для современных людей.</p>
          </div>
          
          <div className="footer-section">
            <h5>Категории</h5>
            <ul>
              <li><a href="#women">Женская одежда</a></li>
              <li><a href="#men">Мужская одежда</a></li>
              <li><a href="#shoes">Обувь</a></li>
              <li><a href="#accessories">Аксессуары</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Помощь</h5>
            <ul>
              <li><a href="#shipping">Доставка</a></li>
              <li><a href="#returns">Возврат</a></li>
              <li><a href="#size-guide">Таблица размеров</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Контакты</h5>
            <p>📞 +7 (999) 123-45-67</p>
            <p>✉️ info@fashionstore.ru</p>
            <p>📍 Москва, ул. Примерная, 123</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 FashionStore. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;