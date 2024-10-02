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
        <p className="legend">¡Solo por tiempo limitado! 20% de descuento en las camisetas oficiales del FC Barcelona. ¡No te lo pierdas!</p>
      </div>
      <div>
        <img src="/images/Madrid/Madrid_Promocion.jpg" alt="Promoción 2" />
        <p className="legend">¡Oferta 2x1 en camisetas del Real Madrid! Equípate y comparte con tus amigos. Válido hasta agotar existencias.</p>
      </div>
      <div>
        <img src="/images/Atletico/Local/Atletico_Local_24_3.jpg" alt="Promoción 3" />
        <p className="legend">¡Exclusivo para socios! Obtén un 15% de descuento en la nueva camiseta del Atlético de Madrid. ¡Únete a la pasión rojiblanca!</p>
      </div>
    </Carousel>
  );
}

export default PromotionsCarousel;
