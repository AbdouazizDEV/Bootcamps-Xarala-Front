import { create } from 'zustand';
import { leadService, type ApiLead, type CreateLeadData } from '../services/leadService';

interface LeadState {
  leads: ApiLead[];
  currentLead: ApiLead | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchLeads: (page?: number, limit?: number) => Promise<void>;
  fetchLeadById: (id: string) => Promise<void>;
  createLead: (data: CreateLeadData) => Promise<void>;
  updateLeadStatus: (id: string, status: ApiLead['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  currentLead: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  fetchLeads: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await leadService.getLeads(page, limit);
      if (response.success) {
        set({ 
          leads: response.data, 
          pagination: response.pagination,
          loading: false 
        });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors du chargement des leads', 
        loading: false 
      });
    }
  },

  fetchLeadById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await leadService.getLeadById(id);
      if (response.success) {
        set({ currentLead: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors du chargement du lead', 
        loading: false 
      });
    }
  },

  createLead: async (data: CreateLeadData) => {
    set({ loading: true, error: null });
    try {
      const response = await leadService.createLead(data);
      if (response.success) {
        // Recharger la liste des leads
        await get().fetchLeads();
        set({ loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors de la création du lead', 
        loading: false 
      });
    }
  },

  updateLeadStatus: async (id: string, status: ApiLead['status']) => {
    set({ loading: true, error: null });
    try {
      const response = await leadService.updateLeadStatus(id, status);
      if (response.success) {
        // Mettre à jour le lead dans la liste
        const { leads } = get();
        const updatedLeads = leads.map(lead => 
          lead.id === id ? response.data : lead
        );
        set({ leads: updatedLeads, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors de la mise à jour du statut', 
        loading: false 
      });
    }
  },

  deleteLead: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await leadService.deleteLead(id);
      if (response.success) {
        // Retirer le lead de la liste
        const { leads } = get();
        const updatedLeads = leads.filter(lead => lead.id !== id);
        set({ leads: updatedLeads, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erreur lors de la suppression du lead', 
        loading: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 