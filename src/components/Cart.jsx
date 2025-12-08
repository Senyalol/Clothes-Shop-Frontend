import React from 'react';
import { useCart } from './context/CartContext';
import './Cart.css';

const Cart = ({ onClose }) => {
  const { cartItems, updateCart, clearCart, cartTotal } = useCart();

  const increaseQuantity = (id) => {
    updateCart(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    updateCart(cartItems.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Корзина покупок</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Ваша корзина пуста</p>
            <button className="continue-shopping" onClick={onClose}>
              Продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Размер: {item.selectedSize}</p>
                    <p>Цвет: {item.selectedColor}</p>
                    <p className="item-price">${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Итого:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="clear-cart" onClick={handleClearCart}>
                  Очистить корзину
                </button>
                <button className="checkout-btn">
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;