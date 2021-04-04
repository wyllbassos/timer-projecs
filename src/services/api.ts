import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'http://127.0.1.1:8080/api',
  headers: { 'Content-Type': 'application/json' },
  // baseURL: 'http://localhost:3333',
});

export default api;
