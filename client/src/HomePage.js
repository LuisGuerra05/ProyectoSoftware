import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Asegúrate de tener el CSS incluido.
import './HomePage.css';  // Asegúrate de incluir el archivo de estilo para la cuadrícula.
import { useTranslation } from 'react-i18next';
import PromotionsCarousel from './funciones/PromotionsCarousel'; // Importa el carrusel
const teams = [
  { name: 'FC Barcelona', logo: '/images/Barca/Barca_Escudo.png' },
  { name: 'Real Madrid', logo: '/images/Madrid/Madrid_Escudo.png' },
  { name: 'Atletico de Madrid', logo: '/images/Atletico/Atletico_Escudo.png' },
  { name: 'Athletic Club', logo: '/images/Bilbao/Bilbao_Escudo.png' },
  { name: 'Celta de Vigo', logo: '/images/Celta/Celta_Escudo.png' },
  { name: 'Deportivo Alavés', logo: '/images/Alaves/Alaves_Escudo.png' },
  { name: 'Espanyol', logo: '/images/Espanyol/Espanyol_Escudo.png' },
  { name: 'Getafe', logo: '/images/Getafe/Getafe_Escudo.png' },
  { name: 'Girona', logo: '/images/Girona/Girona_Escudo.png' },
  { name: 'Leganés', logo: '/images/Leganes/Leganes_Escudo.png' },
  { name: 'Osasuna', logo: '/images/Osasuna/Osasuna_Escudo.png' },
  { name: 'RCD Mallorca', logo: '/images/Mollorca/Mallorca_Escudo.png' },
  { name: 'Rayo Vallecano', logo: '/images/Rayo/Rayo_Escudo.png' },
  { name: 'Betis', logo: '/images/Betis/Betis_Escudo.png' },
  { name: 'Real Sociedad', logo: '/images/Sociedad/Sociedad_Escudo.png' },
  { name: 'Sevilla FC', logo: '/images/Sevilla/Sevilla_Escudo.png' },
  { name: 'U.D. Las Palmas', logo: '/images/Palmas/Palmas_Escudo.png' },
  { name: 'Valencia', logo: '/images/Valencia/Valencia_Escudo.png' },
  { name: 'Valladolid', logo: '/images/Valladolid/Valladolid_Escudo.png' },
  { name: 'Villarreal', logo: '/images/Villarreal/Villarreal_Escudo.png' }
];

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

      <PromotionsCarousel /> {/* Carrusel de promociones */}  

      <section className="home-content">
        {/* Aquí va la cuadrícula de escudos */}
        <div className="grid-container">
          {teams.map((team, index) => (
            <div key={index} className="grid-item">
              <img src={team.logo} alt={`${team.name} Escudo`} className="team-logo" />
              <p>{team.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
