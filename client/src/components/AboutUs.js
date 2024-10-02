// src/AboutUs.js
import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>Acerca de Nosotros</h1>
      <p>
        Bienvenido a nuestra tienda de camisetas oficiales de los 20 equipos de la Liga Española.
        Ofrecemos todas las equipaciones oficiales de local, visitante, tercera y de portero, con la mejor calidad
        para que representes a tu equipo favorito.
      </p>
      <div className="features-container">
        <div className="feature-card">
          <img src="/images/feature1.png" alt="Calidad Garantizada" />
          <h3>Calidad Garantizada</h3>
          <p>
            Nuestras camisetas están fabricadas con los mejores materiales, asegurando la comodidad y durabilidad que buscas para representar a tu equipo.
          </p>
        </div>
        <div className="feature-card">
          <img src="/images/feature2.jpg" alt="Pasión por el Fútbol" />
          <h3>Pasión por el Fútbol</h3>
          <p>
            Somos un equipo apasionado por el fútbol y por ofrecerte lo mejor en merchandising de tu club favorito.
          </p>
        </div>
        <div className="feature-card">
          <img src="/images/feature3.png" alt="Envíos a Todo el Mundo" />
          <h3>Envíos a Todo el Mundo</h3>
          <p>
            Sin importar dónde te encuentres, hacemos llegar las camisetas de tu equipo hasta tu puerta, rápido y seguro.
          </p>
        </div>
        <div className="feature-card">
          <img src="/images/feature4.png" alt="Atención al Cliente" />
          <h3>Atención al Cliente</h3>
          <p>
            Nuestro equipo de atención al cliente está disponible para resolver cualquier duda o inquietud, ofreciéndote la mejor experiencia.
          </p>
        </div>
      </div>

      <div className="mission-section">
        <h2>Nuestra Misión</h2>
        <p>
          Queremos que cada aficionado de la Liga Española tenga la posibilidad de representar a su equipo con orgullo, llevando la camiseta oficial de su club favorito, sin importar donde se encuentre.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
