import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          setCart(data);
        } else {
          console.error('Error al obtener el carrito:', data.message);
        }
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId })
      });

      const data = await response.json();
      if (response.ok) {
        setCart(cart.filter(item => item.product_id !== productId));
      } else {
        console.error('Error al eliminar el producto del carrito:', data.message);
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };
  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setCart([]);
      } else {
        const data = await response.json();
        console.error('Error al vaciar el carrito:', data.message);
      }
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  };

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.product_id}>
              Producto ID: {item.product_id} - Cantidad: {item.quantity}
              <button onClick={() => removeFromCart(item.product_id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
};

export default Cart;
