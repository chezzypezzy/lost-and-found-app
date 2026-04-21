import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Uses the proxy we set in vite.config.js
});

// Add a request interceptor to include the token if it exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;