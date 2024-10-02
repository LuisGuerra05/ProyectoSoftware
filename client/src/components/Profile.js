import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/'); // Redirige al inicio
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Bienvenido a tu perfil.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;
