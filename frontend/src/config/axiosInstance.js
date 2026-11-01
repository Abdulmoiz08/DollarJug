// api.js
import axios from 'axios';

// 1. Create the pre-configured instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // Base URL for all requests
  timeout: 10000,// Abort request if it takes longer than 5 seconds

});

export default api;