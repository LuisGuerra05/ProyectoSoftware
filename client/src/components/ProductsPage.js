import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los productos
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <div>
      <ProductList products={products} /> {/* Pasar el array de productos */}
    </div>
  );
};

export default ProductsPage;
