import axios from 'axios';

const api = axios.create({
  baseURL: 'https://social-backend-mx9n.onrender.com',
  withCredentials: true,
});



export default api;
