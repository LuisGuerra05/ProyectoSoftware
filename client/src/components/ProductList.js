import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Equipo: {product.team}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <img src={product.image_url} alt={product.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
