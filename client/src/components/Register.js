// frontend/components/Register.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartProvider';
import './Register.css';

const Register = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(CartContext); // Obtenemos setIsLoggedIn del contexto

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiamos mensajes anteriores
    setMessage('');
    setError('');
    setEmailError('');

    // Validación de email personalizada
    if (!validateEmail(email)) {
      setEmailError(t('Please enter a valid email address.'));
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', email);

        // Después de registrarse exitosamente
        const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (guestCart.length > 0) {
          // Enviar el carrito de invitado al backend para asociarlo
          const token = data.token;
          await fetch('http://localhost:5000/api/cart/merge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ guestCart }),
          });
          // Limpiar el carrito de localStorage
          localStorage.removeItem('cart');
        }

        setIsLoggedIn(true); // Actualizamos el estado de autenticación en el contexto

        navigate('/'); // Redirigir a la página de inicio
      } else {
        setError(data.message || t('Unknown registration error.'));
      }
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      setError(t('Registration error'));
    }
  };

  return (
    <Container className="register-container" style={{ marginTop: '50px', maxWidth: '500px' }}>
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="text-center">{t('register-title')}</h1>
          <Form onSubmit={handleSubmit} noValidate>
            {/* Deshabilitar la validación automática del navegador */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{t('register-name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('register-name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('login-email')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('login-email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('login-password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('login-password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {t('register-submit')}
            </Button>
          </Form>

          {message && (
            <Alert variant="success" className="mt-3">
              {message}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
