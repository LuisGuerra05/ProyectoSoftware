import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

// Diccionario de mapeo entre nombres de equipos y nombres de carpetas
const teamFolderMap = {
  'FC Barcelona': 'Barca',
  'Atlético de Madrid': 'Atletico',
  'Real Madrid': 'Madrid',
  'Athletic Club': 'Bilbao',
  'Celta de Vigo': 'Celta',
  'Espanyol': 'Espanyol',
  'Getafe': 'Getafe',
  'Girona': 'Girona',
  'Leganés': 'Leganes',
  'Deportivo Alavés': 'Alaves',
  'Osasuna': 'Osasuna',
  'RCD Mallorca': 'Mollorca',
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

  // Buscar la carpeta correspondiente en el diccionario
  const teamFolder = teamFolderMap[team] || team.replace(/\s+/g, '').toLowerCase(); 

  // Determinar tipo de producto
  const productType = name.includes('Local') ? 'Local' :
                      name.includes('Visita') ? 'Visita' :
                      name.includes('Tercera') ? 'Tercera' :
                      name.includes('Cuarta') ? 'Cuarta' : 'Portero';

  const fileName = `${teamFolder}_${productType}_24_1.jpg`;

  // Devuelve la ruta completa de la imagen
  return `${basePath}/${teamFolder}/${productType}/${fileName}`;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation(); // Hook de traducción

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  if (!Array.isArray(products) || products.length === 0) {
    return <p>{t('no-products')}</p>;
  }

  return (
    <Container>
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              {/* Mostrar la primera imagen del producto usando la función getImageUrl */}
              <Card.Img 
                variant="top" 
                src={getImageUrl(product.team, product.name)} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/default-product.png'; // Imagen por defecto si no se encuentra
                }} 
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {t('price')}: ${product.price}
                </Card.Text>
                <Button as={Link} to={`/product/${product.id}`} variant="primary">
                  {t('view-details')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
