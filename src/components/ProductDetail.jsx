import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

// Данные товаров (те же что в ProductGrid)
const productsData = [
  {
    id: 1,
    name: 'Бежевое пальто',
    price: 12999,
    category: 'women',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROARgL2HAH3_eSp_RMkmotMVEMsPyYDLp6iTHckiYtfQx08w3bUOMcARQ_uDO0AR6ikik&usqp=CAU',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['бежевый', 'коричневый'],
    description: 'Элегантное бежевое пальто из качественной шерсти. Идеально подходит для прохладной погоды. Классический крой и универсальный цвет делают эту модель must-have в вашем гардеробе.',
    material: 'Шерсть 80%, Полиэстер 20%',
    care: 'Химчистка',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROARgL2HAH3_eSp_RMkmotMVEMsPyYDLp6iTHckiYtfQx08w3bUOMcARQ_uDO0AR6ikik&usqp=CAU',
      'https://example.com/coat2.jpg',
      'https://example.com/coat3.jpg'
    ]
  },
  {
    id: 2,
    name: 'Кожаная куртка',
    price: 15999,
    category: 'men',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HcjWzPF4XBXC1yjwMtffUjdR39-AD15wEQ&s',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['черный', 'коричневый'],
    description: 'Стильная кожаная куртка премиум-качества. Натуральная кожа обеспечивает долговечность и комфорт. Современный дизайн с металлической фурнитурой.',
    material: 'Натуральная кожа 100%',
    care: 'Профессиональная чистка',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HcjWzPF4XBXC1yjwMtffUjdR39-AD15wEQ&s',
      'https://example.com/jacket2.jpg',
      'https://example.com/jacket3.jpg'
    ]
  },
  {
    id: 3,
    name: 'Шелковое платье',
    price: 8999,
    category: 'women',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1mPG0D0qIE7mfL_DkU6AQYVkDuFlXgzeKQ&s',
    sizes: ['XS', 'S', 'M'],
    colors: ['синий', 'зеленый'],
    description: 'Роскошное шелковое платье с изящным кроем. Идеально для особых occasions. Легкая ткань прекрасно драпируется и подчеркивает фигуру.',
    material: 'Шелк 100%',
    care: 'Ручная стирка',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1mPG0D0qIE7mfL_DkU6AQYVkDuFlXgzeKQ&s',
      'https://example.com/dress2.jpg',
      'https://example.com/dress3.jpg'
    ]
  },
  {
    id: 4,
    name: 'Кожаный ремень',
    price: 2499,
    category: 'accessories',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFhONMxLXmTaOArKTWPzjFzP4_4rurKICbgw&s',
    sizes: ['S', 'M', 'L'],
    colors: ['черный', 'коричневый'],
    description: 'Классический кожаный ремень с металлической пряжкой. Универсальный аксессуар, который дополнит любой образ.',
    material: 'Натуральная кожа',
    care: 'Протирать влажной тканью',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFhONMxLXmTaOArKTWPzjFzP4_4rurKICbgw&s',
      'https://example.com/belt2.jpg',
      'https://example.com/belt3.jpg'
    ]
  },
  {
    id: 5,
    name: 'Кроссовки',
    price: 7999,
    category: 'shoes',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoQQlD95Yc9cqi-ojQ0a_6VGb_uJ1zp64sA&s',
    sizes: ['38', '39', '40', '41', '42'],
    colors: ['белый', 'черный'],
    description: 'Стильные кроссовки для повседневной носки. Удобная колодка и качественные материалы обеспечивают комфорт в течение всего дня.',
    material: 'Текстиль, искусственная кожа',
    care: 'Машинная стирка',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoQQlD95Yc9cqi-ojQ0a_6VGb_uJ1zp64sA&s',
      'https://example.com/sneakers2.jpg',
      'https://example.com/sneakers3.jpg'
    ]
  },
  {
    id: 6,
    name: 'Вязаный свитер',
    price: 5499,
    category: 'women',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyC1fV2ZjmiTJlaNn0FjiOis-oepI3aYpQZg&s',
    sizes: ['S', 'M', 'L'],
    colors: ['бежевый', 'серый', 'бордовый'],
    description: 'Уютный вязаный свитер из мягкой шерсти. Идеален для холодного времени года. Современный oversize крой.',
    material: 'Шерсть 70%, Акрил 30%',
    care: 'Ручная стирка',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyC1fV2ZjmiTJlaNn0FjiOis-oepI3aYpQZg&s',
      'https://example.com/sweater2.jpg',
      'https://example.com/sweater3.jpg'
    ]
  }
];

const ProductDetail = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = productsData.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="product-not-found">
            <h2>Товар не найден</h2>
            <button onClick={() => navigate('/')} className="back-button">
              Вернуться в магазин
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Пожалуйста, выберите размер и цвет');
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };

    onAddToCart(cartItem);
    alert('Товар добавлен в корзину!');
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        <div className="product-detail-content">
          {/* Галерея изображений */}
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{formatPrice(product.price)}</p>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Выбор размера */}
            <div className="size-selection">
              <h3>Размер:</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор цвета */}
            <div className="color-selection">
              <h3>Цвет:</h3>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Количество */}
            <div className="quantity-selection">
              <h3>Количество:</h3>
              <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            {/* Кнопка добавления в корзину */}
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              Добавить в корзину - {formatPrice(product.price * quantity)}
            </button>

            {/* Дополнительная информация */}
            <div className="product-specs">
              <div className="spec-item">
                <strong>Материал:</strong> {product.material}
              </div>
              <div className="spec-item">
                <strong>Уход:</strong> {product.care}
              </div>
              <div className="spec-item">
                <strong>Категория:</strong> {getCategoryName(product.category)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для получения названия категории
const getCategoryName = (category) => {
  const categories = {
    'women': 'Женская одежда',
    'men': 'Мужская одежда',
    'accessories': 'Аксессуары',
    'shoes': 'Обувь'
  };
  return categories[category] || category;
};

export default ProductDetail;