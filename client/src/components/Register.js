import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartProvider';
import './Register.css';

const Register = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');  // Estado para manejar el error de email existente

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(CartContext);

  useEffect(() => {
    if (emailError) setEmailError(t('Please enter a valid email address.'));
    if (addressError) setAddressError(t('Please enter your address.'));
    if (error) setError(t('Please fill in all the fields.'));
    if (emailExistsError) setEmailExistsError(t('register-email-exists'));  // Actualizar el mensaje de correo ya existente
  }, [i18n.language, t, emailError, addressError, error, emailExistsError]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setMessage('');
    setError('');
    setEmailError('');
    setAddressError('');
    setEmailExistsError('');  // Limpiar el error del correo duplicado

    // Validar los campos antes de enviarlos
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedAddress = address.trim();

    // Validación de email
    if (!validateEmail(trimmedEmail)) {
      setEmailError(t('Please enter a valid email address.'));
      return;
    }

    // Validación de dirección vacía
    if (!trimmedAddress) {
      setAddressError(t('Please enter your address.'));
      return;
    }

    // Validación de campos vacíos
    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedAddress) {
      setError(t('Please fill in all the fields.'));
      return;
    }

    // Enviar los datos al backend
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
          address: trimmedAddress,
        }),
      });

      const data = await response.json();

      // Si el correo ya está registrado
      if (response.status === 400) {
        setEmailExistsError(t('register-email-exists'));  // Usar el mensaje traducido
        return;
      }

      // Si la respuesta es correcta, navegar a la página de inicio
      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', trimmedEmail);
        localStorage.setItem('address', trimmedAddress);

        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(t('Unknown registration error.'));
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
          <h1 className="text-center">{t('register-submit')}</h1>
          <Form onSubmit={handleSubmit} noValidate>
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

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>{t('register-address')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('register-address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              {addressError && <div style={{ color: 'red' }}>{addressError}</div>}
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

          {emailExistsError && (  // Mostrar el mensaje de error del correo duplicado
            <Alert variant="danger" className="mt-3">
              {emailExistsError}
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
