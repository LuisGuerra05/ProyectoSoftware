import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Para manejar mensajes de error

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar mensajes previos
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

      // Si el registro fue exitoso
      if (response.ok) {
        setMessage(data.message); // Mostrar mensaje de bienvenida
      } else {
        setError(data.message || 'Error desconocido en el registro'); // Mostrar mensaje de error si hay algún problema (ej. email ya registrado)
      }
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      setError('Error en el registro');
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>

      {/* Mostrar el mensaje de bienvenida o el error */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
