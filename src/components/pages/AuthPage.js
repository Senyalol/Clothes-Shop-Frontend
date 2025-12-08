import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth'; // Изменено с '../components/Auth/Auth'
import RegForm from '../Auth/RegForm'; // Изменено с '../components/Auth/RegForm'
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSwitchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleBackToShop = () => {
    navigate('/');
  };

  const handleLoginSubmit = async (authData) => {
    const result = await login(authData.login, authData.password);
    if (result.success) {
      navigate('/');
    }
    return result;
  };

  const handleRegisterSubmit = async (registerData) => {
    const result = await register(registerData);
    if (result.success) {
      // После успешной регистрации переключаем на логин
      setIsLoginMode(true);
    }
    return result;
  };

  return (
    <div className="auth-page-container">
      {isLoginMode ? (
        <Auth
          switchMode={handleSwitchMode}
          onBack={handleBackToShop}
          onSubmit={handleLoginSubmit}
        />
      ) : (
        <RegForm
          switchMode={handleSwitchMode}
          onBack={handleBackToShop}
          onSubmit={handleRegisterSubmit}
        />
      )}
    </div>
  );
};

export default AuthPage;