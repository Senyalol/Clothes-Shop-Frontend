import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';
import { AuthProvider } from './components/context/AuthContext';
import HomePage from './components/pages/HomePage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import AuthPage from './components/pages/AuthPage';
import Layout from './components/MainPage/Layout';
import Cart from './components/Cart';
import { useCart } from './components/context/CartContext';
import './App.css';

// Обертка для страниц с Layout и Cart
const AppWithLayout = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Layout>
      {isCartOpen && <Cart onClose={closeCart} />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppWithLayout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;