import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a la tienda de camisetas</h1>
        
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
