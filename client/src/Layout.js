import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import './App.css';

function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0); // Usar useRef para preservar el valor entre renderizados

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
        setShowNavbar(false); // Ocultar navbar si se hace scroll hacia abajo
      } else {
        setShowNavbar(true); // Mostrar navbar si se hace scroll hacia arriba
      }
      lastScrollY.current = window.scrollY; // Actualizar la referencia de lastScrollY
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // No hace falta agregar `handleScroll` como dependencia

  // Función para cambiar el idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');

  // Redirigir dependiendo de si el usuario está logueado
  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  // Redirigir al carrito si el usuario está logueado, de lo contrario, al login
  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className={`navbar ${showNavbar ? 'navbar-show' : 'navbar-hide'}`}
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/images/LaLiga_Logo.png" alt="Logo" className="logo" />
            {t('Tienda de Camisetas')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">{t('inicio')}</Nav.Link>
              <Nav.Link as={Link} to="/products">{t('productos')}</Nav.Link>
              <Nav.Link as={Link} to="/about">{t('Acerca de Nosotros')}</Nav.Link>
            </Nav>
            <select 
              onChange={(e) => changeLanguage(e.target.value)} 
              aria-label="Cambiar idioma" 
              className="language-selector"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
            <CgProfile 
              size={40}
              onClick={handleProfileClick}
              style={{ cursor: 'pointer', marginLeft: '15px', marginRight: '10px', color: 'white' }} 
            />

            <FaCartShopping
              size={30} // Ajustar el tamaño del icono
              onClick={handleCartClick} 
              style={{ cursor: 'pointer', color: 'white', marginRight: '15px' }} 
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido dinámico de la página */}
      <div style={{ paddingTop: '80px' }}>{children}</div>
    </div>
  );
}

export default Layout;
