import React, { useContext } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartProvider'; // Importar el contexto del carrito

const Profile = () => {
  const navigate = useNavigate();
  
  // Recuperar el carrito y la función clearCart del contexto
  const { clearCart } = useContext(CartContext);

  // Recuperar el nombre de usuario y el correo de localStorage
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  // Función para cerrar sesión
  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    // Vaciar el carrito en la base de datos
    try {
      await fetch('http://localhost:5000/api/cart/clear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error al vaciar el carrito en la base de datos:', error);
    }

    // Eliminar los datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('cart'); // Vaciar el carrito en localStorage

    // Limpiar el carrito en la aplicación
    clearCart(); // Llamar a clearCart para limpiar el carrito en el contexto

    // Redirigir a la página de inicio
    navigate('/');
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="mb-4">Perfil de Usuario</h1>
              <p><strong>Nombre:</strong> {username ? username : 'Usuario'}</p>
              <p><strong>Email:</strong> {email ? email : 'correo@ejemplo.com'}</p> {/* Mostrar correo */}
              <Button variant="danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
