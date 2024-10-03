import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ProductCarousel from './ProductCarousel';
import './ProductDetail.css';
import { CartContext } from '../context/CartProvider'; // Importa el contexto del carrito

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { t } = useTranslation();
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext); // Usar el método addToCart del contexto
  const navigate = useNavigate();

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
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem('token')) {
      alert('Por favor, inicie sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      alert('Debe seleccionar una talla');
      return;
    }

    addToCart(product, selectedSize); // Añadir el producto al carrito del frontend
    alert('Producto agregado al carrito');
  };

  return (
    <Container className="product-detail-container">
      <Row>
        <Col md={6}>
          <ProductCarousel productId={product.id} />
        </Col>
        <Col md={6}>
          <div className="product-info">
            <small>{product.brand}</small>
            <h2 className="product-title" style={{ textAlign: 'left' }}>{product.team}</h2>
            <p className="product-name">{product.name}</p>
            <h3 className="product-price">${product.price}</h3>

            <div className="size-selection">
              <p>{t('Select-size')}:</p>
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

            <Button variant="danger" className="add-to-cart-btn" onClick={handleAddToCart}>
              {t('add-to-cart')}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
