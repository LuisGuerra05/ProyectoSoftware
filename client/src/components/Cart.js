import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartProvider';
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importar para navegar

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

const Cart = () => {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const { t } = useTranslation();
  const navigate = useNavigate(); // Para navegar a la página de login
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');

  const handlePurchase = () => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      alert(t('Debes iniciar sesión para completar la compra'));
      navigate('/login');
    } else {
      // Si está autenticado, completar la compra
      alert(t('Gracias por tu compra'));
      clearCart();
    }
  };

  // Calcular el total de la compra
  const calculateTotal = () => {
    return cart
      .reduce((total, product) => total + parseFloat(product.price || 0), 0)
      .toFixed(2); // Asegúrate de convertir a número con parseFloat
  };

  // Función para manejar la acción de vaciar el carrito
  const handleClearCart = () => {
    setShowModal(true); // Mostrar el modal de confirmación
  };

  // Función para confirmar la acción de vaciar el carrito
  const confirmClearCart = () => {
    clearCart();
    setShowModal(false); // Ocultar el modal después de vaciar el carrito
  };

  return (
    <Container className="cart-page" style={{ marginTop: '50px' }}>
      <h1 style={{ textAlign: 'left' }}>{t('cart')}</h1>
      {cart.length === 0 ? (
        <Card className="shadow-sm p-3 mb-4">
          <Card.Body>
            <h3 style={{ textAlign: 'center' }}>{t('cart-empty')}</h3>
            <p style={{ textAlign: 'center' }}>{t('cart-no-products')}</p>
          </Card.Body>
        </Card>
      ) : (
        <>
          {cart.map((product, index) => (
            <Card key={index} className="mb-4 shadow-sm" style={{ minHeight: '150px', padding: '15px' }}>
              <Row className="align-items-center">
                <Col xs={2} className="d-flex align-items-center justify-content-center">
                  <img 
                    src={getImageUrl(product.team, product.name)} 
                    alt={product.name} 
                    style={{ 
                      maxWidth: '100px', 
                      maxHeight: '100px', 
                      objectFit: 'contain',
                      padding: '5px'
                    }}  
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-product.png';
                    }}
                  />
                </Col>
                <Col xs={6}>
                  <h5>{product.team}: {product.name}</h5>
                  <p>{t('size')}: {product.selectedSize}</p>
                </Col>
                <Col xs={2} className="text-right">
                  <p>${product.price}</p>
                </Col>
                <Col xs={2} className="text-right">
                  <p>{t('quantity')}: 1</p>
                  <Button className="custom-trash-button" onClick={() => removeFromCart(index)}>
                  <FaTrash color="#6c757d" />
                </Button>
                </Col>
              </Row>
            </Card>
          ))}

          {/* Mostrar el total de la compra */}
          <Row className="mt-4 cart-footer">
            <Col xs={6}>
              <h4>Total: ${calculateTotal()}</h4>
            </Col>
          </Row>

          {/* Botones debajo del carrito */}
          <Row className="mt-4 cart-footer">
            <Col>
            <Button variant="secondary" onClick={handleClearCart}>
              {t('cart-clear')}
            </Button>
            </Col>
            <Col className="text-right">
            <Button className="custom-blue-btn" onClick={handlePurchase}>
              {t('Buy')}
            </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Modal de confirmación para vaciar el carrito */}
      <Modal show={showModal}  className="clear-cart-modal" onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('confirm')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {t('cart-clear-confirm')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
          {t('Cancel')}
          </Button>
          <Button className="custom-blue-btn" onClick={confirmClearCart}>
          {t('cart-clear-confirm-btn')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
