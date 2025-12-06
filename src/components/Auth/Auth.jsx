import React, { useState } from 'react';
import './Auth.css';

function Auth({ switchMode, setUser, onBack }) {
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const [formData, setFormData] = useState({
    loginf: '',
    passwordf: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
     const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'loginf') setLogin(value);
    if (name === 'passwordf') setPassword(value);
    setError(''); // Очищаем ошибку при изменении поля
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!login || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    const authData = {
      login,
      password
    };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error('Error response:', errorText);
        throw new Error(`Ошибка: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Данные пользователя', data);

      // Сохраняем токен в localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('Токен сохранен в localStorage');
      }

      // Сохраняем данные пользователя в localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Вызываем setUser из App.js для обновления состояния
      setUser(data.user || { login: login });

      // Очищаем форму
      setLogin('');
      setPassword('');
      setFormData({
        loginf: '',
        passwordf: ''
      });

    } catch (error) {
      console.log(error.message);
      setError(error.message || 'Ошибка аутентификации');
      
      // Очищаем форму в случае ошибки
      setLogin('');
      setPassword('');
      setFormData({
        loginf: '',
        passwordf: ''
      });
    } finally {
      setLoading(false);
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
              name="loginf"
              value={formData.loginf}
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
              name="passwordf"
              value={formData.passwordf}
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