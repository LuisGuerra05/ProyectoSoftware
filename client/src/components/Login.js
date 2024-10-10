import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartProvider';
import './Login.css';

const Login = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState(''); // Para manejar los errores de email
  const [serverErrorMessage, setServerErrorMessage] = useState(''); // Para manejar los errores del servidor
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(CartContext); // Obtenemos setIsLoggedIn del contexto

  useEffect(() => {
    // Forzar re-renderizado cuando cambia el idioma para traducir el mensaje de error
    if (serverErrorMessage) {
      setServerErrorMessage(t(serverErrorMessage));
    }
  }, [i18n.language, serverErrorMessage, t]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de email personalizada
    if (!validateEmail(email)) {
      setEmailError('invalid-email'); // Clave para error de email no válido
      return;
    } else {
      setEmailError('');
    }

    if (!email || !password) {
      setServerErrorMessage('missing-fields'); // Error si faltan campos
      return;
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
        setServerErrorMessage(''); // Limpiamos cualquier error previo
        setIsSuccess(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('address', data.address); // Guardar la dirección en localStorage

        // Después de iniciar sesión exitosamente
        const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (guestCart.length > 0) {
          const token = data.token;
          await fetch('http://localhost:5000/api/cart/merge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ guestCart }),
          });
          localStorage.removeItem('cart');
        }

        setIsLoggedIn(true); // Actualizamos el estado de autenticación en el contexto
        navigate('/profile'); // Redirigir al perfil o página deseada
      } else {
        setServerErrorMessage('invalid-credentials'); // Error de credenciales
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(t('Error al iniciar sesión:'), error);
      setServerErrorMessage('login-error'); // Error genérico
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
              {emailError === 'invalid-email' && (
                <div style={{ color: 'red' }}>{t('Por favor, introduce una dirección de correo electrónico válida.')}</div>
              )}
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

          {/* Mostrar mensaje de error del servidor */}
          {serverErrorMessage && (
            <Alert variant="danger" className="mt-3">
              {serverErrorMessage === 'invalid-credentials' && t('Email o contraseña incorrectos')}
              {serverErrorMessage === 'missing-fields' && t('Por favor, ingresa todos los campos')}
              {serverErrorMessage === 'login-error' && t('Error en el inicio de sesión')}
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
