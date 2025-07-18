import axios from 'axios';

// Configuration de l'URL de base selon l'environnement
const getApiBaseUrl = () => {
  // En développement, utiliser le proxy Vite
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // En production, utiliser l'URL directe de l'API
  // ou une variable d'environnement si disponible
  return import.meta.env.VITE_API_BASE_URL || 'https://bootcamps-xarala-back-production.up.railway.app/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

console.log('API Base URL:', API_BASE_URL); // Debug

// Configuration axios avec intercepteurs
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Ajouter un timeout pour éviter les requêtes qui traînent
  timeout: 15000,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug: log des requêtes en développement
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    // Debug: log des réponses en développement
    if (import.meta.env.DEV) {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  async (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    
    const originalRequest = error.config;

    // Si l'erreur est 401 et qu'on n'a pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshUrl = getApiBaseUrl() + '/auth/refresh';
          
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
        console.error('Token refresh failed:', refreshError);
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