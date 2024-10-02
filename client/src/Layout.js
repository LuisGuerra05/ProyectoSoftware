import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import './LanguageSwitch.css'; // Archivo CSS para el conmutador de idioma

function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');
  const lastScrollY = useRef(0);

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
  }, []);

  // Función para cambiar el idioma
  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);
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
            <div className="language-switch" onClick={toggleLanguage}>
              <div className={`toggle-ball ${isEnglish ? 'right' : 'left'}`}></div>
              <span className="language-text esp">ESP</span>
              <span className="language-text eng">ENG</span>
            </div>
            <img 
              src="/images/perfil.png" 
              alt="Perfil" 
              className="profile-icon" 
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }} 
            />
            <img 
              src="/images/carrito.png" 
              alt="Carrito" 
              className="cart-icon" 
              onClick={handleCartClick}
              style={{ cursor: 'pointer' }} 
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
