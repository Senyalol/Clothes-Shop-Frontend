import React, { useState } from 'react';
import './RegForm.css';

function RegForm({ switchMode, setUser, onBack }) {

  const [login , setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [success, setSuccess] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);

  const [formData, setFormData] = useState({
    loginf: '',
    passwordf: '',
    confirmPasswordf: '',
    firstNamef: '',
    lastNamef: '',
    secretKeyf: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setShowSecretKey(checked);
      
      if (!checked) {
        setSecretKey('');
        setFormData({
          ...formData,
          secretKeyf: ''
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Обновляем соответствующие отдельные состояния
      if (name === 'loginf') setLogin(value);
      if (name === 'passwordf') setPassword(value);
      if (name === 'confirmPasswordf') setConfirmPassword(value);
      if (name === 'firstNamef') setFirstName(value);
      if (name === 'lastNamef') setLastName(value);
      if (name === 'secretKeyf') setSecretKey(value);
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!login.trim()) {
      newErrors.login = 'Имя пользователя обязательно';
    } else if (login.length < 3) {
      newErrors.login = 'Имя должно быть не менее 3 символов';
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    if (!lastName.trim()) {
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

    if(!login || !password || !firstName || !lastName){
      setErrors({general: 'Пожалуйста, заполните все поля.'});
      return;
    }

    if(password !== confirmPassword){
      setErrors({general: 'Пароли не совпадают.'});
      return;
    }

    const userData = {
      login,
      password,
      firstName,
      lastName,
      balance: 0.0,
      secretKey: showSecretKey ? secretKey : "sos"
    };

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
      
      if(!response.ok){
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Ошибка: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Данные пользователя:', data);

      setLogin('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setSecretKey('');
      setShowSecretKey(false);
      setFormData({
        loginf: '',
        passwordf: '',
        confirmPasswordf: '',
        firstNamef: '',
        lastNamef: '',
        secretKeyf: ''
      });
      setErrors({});
      
      alert("Вы успешно зарегистрировались!");

// После успешной регистрации автоматически переключаемся на форму входа через 2 секунды
      setTimeout(() => {
        switchMode(); // Переключиться на форму входа
      }, 1);
    

    }
    catch(error){
      // setErrors({general: error.message});
      console.log(error.message);
      // Сброс формы в случае ошибки
      setLogin('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setSecretKey('');
      setShowSecretKey(false);
      setFormData({
        loginf: '',
        passwordf: '',
        confirmPasswordf: '',
        firstNamef: '',
        lastNamef: '',
        secretKeyf: ''
      });
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
        
        {success && (
          <div className="success-message">
            {success}
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
              className={errors.login ? 'error' : ''}
              placeholder="Придумайте login"
            />
            {errors.login && <span className="error-text">{errors.login}</span>}
          </div>
          
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="firstNamef"
              value={formData.firstNamef}
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
              name="lastNamef"
              value={formData.lastNamef}
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
              name="passwordf"
              value={formData.passwordf}
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
              name="confirmPasswordf"
              value={formData.confirmPasswordf}
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
                name="secretKeyf"
                value={formData.secretKeyf}
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