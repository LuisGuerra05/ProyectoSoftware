import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import './App.css';
import './LanguageSwitch.css'; // Asegúrate de tener el CSS para el selector de idioma
import LanguageSwitcher from './LanguageSwitcher'; // Importa el nuevo componente

function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isAuthenticated = !!localStorage.getItem('token');

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

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

            {/* Nuevo selector de idioma */}
            <LanguageSwitcher changeLanguage={changeLanguage} />

            <CgProfile 
              size={40}
              onClick={handleProfileClick}
              style={{ cursor: 'pointer', marginLeft: '15px', marginRight: '10px', color: 'white' }} 
            />

            <FaCartShopping
              size={30}
              onClick={handleCartClick}
              style={{ cursor: 'pointer', color: 'white', marginRight: '15px' }} 
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido dinámico de la página */}
      <div style={{ paddingTop: '60px' }}>{children}</div>
    </div>
  );
}

export default Layout;
