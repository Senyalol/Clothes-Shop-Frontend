import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext'; // Изменен импорт
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedColor
    }, 1);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          <img src={product.image} alt={product.name} />
        </div>
        <button className="favorite-btn">❤️</button>
      </div>
      
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="price">{product.price.toLocaleString()} ₽</p>
        
        <div className="size-selector">
          <label>Размер:</label>
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        
        <div className="color-selector">
          <label>Цвет:</label>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {product.colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        
        <div className="card-actions">
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            В корзину
          </button>
          <button 
            className="view-details-btn"
            onClick={handleViewDetails}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;