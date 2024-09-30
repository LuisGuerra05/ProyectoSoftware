import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Asegúrate de tener el CSS incluido.

function HomePage() {
  return (
    <div className="homepage">
      <header className="main-header">
        <h1>Bienvenidos a la Tienda de camisetas</h1>
        <p>Encuentra las camisetas de tus equipos favoritos de la Liga Española aquí.</p>
      </header>
      
      <nav className="nav-bar">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/register">Registro</Link>
        <Link to="/login">Login</Link>
        <Link to="/userlist">Lista de Usuarios</Link>
      </nav>

      <section className="home-content">
        {/* Utiliza las imágenes desde la carpeta public */}
        <img src="/images/Madrid/Madrid_Local_24_1.jpg" alt="Real Madrid Camiseta Local 2024-2025" />
        <img src="/images/Barca/Barca_Local_24_1.jpg" alt="Barcelona Camiseta Local 2024-2025" />
        <img src="/images/Atletico/Atletico_Local_24_1.jpg" alt="Atlético Madrid Camiseta Local 2024-2025" />
      </section>
    </div>
  );
}

export default HomePage;
