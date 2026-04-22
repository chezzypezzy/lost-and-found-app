import axios from 'axios';

const instance = axios.create({
  // Make sure this ends with /api
  baseURL: 'https://lost-and-found-app-z7nt.onrender.com/api', 
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