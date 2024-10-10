// frontend/components/Profile.js

import React, { useContext } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartProvider';
import { useTranslation } from 'react-i18next'; // Importar hook para traducción

const Profile = () => {
  const { t } = useTranslation(); // Hook de traducción
  const navigate = useNavigate();

  // Recuperar el carrito y la función clearCart del contexto
  const { clearCart, setIsLoggedIn } = useContext(CartContext);

  // Recuperar el nombre de usuario y el correo de localStorage
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('cart'); // Vaciar el carrito en localStorage

    // Limpiar el carrito en la aplicación (pero no en la base de datos)
    clearCart(false);

    setIsLoggedIn(false); // Actualizamos el estado de autenticación en el contexto

    // Redirigir a la página de inicio
    navigate('/');
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="mb-4">{t('profile-title')}</h1> {/* Título traducido */}
              <p>
                <strong>{t('profile-username')}:</strong> {username ? username : t('default-username')}
              </p>{' '}
              {/* Nombre de usuario traducido */}
              <p>
                <strong>{t('profile-email')}:</strong> {email ? email : t('default-email')}
              </p>{' '}
              {/* Correo electrónico traducido */}
              <Button className="custom-blue-btn" onClick={handleLogout}>
                {t('profile-logout')} {/* Texto de botón traducido */}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
