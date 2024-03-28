"use client";
import React, { useState, useEffect } from 'react';
import { getProduct } from '@/services/api/product.api';

const Cart = () => {
  const [items, setItems] = useState([]);

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
            <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

// Separate component for each cart item
const CartItem = ({ item, removeItemFromCart }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => { 
    // Fetch product details when component mounts
    fetchProduct(item.id);
  }, [item.id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await getProduct(productId);
      setProduct(response.data); // Assuming response.data contains product details
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <li>
      {product ? (
        <>
          {product.name} - ${product.price}
          <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </li>
  );
};

export default Cart;
