import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  // Retrieve username and email from localStorage
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email'); 

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email'); 
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
              <p><strong>Email:</strong> {email ? email : 'correo@ejemplo.com'}</p> {/* Display email */}
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
