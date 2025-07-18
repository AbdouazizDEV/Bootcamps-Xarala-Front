import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://bootcamps-xarala-back-production.up.railway.app/api/v1';

// Configuration axios avec intercepteurs
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 et qu'on n'a pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshUrl = import.meta.env.DEV 
            ? '/api/auth/refresh'
            : 'https://bootcamps-xarala-back-production.up.railway.app/api/v1/auth/refresh';
          
          const response = await axios.post(refreshUrl, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('adminToken', accessToken);

          // Retry la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si le refresh échoue, déconnecter l'utilisateur
        localStorage.removeItem('adminToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api; 