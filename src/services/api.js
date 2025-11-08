import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
};

export const cartAPI = {
  get: (userId = 'default-user') => api.get(`/cart?userId=${userId}`),
  add: (productId, qty, userId = 'default-user') => 
    api.post('/cart', { productId, qty, userId }),
  remove: (itemId, userId = 'default-user') => 
    api.delete(`/cart/${itemId}?userId=${userId}`),
  update: (itemId, qty, userId = 'default-user') => 
    api.put(`/cart/${itemId}?userId=${userId}`, { qty }),
};

export const checkoutAPI = {
  process: (checkoutData) => api.post('/checkout', checkoutData),
};

export default api;

