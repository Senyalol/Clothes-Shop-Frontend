import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../ProductDetail';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  return (
    <ProductDetail 
      productId={productId}
      onAddToCart={addToCart}
    />
  );
};

export default ProductDetailPage;