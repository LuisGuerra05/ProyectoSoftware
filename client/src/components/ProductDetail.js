import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ProductCarousel from './ProductCarousel'; // Carrusel para las imágenes
import './ProductDetail.css'; // Importa el CSS

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { t } = useTranslation();
  const [selectedSize, setSelectedSize] = useState(null); // Estado para la talla seleccionada
  const navigate = useNavigate(); // Hook para redirigir

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

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token'); // Asegúrate de que el token exista
  
    if (!token) {
      alert('Por favor, inicie sesión para agregar productos al carrito');
      navigate('/login');  // Redirigir a la página de login si no está logueado
      return;
    }
  
    if (!selectedSize) {
      alert('Debe seleccionar una talla');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Aquí es donde se envía el token
        },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize,
        }),
      });
  
      if (response.ok) {
        alert('Producto agregado al carrito');
      } else {
        const data = await response.json();
        alert(data.message || 'Error al agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
  

  return (
    <Container className="product-detail-container">
      <Row>
        <Col md={6}>
          <ProductCarousel productId={product.id} />
        </Col>
        <Col md={6}>
          <div className="product-info">
            <small>{product.brand}</small> {/* Marca */}
            <h2 className="product-title">{product.team}</h2> {/* Nombre del equipo */}
            <p className="product-name">{product.name}</p> {/* Nombre del producto */}
            <h3 className="product-price">${product.price}</h3> {/* Precio */}

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
