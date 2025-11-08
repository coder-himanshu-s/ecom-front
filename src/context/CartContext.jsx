import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = 'default-user';

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.get(userId);
      if (response.success) {
        setCart(response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, qty = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.add(productId, qty, userId);
      if (response.success) {
        await fetchCart();
        return { success: true, message: response.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.remove(itemId, userId);
      if (response.success) {
        await fetchCart();
        return { success: true, message: response.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, qty) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.update(itemId, qty, userId);
      if (response.success) {
        await fetchCart();
        return { success: true, message: response.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCartItem,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

