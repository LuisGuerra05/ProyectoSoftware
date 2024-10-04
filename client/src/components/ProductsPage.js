import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import { useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Llamada a la API para obtener los productos
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Guardar todos los productos
        console.log('Productos cargados:', data); // Verificar productos cargados
      })
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const team = queryParams.get('team');

    if (team) {
      // Decodificar y normalizar el equipo de la URL
      const decodedTeam = decodeURIComponent(team).trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      console.log('Equipo filtrado (normalizado):', decodedTeam, 'Longitud:', decodedTeam.length);

      // Filtrar los productos, usando localeCompare para asegurar una comparación adecuada
      const filtered = products.filter(product => {
        if (product.team) {
          const normalizedTeam = product.team.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          console.log('Comparando (normalizado):', `"${normalizedTeam}"`, 'con', `"${decodedTeam}"`, 'Longitud producto:', normalizedTeam.length, 'Longitud equipo:', decodedTeam.length);
          return normalizedTeam.localeCompare(decodedTeam) === 0;
        }
        return false;
      });

      console.log('Productos filtrados:', filtered); // Verificar productos filtrados
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Si no hay un equipo, mostrar todos los productos
    }
  }, [location.search, products]); // Volver a ejecutar cuando `location.search` o `products` cambien

  return (
    <div>
      <ProductList products={filteredProducts} /> {/* Pasar el array de productos filtrados */}
    </div>
  );
};

export default ProductsPage;
