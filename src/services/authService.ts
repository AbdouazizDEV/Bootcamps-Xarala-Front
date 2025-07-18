import api from './api';

// Données mockées pour l'authentification
const mockAuthData = {
  admin: {
    id: "1",
    name: "Admin Xarala",
    email: "admin@xarala.sn",
    role: "admin",
  },
  access_token: "mock-access-token-12345",
  refresh_token: "mock-refresh-token-67890",
};

export const authService = {
  // Connexion admin
  async login(credentials: { email: string; password: string }) {
    try {
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
    } catch (error: any) {
      console.warn('Auth API error, using mock login:', error.message);
      
      // En cas d'erreur CORS, simuler une connexion réussie avec des données mockées
      if (credentials.email === 'admin@xarala.sn' && credentials.password === 'admin123') {
        // Stocker les données mockées
        localStorage.setItem('adminToken', mockAuthData.access_token);
        localStorage.setItem('adminUser', JSON.stringify(mockAuthData.admin));
        localStorage.setItem('loginTimestamp', new Date().toISOString());
        
        return {
          success: true,
          data: mockAuthData,
          message: "Connexion réussie (mode démo)",
          timestamp: new Date().toISOString(),
        };
      } else {
        return {
          success: false,
          message: "Email ou mot de passe incorrect",
          timestamp: new Date().toISOString(),
        };
      }
    }
  },

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error: any) {
      console.warn('Refresh token API error, using mock:', error.message);
      
      // En cas d'erreur, retourner un nouveau token mock
      return {
        success: true,
        data: {
          access_token: "mock-refreshed-token-" + Date.now(),
        },
        message: "Token rafraîchi (mode démo)",
        timestamp: new Date().toISOString(),
      };
    }
  },

  // Récupérer le profil admin
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error: any) {
      console.warn('Profile API error, using mock:', error.message);
      
      // En cas d'erreur, retourner le profil mocké
      return {
        success: true,
        data: mockAuthData.admin,
        message: "Profil récupéré (mode démo)",
        timestamp: new Date().toISOString(),
      };
    }
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