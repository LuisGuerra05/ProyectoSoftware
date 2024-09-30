import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; // Importar el nuevo componente Cart

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} /> {/* Ruta para el catálogo */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;