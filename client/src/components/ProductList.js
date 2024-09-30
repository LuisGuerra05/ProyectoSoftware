import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation(); // Hook de traducción

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <div>
      <h1>{t('produ-title')}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{t('equipo')} {product.team}</p>
            <p>{t('price')} ${product.price}</p>
            <p>{t('stock')} {product.stock}</p>
            <img src={product.image_url} alt={product.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
