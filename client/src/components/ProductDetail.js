import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ProductCarousel from './ProductCarousel';
import './ProductDetail.css';
import { CartContext } from '../context/CartProvider'; // Importa el contexto del carrito

// Función para obtener la clave de traducción según el nombre del producto
const getProductTranslationKey = (name) => {
  if (name.includes('Local')) {
    return 'Home Jersey';
  } else if (name.includes('Visita')) {
    return 'Away Jersey';
  } else if (name.includes('Tercera')) {
    return 'Third Jersey';
  } else if (name.includes('Cuarta')) {
    return 'Fourth Jersey';
  } else {
    return 'Goalkeeper Jersey';
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { t } = useTranslation();
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext); // Usar el método addToCart del contexto
  const [errorMessageKey, setErrorMessageKey] = useState(''); // Estado para la clave del mensaje de error

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error al cargar el producto:', error));
  }, [id]);

  if (!product) {
    return <p>{t('loading')}</p>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessageKey(''); // Limpiar el mensaje de error al seleccionar una talla
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Si no hay talla seleccionada, establecer la clave del mensaje de error
      setErrorMessageKey('Debe seleccionar una talla');
      return;
    }

    // Agregar el producto al carrito con la talla seleccionada
    addToCart(product, selectedSize);

    // Limpiar la selección de talla y el mensaje de error después de agregar al carrito
    setSelectedSize(null);
    setErrorMessageKey('');
  };

  const productTranslationKey = getProductTranslationKey(product.name);

  return (
    <Container className="product-detail-container">
    <Row>
      <Col md={6}>
        <ProductCarousel productId={product.id} />
      </Col>
      <Col md={6}>
        {/* Aquí agregamos el nuevo contenedor para la info del producto */}
        <div className="product-info-container">
          <div className="product-info">
            <small>{product.brand}</small>
            <h2 className="product-title" style={{ textAlign: 'left' }}>{product.team}</h2>
            <p className="product-name">{t(productTranslationKey)} 2024-2025</p> {/* Traducir el nombre */}
            <h3 className="product-price">${product.price}</h3>

            <div className="size-selection">
              <p>{t('select-size')}:</p>
              <div className="size-buttons">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'dark' : 'outline-secondary'}
                    onClick={() => handleSizeSelect(size)}
                    className="size-btn"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="add-to-cart-btn" onClick={handleAddToCart}>
              {t('add-to-cart')}
            </Button>

            {/* Mostrar el mensaje de error traducido basado en la clave */}
            {errorMessageKey && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {t(errorMessageKey)}
              </p>
            )}
          </div>
        </div> {/* Cierre del nuevo contenedor */}
      </Col>
    </Row>
  </Container>

  );
};

export default ProductDetail;
