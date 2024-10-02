import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

const ProductCarousel = ({ productId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}/images`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setImages([]);
      }
    };
    fetchImages();
  }, [productId]);

  if (images.length === 0) {
    return <p>No hay imágenes disponibles</p>;
  }

  return (
    <div className="carousel-container">
      <Carousel>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.image_url} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
