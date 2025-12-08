import React, { useState } from 'react';
import './Auth.css';

function Auth({ switchMode, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.login || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    const result = await onSubmit(formData);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Ошибка аутентификации');
      // Сброс формы в случае ошибки
      setFormData({
        login: '',
        password: ''
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <button className="back-btn" onClick={onBack}>← Назад в магазин</button>
        <h2>Вход в аккаунт</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Введите ваш логин"
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
              disabled={loading}
              placeholder="Введите ваш пароль"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        
        <p className="switch-text">
          Нет аккаунта?{' '}
          <span 
            className="switch-btn" 
            onClick={switchMode}
            style={loading ? {pointerEvents: 'none', opacity: 0.5} : {}}
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;