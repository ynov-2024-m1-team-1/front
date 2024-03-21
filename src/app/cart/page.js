"use client";
import React, { useState } from 'react';

const Cart = () => {
  const [items, setItems] = useState([]);

  // Add item to cart
  const addItemToCart = (item) => {
    setItems([...items, item]);
  };

  // Remove item from cart
  const removeItemFromCart = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
