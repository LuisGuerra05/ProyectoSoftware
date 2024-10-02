import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import './PromotionsCarousel.css'; // Archivo CSS opcional para estilos personalizados

function PromotionsCarousel() {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      interval={3000}
      stopOnHover={true}
    >
      <div>
        <img src="/images/Barca/Local/Barca_Local_24_3.jpg" alt="Promoción 1" />
        <p className="legend">¡Oferta especial en camisetas del Barcelona! 20% de descuento</p>
      </div>
      <div>
        <img src="/images/Madrid/Tercera/Madrid_Tercera_24_4.jpg" alt="Promoción 2" />
        <p className="legend">Real Madrid - Camisetas 2x1 por tiempo limitado</p>
      </div>
      <div>
        <img src="/images/Atletico/Local/Atletico_Local_24_3.jpg" alt="Promoción 3" />
        <p className="legend">Atlético de Madrid: 15% de descuento para miembros</p>
      </div>
    </Carousel>
  );
}

export default PromotionsCarousel;
