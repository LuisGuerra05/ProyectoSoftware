import React, { useState, useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import './App.css';
import './LanguageSwitch.css'; 
import LanguageSwitcher from './LanguageSwitcher'; 
import { CartContext } from './context/CartProvider'; // Importa el contexto del carrito
import Footer from './Footer';  // Importa el footer

function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false); // Estado para el colapso
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Estado para el menú de idioma
  const lastScrollY = useRef(0); 
  const { cart } = useContext(CartContext); // Consumir el contexto del carrito

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
        setShowNavbar(false);
        setIsNavbarCollapsed(false); // Cierra el navbar si la barra sticky se oculta
        setIsLanguageMenuOpen(false); // Cierra el menú de idioma si se hace scroll
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar') && isNavbarCollapsed) {
        setIsNavbarCollapsed(false); // Cierra el navbar si haces clic fuera
      }
      if (!event.target.closest('.language-switcher') && isLanguageMenuOpen) {
        setIsLanguageMenuOpen(false); // Cierra el menú de idioma si haces clic fuera
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNavbarCollapsed, isLanguageMenuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false); // Cierra el menú de idioma al seleccionar un idioma
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
    navigate('/cart');
  };

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className={`navbar ${showNavbar ? 'navbar-show' : 'navbar-hide'}`}
        fixed="top"
        expanded={isNavbarCollapsed} // Controla la visibilidad del colapso
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
              <img src="/images/main-logo-icon.svg" alt="Logo" className="logo" style={{ width: '125px', height: 'auto' }} />
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{t('Epic Kick')}</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)} // Cambia el estado al hacer clic en el toggle
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" onClick={() => setIsNavbarCollapsed(false)}> {/* Cierra el navbar al hacer clic en una opción */}
              <Nav.Link as={Link} to="/">{t('inicio')}</Nav.Link>
              <Nav.Link as={Link} to="/products">{t('productos')}</Nav.Link>
              <Nav.Link as={Link} to="/about">{t('Acerca de Nosotros')}</Nav.Link>
            </Nav>

            <LanguageSwitcher 
              changeLanguage={changeLanguage} 
              isOpen={isLanguageMenuOpen}
              toggle={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} // Cambia el estado del menú de idioma
            />

            <CgProfile 
              size={40}
              onClick={() => {
                handleProfileClick();
                setIsNavbarCollapsed(false); // Cierra el navbar después de clic
              }}
              style={{ cursor: 'pointer', marginLeft: '15px', marginRight: '10px', color: 'white' }} 
            />

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <FaCartShopping
                size={30}
                onClick={() => {
                  handleCartClick();
                  setIsNavbarCollapsed(false); // Cierra el navbar después de clic
                }}
                style={{ cursor: 'pointer', color: 'white', marginRight: '15px' }} 
              />
              {cart.length > 0 && (
                <span className="cart-count">
                  {cart.length}
                </span>
              )}
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido dinámico de la página */}
      <div style={{ paddingTop: '60px', minHeight: 'calc(100vh - 60px)' }}>{children}</div> {/* minHeight garantiza que el contenido ocupe al menos la pantalla */}

      <Footer />  {/* Colocar el footer aquí para que se muestre al final */}
    </div>
  );
}

export default Layout;
