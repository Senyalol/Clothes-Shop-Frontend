import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Новая коллекция Осень-Зима 2024</h2>
        <p>Стильная одежда и аксессуары для каждого дня</p>
        <button className="cta-button">Смотреть коллекцию</button>
      </div>
      <div className="hero-image">
        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeG7ZqyTV4zXEYnLAO4e3dR4Xhm42woRZE5Q&s" className="placeholder-image"/>
      </div>
    </section>
  );
};

export default Hero;