"use client";
import React, { useState, useEffect } from 'react';
import { getProduct } from '@/services/api/product.api';

const Cart = () => {
  const [items, setItems] = useState([]);

  const response = await getProduct(id);

  useEffect(() => {
    recoverCart();
  }, []);


  const recoverCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setItems(JSON.parse(cart));
    }
  };

  const removeItemFromCart = (itemId) => {
    setItems(prevItems => prevItems.filter((item) => item.id !== itemId));
    localStorage.setItem("cart", JSON.stringify(items.filter((item) => item.id !== itemId)));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            console.log(item),
            <li key={item.id}>
              {item} - <button onClick={() => removeItemFromCart(item.id)}> Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
