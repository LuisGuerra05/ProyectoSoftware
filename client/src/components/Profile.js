// frontend/components/Profile.js

import React, { useContext } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartProvider';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { clearCart, setIsLoggedIn } = useContext(CartContext);

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const address = localStorage.getItem('address');  // Obtener la dirección desde localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('address');
    localStorage.removeItem('cart');

    clearCart(false);
    setIsLoggedIn(false);

    navigate('/');
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="mb-4">{t('profile-title')}</h1>
              <p>
                <strong>{t('profile-username')}:</strong> {username ? username : t('default-username')}
              </p>
              <p>
                <strong>{t('profile-email')}:</strong> {email ? email : t('default-email')}
              </p>
              <p>
                <strong>{t('profile-address')}:</strong> {address ? address : t('default-address')}  {/* Mostrar dirección */}
              </p>
              <Button className="custom-blue-btn" onClick={handleLogout}>
                {t('profile-logout')}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;