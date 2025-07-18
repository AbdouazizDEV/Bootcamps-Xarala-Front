import axios from 'axios';

// Configuration de l'URL de base selon l'environnement
const getApiBaseUrl = () => {
  // En développement, utiliser le proxy Vite
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // En production, utiliser l'URL directe de l'API
  return 'https://bootcamps-xarala-back-production.up.railway.app/api/v1';
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

// Intercepteur de réponse pour gérer les erreurs
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.message, error.response?.status);
    
    // Gestion spécifique des erreurs CORS
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.warn('🚫 Erreur CORS détectée - Utilisation des données mockées');
    }
    
    return Promise.reject(error);
  }
);

export default api; 