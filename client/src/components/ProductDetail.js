import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ProductCarousel from './ProductCarousel'; // Importa el carrusel

const ProductDetail = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error al cargar el producto:', error));
  }, [id]);

  if (!product) {
    return <p>{t('loading')}</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          {/* Usar el componente ProductCarousel para mostrar las imágenes del producto */}
          <ProductCarousel productId={product.id} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{t('brand')}: {product.brand}</p>
          <p>{t('price')}: ${product.price}</p>
          <p>{t('stock')}: {product.stock}</p>
          <Button variant="success">{t('add-to-cart')}</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
