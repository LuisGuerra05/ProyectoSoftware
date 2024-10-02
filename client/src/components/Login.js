import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Usar useNavigate para redirigir

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
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
        setMessage(data.message); // Mensaje de éxito
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirige a la página de inicio
      } else {
        setMessage(data.message); // Mostrar el error
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error en el inicio de sesión');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p> {/* Link a registro */}
    </div>
  );
};

export default Login;
