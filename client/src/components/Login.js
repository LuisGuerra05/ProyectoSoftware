import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
        localStorage.setItem('token', data.token); // Guarda el token en el localStorage
        localStorage.setItem('username', data.username); // Guarda el username en el localStorage
        navigate('/'); // Redirige a la página de inicio
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
          <h1 className="text-center">Inicia Sesión</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
            </Button>
          </Form>

          {message && (
            <Alert variant={isSuccess ? 'success' : 'danger'} className="mt-3">
              {message}
            </Alert>
          )}

        <div className="mt-3 text-center">
          <p>¿No tienes cuenta? <Link to="/register" className="register-link">Regístrate aquí</Link></p>
        </div>

        </Col>
      </Row>
    </Container>
  );
};

export default Login;
