import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productToRemove) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productToRemove.id)
    );
  };

  const increaseQuantity = (product) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === product.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const removeOrder = (orderIndex) => {
    const newOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, addOrder, removeOrder, orders }}>
      {children}
    </CartContext.Provider>
  );
};
