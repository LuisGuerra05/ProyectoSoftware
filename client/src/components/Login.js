// frontend/components/Login.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartProvider';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(CartContext); // Obtenemos setIsLoggedIn del contexto

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de email personalizada
    if (!validateEmail(email)) {
      setEmailError(t('Por favor, introduce una dirección de correo electrónico válida.'));
      return;
    } else {
      setEmailError('');
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setIsSuccess(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);

        // Después de iniciar sesión exitosamente
        const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (guestCart.length > 0) {
          // Enviar el carrito de invitado al backend para combinarlo
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

        navigate('/');
      } else {
        setMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error en el inicio de sesión');
      setIsSuccess(false);
    }
  };

  return (
    <Container className="login-container" style={{ marginTop: '50px', maxWidth: '500px' }}>
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="text-center">{t('login-title')}</h1>
          <Form onSubmit={handleLogin} noValidate>
            {/* Deshabilitar validación automática del navegador */}
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
              {t('login-submit')}
            </Button>
          </Form>

          {message && (
            <Alert variant={isSuccess ? 'success' : 'danger'} className="mt-3">
              {message}
            </Alert>
          )}
          <div className="mt-3 text-center">
            <p>
              {t('register-title')}{' '}
              <Link to="/register" className="register-link">
                {t('register-submit')}
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
