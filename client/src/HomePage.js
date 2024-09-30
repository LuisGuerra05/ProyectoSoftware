import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Asegúrate de tener el CSS incluido.

function HomePage() {
  return (
    <div className="homepage">
      <header className="main-header">
        <h1>Bienvenidos a la Tienda de camisetas </h1>
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
        <img src="https://www.cienporcientofutbol.cl/cdn/shop/files/Camiseta_Local_Real_Madrid_24-25_0f8bd4e7-ac26-44e2-8ccb-9f6b1c0139df_615x615.jpg?v=1719594506" alt="Real Madrid Camiseta" />
        <img src="https://sinergiastore.cl/wp-content/uploads/2024/07/Photoroom_001_20240806_194130.jpg" alt="Barcelona Camiseta" />
        <img src="https://sinergiastore.cl/wp-content/uploads/2024/07/Photoroom_006_20240711_225631-700x700.jpg" alt="Atlético Madrid Camiseta" />
      </section>
    </div>
  );
}

export default HomePage;