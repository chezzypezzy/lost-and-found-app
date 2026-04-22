import axios from 'axios';

// REPLACE 'http://localhost:5000' with your ACTUAL Render Backend URL
const instance = axios.create({
  baseURL: 'https://lost-and-found-app-z7nt.onrender.com', 
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