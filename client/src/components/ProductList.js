import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import './ProductList.css';
import { CartContext } from '../context/CartProvider'; // Importar el contexto del carrito

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
  const productType = name.includes('Local') ? 'Local' :
                      name.includes('Visita') ? 'Visita' :
                      name.includes('Tercera') ? 'Tercera' : 
                      name.includes('Cuarta') ? 'Cuarta' : 'Portero';
  const fileName = `${teamFolder}_${productType}_24_1.jpg`;
  return `${basePath}/${teamFolder}/${productType}/${fileName}`;
};

const ProductList = () => {
  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // Estado para la talla seleccionada
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  // Función para abrir el modal
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Detiene la propagación del click
    setSelectedProduct(product);
    setSelectedSize(null); // Reiniciar la talla seleccionada
    setErrorMessage(''); // Limpiar el mensaje de error cuando se abre el modal
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setSelectedProduct(null);
    setErrorMessage(''); // Limpiar el mensaje de error cuando se cierra el modal
  };

  // Función para seleccionar la talla
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessage(''); // Limpiar el mensaje de error al seleccionar una talla
  };

  // Función para agregar el producto al carrito
  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage(t('Debe seleccionar una talla')); // Mostrar mensaje de error si no se selecciona una talla
      return;
    }

    // Agregar el producto al carrito con la talla seleccionada
    addToCart(selectedProduct, selectedSize);
    handleClose(); // Cerrar el modal
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <p>{t('no-products')}</p>;
  }

  return (
    <Container style={{ paddingTop: '40px' }}>
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 clickable-card" onClick={() => window.location.href = `/product/${product.id}`}>
              {/* Link al detalle del producto */}
              <Card.Img 
                variant="top" 
                src={getImageUrl(product.team, product.name)} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/default-product.png';
                }} 
              />
              <Card.Body>
                <small>{product.brand}</small>
                <Card.Title>{product.team}</Card.Title>
                <Card.Text>{product.name}</Card.Text>
                <h4>${product.price}</h4>
                <div className="d-flex justify-content-center mt-2">
                  <Button className="custom-blue-btn" onClick={(e) => handleAddToCart(e, product)}>
                    {t('add-to-cart')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para seleccionar talla y agregar al carrito */}
      <Modal show={!!selectedProduct} onHide={handleClose} className="fixed-size-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontSize: '1.2em' }}>{selectedProduct?.team}</span>
            <br />
            <span style={{ fontSize: '0.8em', color: '#555' }}>{selectedProduct?.name}</span>
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

            {/* Mostrar el mensaje de error debajo de las tallas */}
            {errorMessage && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {errorMessage}
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
