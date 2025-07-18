import { create } from 'zustand';
import { authService } from '../services/authService';

interface Admin {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        const user = response.data.admin;
        set({ 
          user, 
          isAuthenticated: true, 
          loading: false,
          error: null 
        });
      } else {
        set({ 
          error: response.message || 'Erreur de connexion', 
          loading: false 
        });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur de connexion', 
        loading: false 
      });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false,
        error: null 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur de déconnexion', 
        loading: false 
      });
    }
  },

  checkAuth: () => {
    const isAuth = authService.isAuthenticated();
    const user = authService.getCurrentUser();
    
    set({ 
      isAuthenticated: isAuth, 
      user: isAuth ? user : null 
    });
  },
})); 