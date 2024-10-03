import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Importar componentes de React Bootstrap
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('');
    setError('');
    
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
        
        // Asegurarte de que el backend te devuelve el nombre y el token
        localStorage.setItem('token', data.token); // Guardar el token
        localStorage.setItem('username', data.username); // Guardar el nombre del usuario
        localStorage.setItem('email', email); // Guardar el email del usuario

        navigate('/'); // Redirigir a la página de inicio después del registro
      } else {
        setError(data.message || 'Error desconocido en el registro');
      }
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      setError('Error en el registro');
    }
  };

  return (
    <Container className="register-container" style={{ marginTop: '50px', maxWidth: '500px' }}>
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="text-center">Regístrate</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

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
              Registrarse
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
