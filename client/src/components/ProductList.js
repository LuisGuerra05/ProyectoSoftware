import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import './ProductList.css';
import { CartContext } from '../context/CartProvider';

// Diccionario de mapeo entre nombres de equipos y nombres de carpetas
const teamFolderMap = {
  'FC Barcelona': 'Barca',
  'Atlético de Madrid': 'Atletico',
  'Real Madrid': 'Madrid',
  'Athletic Club': 'Bilbao',
  'Celta de Vigo': 'Calta',
  'Espanyol': 'Espanyol',
  'Getafe': 'Getafe',
  'Girona': 'Girona',
  'Leganés': 'Leganes',
  'Deportivo Alavés': 'Alaves',
  'Osasuna': 'Osasuna',
  'RCD Mallorca': 'Mallorca',
  'Rayo Vallecano': 'Rayo',
  'Real Betis': 'Betis',
  'Real Sociedad': 'Sociedad',
  'Sevilla FC': 'Sevilla',
  'U.D. Las Palmas': 'Palmas',
  'Valencia': 'Valencia',
  'Real Valladolid': 'Valladolid',
  'Villarreal': 'Villarreal'
};

// Función para generar la URL de la imagen
const getImageUrl = (team, name) => {
  const basePath = '/images';
  const teamFolder = teamFolderMap[team] || team.replace(/\s+/g, '').toLowerCase();
  const productType = name?.includes('Local') ? 'Local' :
                      name?.includes('Visita') ? 'Visita' :
                      name?.includes('Tercera') ? 'Tercera' : 
                      name?.includes('Cuarta') ? 'Cuarta' : 'Portero';
  const fileName = `${teamFolder}_${productType}_24_1.jpg`;
  return `${basePath}/${teamFolder}/${productType}/${fileName}`;
};

// Función para obtener la clave de traducción según el nombre del producto
const getProductTranslationKey = (name) => {
  if (!name) {
    return 'Unknown Jersey';  // Valor por defecto si no hay nombre
  }
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

const ProductList = ({ products }) => { // Recibe los productos como props
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); 
  const [errorMessageKey, setErrorMessageKey] = useState('');
  const { t } = useTranslation();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setSelectedSize(null);
    setErrorMessageKey('');
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setErrorMessageKey('');
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessageKey('');
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      setErrorMessageKey('Debe seleccionar una talla');
      return;
    }
    addToCart(selectedProduct, selectedSize);
    handleClose();
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <p>{t('no-products')}</p>;
  }

  return (
    <Container style={{ paddingTop: '45px' }}>
      <Row>
        {products.map(product => {
          const productTranslationKey = getProductTranslationKey(product.name);
          return (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 clickable-card" onClick={() => window.location.href = `/product/${product.id}`}>
                <Card.Img 
                  variant="top" 
                  src={getImageUrl(product.team, product.name)} 
                  alt={t(productTranslationKey)} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-product.png';
                  }} 
                />
                <Card.Body>
                  <small>{product.brand}</small>
                  <Card.Title>{product.team}</Card.Title>
                  <Card.Text>{t(productTranslationKey)} 2024-2025</Card.Text> {/* Traducir el nombre */}
                  <h4>${product.price}</h4>
                  <div className="d-flex justify-content-center mt-2">
                    <Button className="custom-blue-btn" onClick={(e) => handleAddToCart(e, product)}>
                      {t('add-to-cart')}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Modal para seleccionar talla y agregar al carrito */}
      <Modal show={!!selectedProduct} onHide={handleClose} className="fixed-size-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontSize: '1.2em' }}>{selectedProduct?.team}</span>
            <br />
            <span style={{ fontSize: '0.8em', color: '#555' }}>{t(getProductTranslationKey(selectedProduct?.name))} 2024-2025</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedProduct?.brand}</p>
          <p>{t('price')}: ${selectedProduct?.price}</p>

          <div>
            <strong>{t('select-size')}:</strong>
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

            {errorMessageKey && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {t(errorMessageKey)}
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('Close')}</Button>
          <Button className="custom-blue-btn" onClick={handleConfirmAddToCart}>
            {t('add-to-cart')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
