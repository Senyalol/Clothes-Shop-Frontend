import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка подписки
    console.log('Email submitted:', email);
    setEmail('');
    alert('Спасибо за подписку!');
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h3>Подпишитесь на рассылку</h3>
          <p>Получайте первыми информацию о новых коллекциях и специальных предложениях</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Подписаться</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;