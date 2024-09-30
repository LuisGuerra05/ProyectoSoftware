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
        {/* Nuevas rutas de imágenes */}
        <img src="/images/Madrid/Local/Madrid_Local_24_1.jpg" alt="Real Madrid Camiseta Local" />
        <img src="/images/Barca/Local/Barca_Local_24_1.jpg" alt="Barcelona Camiseta Local" />
        <img src="/images/Atletico/Local/Atletico_Local_24_1.jpg" alt="Atlético Madrid Camiseta Local" />
      </section>
    </div>
  );
}

export default HomePage;
