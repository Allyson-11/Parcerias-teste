import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere se o backend estiver em outro local
});

export default api;
