import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal, Form, Dropdown } from 'react-bootstrap';
import './ProductList.css';
import { CartContext } from '../context/CartProvider';

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
  'Valladolid': 'Valladolid',
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

// Función para traducir el nombre del producto
const getProductTranslationKey = (name) => {
  if (!name) return 'Unknown Jersey';

  if (name.includes('Local')) return 'Home Jersey';
  if (name.includes('Visita')) return 'Away Jersey';
  if (name.includes('Tercera')) return 'Third Jersey';
  if (name.includes('Cuarta')) return 'Fourth Jersey';
  return 'Goalkeeper Jersey';
};

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTeams, setSelectedTeams] = useState(Object.keys(teamFolderMap));
  const [selectAll, setSelectAll] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);

        // Filtrar automáticamente si se especifica un equipo en la URL
        const params = new URLSearchParams(location.search);
        const teamParam = params.get('team');

        if (teamParam) {
          setSelectedTeams([teamParam]);
          setFilteredProducts(data.filter(product => product.team === teamParam));
          setSelectAll(false);
        } else {
          setFilteredProducts(data);
        }
      })
      .catch(error => console.error('Error al cargar los productos:', error));
  }, [location.search]);

  const handleTeamCheckboxChange = (team) => {
    let newSelectedTeams;
    if (team === 'all') {
      if (selectAll) {
        newSelectedTeams = [];
        setSelectAll(false);
      } else {
        newSelectedTeams = Object.keys(teamFolderMap);
        setSelectAll(true);
      }
    } else {
      newSelectedTeams = selectedTeams.includes(team)
        ? selectedTeams.filter((t) => t !== team)
        : [...selectedTeams, team];
      setSelectAll(newSelectedTeams.length === Object.keys(teamFolderMap).length);
    }

    setSelectedTeams(newSelectedTeams);

    if (newSelectedTeams.length > 0) {
      const filtered = products.filter(product =>
        newSelectedTeams.some(selectedTeam => selectedTeam.toLowerCase() === product.team.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setSelectedSize(null);
    setErrorMessage('');
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setErrorMessage('');
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessage('');
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage(t('Debe seleccionar una talla'));
      return;
    }
    addToCart(selectedProduct, selectedSize);
    handleClose();
  };

  return (
    <Container fluid style={{ paddingTop: '45px' }}>
      <Row className="product-list-row">
        {/* Dropdown para pantallas lg y más pequeñas */}
        <Col lg={12} className="dropdown-filter"> {/* El dropdown se mostrará desde lg hacia abajo */}
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="dropdown-button">
              {t('Filtro por equipo')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form.Check
                type="checkbox"
                label="Todos"
                value="all"
                onChange={() => handleTeamCheckboxChange('all')}
                checked={selectAll}
              />
              {Object.keys(teamFolderMap).map((team) => (
                <Form.Check 
                  key={team}
                  type="checkbox"
                  label={team}
                  value={team}
                  onChange={() => handleTeamCheckboxChange(team)}
                  checked={selectedTeams.includes(team)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Columna para el filtro de equipos para pantallas xl y más grandes */}
        <Col xl={3} className="team-filter"> {/* El filtro se mostrará solo en pantallas xl hacia arriba */}
          <div className="checkbox-container">
            <Form.Group>
              <Form.Label>{t('Filtro por equipo')}</Form.Label>
              <Form.Check
                type="checkbox"
                label="Todos"
                value="all"
                onChange={() => handleTeamCheckboxChange('all')}
                checked={selectAll}
              />
              {Object.keys(teamFolderMap).map((team) => (
                <Form.Check 
                  key={team}
                  type="checkbox"
                  label={team}
                  value={team}
                  onChange={() => handleTeamCheckboxChange(team)}
                  checked={selectedTeams.includes(team)}
                />
              ))}
            </Form.Group>
          </div>
        </Col>

        {/* Columna para la lista de productos */}
        <Col xl={9} className="col-products">
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Col
                  key={product.id}
                  xs={12} sm={12} md={6} lg={4} xl={3} className="mb-4"
                >
                  <Card className="h-100 clickable-card" onClick={() => window.location.href = `/product/${product.id}`}>
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
                      <Card.Text>{t(getProductTranslationKey(product.name))} 2024-2025</Card.Text>
                      <h4>${product.price}</h4>
                      <div className="d-flex justify-content-center mt-2">
                        <Button className="custom-blue-btn" onClick={(e) => handleAddToCart(e, product)}>
                          {t('add-to-cart')}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>{t('no-products')}</p>
            )}
          </Row>
        </Col>
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
