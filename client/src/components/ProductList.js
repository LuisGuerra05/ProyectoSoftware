import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'; // Importa Modal desde react-bootstrap
import './ProductList.css';

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
  const basePath = '/images'; // Ruta base de las imágenes
  const teamFolder = teamFolderMap[team] || team.replace(/\s+/g, '').toLowerCase();
  const productType = name.includes('Local') ? 'Local' :
                      name.includes('Visita') ? 'Visita' :
                      name.includes('Tercera') ? 'Tercera' : 
                      name.includes('Cuarta') ? 'Cuarta' :'Portero';
  const fileName = `${teamFolder}_${productType}_24_1.jpg`;
  return `${basePath}/${teamFolder}/${productType}/${fileName}`;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  // Función para abrir el modal
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Detiene la propagación del click para no activar el detalle del producto
    setSelectedProduct(product);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setSelectedProduct(null);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <p>{t('no-products')}</p>;
  }

  return (
    <Container style={{ paddingTop: '30px' }}>
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
                <small>{product.brand}</small> {/* Marca del producto */}
                <Card.Title>{product.team}</Card.Title> {/* Nombre del equipo */}
                <Card.Text>{product.name}</Card.Text> {/* Nombre del producto */}
                <h4>${product.price}</h4> {/* Precio */}
                <div className="d-flex justify-content-center mt-2">
                  <Button variant="danger" onClick={(e) => handleAddToCart(e, product)}>
                    {t('add-to-cart')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para seleccionar talla y agregar al carrito */}
      <Modal show={!!selectedProduct} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* Mostrar el equipo en grande y la descripción del producto más pequeña */}
          <Modal.Title>
            <span style={{ fontSize: '1.2em' }}>{selectedProduct?.team}</span> {/* Nombre del equipo más grande */}
            <br />
            <span style={{ fontSize: '0.8em', color: '#555' }}>{selectedProduct?.name}</span> {/* Nombre del producto más pequeño */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedProduct?.brand}</p>
          <p>{t('price')}: ${selectedProduct?.price}</p>

          <div>
            <strong>{t('select-size')}:</strong>
            <div>
              <Button variant="outline-secondary">S</Button>
              <Button variant="outline-secondary">M</Button>
              <Button variant="outline-secondary">L</Button>
              <Button variant="outline-secondary">XL</Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('close')}</Button>
          <Button variant="success">{t('add-to-cart')}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
