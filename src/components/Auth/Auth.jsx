import React, { useState } from 'react';
import './Auth.css';

function Auth({ switchMode, setUser, onBack }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вход:', formData);
    
    if (formData.email && formData.password) {
      setUser({ 
        email: formData.email,
        username: formData.email.split('@')[0] // Генерируем имя из email
      });
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <button className="back-btn" onClick={onBack}>← Назад в магазин</button>
        <h2>Вход в аккаунт</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Введите ваш email"
            />
          </div>
          
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Введите ваш пароль"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Войти
          </button>
        </form>
        
        <p className="switch-text">
          Нет аккаунта?{' '}
          <span className="switch-btn" onClick={switchMode}>
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;