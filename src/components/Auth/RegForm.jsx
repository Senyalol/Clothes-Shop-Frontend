import React, { useState } from 'react';
import './RegForm.css';

function RegForm({ switchMode, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    secretKey: 'sos'
  });
  
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setShowSecretKey(checked);
      if (!checked) {
        setFormData(prev => ({ ...prev, secretKey: 'sos' }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.login.trim()) {
      newErrors.login = 'Имя пользователя обязательно';
    } else if (formData.login.length < 3) {
      newErrors.login = 'Имя должно быть не менее 3 символов';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      login: formData.login,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      balance: 0.0,
      secretKey: showSecretKey ? formData.secretKey : "sos"
    };

    const result = await onSubmit(userData);
    
    try{

      const response = await fetch('http://localhost:8080/api/users/reg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

       if (!response.ok) {
        const errorText = await response.text(); // Get the error response as text
        console.error('Error response:', errorText); // Log the error response
        throw new Error(`Ошибка: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      alert("Регистрация прошла успешно !");

      setFormData({
        login: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        secretKey: 'sos'
      });
      setShowSecretKey(false);
      setErrors({});
    }
    catch(error){
      console.log(error.message);
      // Сброс формы в случае ошибки
      setFormData({
        login: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        secretKey: 'sos'
      });
      setShowSecretKey(false);
    }

  };

  return (
    <div className="auth-page">
      <div className="regform-container">
        <button className="back-btn" onClick={onBack}>← Назад в магазин</button>
        <h2>Регистрация</h2>
        
        {errors.general && (
          <div className="error-message">
            {errors.general}
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
              className={errors.login ? 'error' : ''}
              placeholder="Придумайте login"
            />
            {errors.login && <span className="error-text">{errors.login}</span>}
          </div>
          
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              placeholder="Введите ваше имя"
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
              placeholder="Введите вашу фамилию"
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Придумайте пароль"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label>Подтвердите пароль:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Повторите пароль"
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showSecretKey}
                onChange={handleChange}
              />
              У меня есть секретный ключ
            </label>
          </div>
          
          {showSecretKey && (
            <div className="form-group">
              <label>Секретный ключ:</label>
              <input
                type="text"
                name="secretKey"
                value={formData.secretKey}
                onChange={handleChange}
                placeholder="Введите секретный ключ"
              />
            </div>
          )}
          
          <button type="submit" className="submit-btn">
            Зарегистрироваться
          </button>
        </form>
        
        <p className="switch-text">
          Уже есть аккаунт?{' '}
          <span className="switch-btn" onClick={switchMode}>
            Войти
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegForm;