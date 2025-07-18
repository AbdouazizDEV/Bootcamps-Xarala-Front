import api from './api';

export const authService = {
  // Connexion admin
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;
    
    if (data.success && data.data) {
      // Stocker le token d'accès
      localStorage.setItem('adminToken', data.data.access_token);
      
      // Stocker les informations de l'admin
      localStorage.setItem('adminUser', JSON.stringify(data.data.admin));
      
      // Stocker le timestamp pour vérifier l'expiration
      localStorage.setItem('loginTimestamp', data.timestamp);
    }
    
    return data;
  },

  // Refresh token
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // Récupérer le profil admin
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Déconnexion
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Nettoyer le localStorage même si la requête échoue
      localStorage.removeItem('adminToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('loginTimestamp');
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    return !!(token && user);
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser() {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },
}; 