import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartProvider';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t, i18n } = useTranslation(); // i18n añadido para detectar cambios de idioma
  const navigate = useNavigate();
  const { clearCart, setIsLoggedIn } = useContext(CartContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState(localStorage.getItem('address') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleSaveAddress = async () => {
    setError('');
    setMessage('');

    // Validar que la dirección no esté vacía
    if (!newAddress || newAddress.trim() === '') {
      setError(t('Address is required'));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/update-address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ address: newAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('address', newAddress);
        setMessage(t('Address updated successfully'));
        setIsEditing(false);
      } else {
        setError(t(data.message || 'Error updating the address'));
      }
    } catch (error) {
      setError(t('Error updating the address'));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(''); // Limpiar el mensaje de error
    setMessage(''); // Limpiar el mensaje de éxito
    setNewAddress(localStorage.getItem('address') || ''); // Restaurar la dirección original
  };

  // Efecto para actualizar los mensajes al cambiar el idioma
  useEffect(() => {
    if (error) {
      setError(t('Address is required'));
    }
    if (message) {
      setMessage(t('Address updated successfully'));
    }
  }, [i18n.language]); // Detectar cambios en el idioma

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
                <strong>{t('profile-address')}:</strong>
                {isEditing ? (
                  <>
                    <Form.Control
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      style={{ display: 'inline', width: 'auto', marginLeft: '10px' }}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      style={{ marginLeft: '10px' }}
                      onClick={handleSaveAddress}
                    >
                      {t('profile-save')}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      style={{ marginLeft: '10px' }}
                      onClick={handleCancelEdit}
                    >
                      {t('profile-cancel')}
                    </Button>
                  </>
                ) : (
                  <>
                    {address ? address : t('default-address')}
                    <Button
                      variant="secondary"
                      size="sm"
                      style={{ marginLeft: '10px' }}
                      onClick={() => setIsEditing(true)}
                    >
                      {t('profile-edit')}
                    </Button>
                  </>
                )}
              </p>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
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
