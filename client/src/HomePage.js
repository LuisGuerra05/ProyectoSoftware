import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Asegúrate de tener el CSS incluido.
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t , i18n } = useTranslation(); // Hook de traducción

  // Función para cambiar el idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="homepage">
      <header className="main-header">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <select onChange={(e) => changeLanguage(e.target.value)} aria-label="Cambiar idioma">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </header>
      
      <nav className="nav-bar">
        <Link to="/">{t('inicio')}</Link>
        <Link to="/products">{t('productos')}</Link>
        <Link to="/register">Registro</Link>
        <Link to="/login">Login</Link>
        <Link to="/userlist">Lista de Usuarios</Link>
        <Link to="/cart">
          <img src="/images/carrito.png" alt="Carrito de Compras" style={{ width: '20px', marginLeft: '5px' }} />
        </Link>
      </nav>
 
      <section className="home-content">
        {/* Utiliza las imágenes desde la carpeta public */}
        <img src="/images/Madrid/Local/Madrid_Local_24_1.jpg" alt="Real Madrid Camiseta Local 2024-2025" />
        <img src="/images/Barca/Local/Barca_Local_24_1.jpg" alt="Barcelona Camiseta Local 2024-2025" />
        <img src="/images/Atletico/Local/Atletico_Local_24_1.jpg" alt="Atlético Madrid Camiseta Local 2024-2025" />
      </section>
    </div>
  );
}

export default HomePage;
