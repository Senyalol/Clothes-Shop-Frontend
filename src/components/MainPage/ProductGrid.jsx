import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import './ProductGrid.css';

// Импортируем данные товаров (можно вынести в отдельный файл)
const productsData = [
  {
    id: 1,
    name: 'Бежевое пальто',
    price: 12999,
    category: 'women',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROARgL2HAH3_eSp_RMkmotMVEMsPyYDLp6iTHckiYtfQx08w3bUOMcARQ_uDO0AR6ikik&usqp=CAU',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['бежевый', 'коричневый'],
    description: 'Элегантное бежевое пальто из качественной шерсти.',
  },
  {
    id: 2,
    name: 'Кожаная куртка',
    price: 15999,
    category: 'men',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HcjWzPF4XBXC1yjwMtffUjdR39-AD15wEQ&s',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['черный', 'коричневый'],
    description: 'Стильная кожаная куртка премиум-качества.',
  },
  {
    id: 3,
    name: 'Шелковое платье',
    price: 8999,
    category: 'women',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1mPG0D0qIE7mfL_DkU6AQYVkDuFlXgzeKQ&s',
    sizes: ['XS', 'S', 'M'],
    colors: ['синий', 'зеленый'],
    description: 'Роскошное шелковое платье с изящным кроем.',
  },
  {
    id: 4,
    name: 'Кожаный ремень',
    price: 2499,
    category: 'accessories',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFhONMxLXmTaOArKTWPzjFzP4_4rurKICbgw&s',
    sizes: ['S', 'M', 'L'],
    colors: ['черный', 'коричневый'],
    description: 'Классический кожаный ремень с металлической пряжкой.',
  },
  {
    id: 5,
    name: 'Кроссовки',
    price: 7999,
    category: 'shoes',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoQQlD95Yc9cqi-ojQ0a_6VGb_uJ1zp64sA&s',
    sizes: ['38', '39', '40', '41', '42'],
    colors: ['белый', 'черный'],
    description: 'Стильные кроссовки для повседневной носки.',
  },
  {
    id: 6,
    name: 'Вязаный свитер',
    price: 5499,
    category: 'women',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyC1fV2ZjmiTJlaNn0FjiOis-oepI3aYpQZg&s',
    sizes: ['S', 'M', 'L'],
    colors: ['бежевый', 'серый', 'бордовый'],
    description: 'Уютный вязаный свитер из мягкой шерсти.',
  }
];

const ProductGrid = ({ selectedCategory }) => {
  const [products, setProducts] = useState(productsData);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="product-grid">
      <div className="container">
        <h3>Популярные товары</h3>
        <div className="products-container">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;