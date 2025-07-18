import { create } from 'zustand';
import { bootcampService } from '../services/bootcampService';
import type { ApiBootcamp, CreateBootcampData, UpdateBootcampData } from '../services/bootcampService';

interface BootcampStore {
  bootcamps: ApiBootcamp[];
  featuredBootcamps: ApiBootcamp[];
  currentBootcamp: ApiBootcamp | null;
  loading: boolean;
  error: string | null;
  fetchBootcamps: () => Promise<void>;
  fetchFeaturedBootcamps: () => Promise<void>;
  fetchBootcampById: (id: string) => Promise<void>;
  getBootcampById: (id: string) => ApiBootcamp | null;
  createBootcamp: (data: CreateBootcampData) => Promise<void>;
  updateBootcamp: (id: string, data: UpdateBootcampData) => Promise<void>;
  deleteBootcamp: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useBootcampStore = create<BootcampStore>((set, get) => ({
  bootcamps: [],
  featuredBootcamps: [],
  currentBootcamp: null,
  loading: false,
  error: null,

  fetchBootcamps: async () => {
    set({ loading: true, error: null });
    try {
      const response = await bootcampService.getBootcamps();
      if (response.success) {
        set({ bootcamps: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors du chargement des bootcamps', 
        loading: false 
      });
    }
  },

  fetchFeaturedBootcamps: async () => {
    set({ loading: true, error: null });
    try {
      const response = await bootcampService.getBootcamps();
      if (response.success) {
        // Filtrer les bootcamps actifs et prendre les 3 premiers
        const featured = response.data
          .filter(bootcamp => bootcamp.isActive)
          .slice(0, 3);
        
        set({ featuredBootcamps: featured, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors du chargement des bootcamps en vedette', 
        loading: false 
      });
    }
  },

  fetchBootcampById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await bootcampService.getBootcampById(id);
      if (response.success) {
        set({ currentBootcamp: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors du chargement du bootcamp', 
        loading: false 
      });
    }
  },

  getBootcampById: (id: string) => {
    const { bootcamps } = get();
    return bootcamps.find(bootcamp => bootcamp.id === id) || null;
  },

  createBootcamp: async (data: CreateBootcampData) => {
    set({ loading: true, error: null });
    try {
      const response = await bootcampService.createBootcamp(data);
      if (response.success) {
        // Recharger la liste des bootcamps
        await get().fetchBootcamps();
        set({ loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors de la création du bootcamp', 
        loading: false 
      });
    }
  },

  updateBootcamp: async (id: string, data: UpdateBootcampData) => {
    set({ loading: true, error: null });
    try {
      const response = await bootcampService.updateBootcamp(id, data);
      if (response.success) {
        // Mettre à jour le bootcamp dans la liste
        const { bootcamps } = get();
        const updatedBootcamps = bootcamps.map(bootcamp => 
          bootcamp.id === id ? response.data : bootcamp
        );
        set({ bootcamps: updatedBootcamps, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors de la modification du bootcamp', 
        loading: false 
      });
    }
  },

  deleteBootcamp: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await bootcampService.deleteBootcamp(id);
      if (response.success) {
        // Retirer le bootcamp de la liste
        const { bootcamps } = get();
        const updatedBootcamps = bootcamps.filter(bootcamp => bootcamp.id !== id);
        set({ bootcamps: updatedBootcamps, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors de la suppression du bootcamp', 
        loading: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 