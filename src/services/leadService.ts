import api from './api';

export interface ApiLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'NOUVEAU' | 'CONTACTE' | 'INTERESSE' | 'INSCRIT' | 'PERDU';
  bootcampId: string;
  createdAt: string;
  updatedAt: string;
  bootcamp?: {
    id: string;
    title: string;
    description: string;
    duration: string;
    price: string;
    nextSession: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface CreateLeadData {
  name: string;
  email: string;
  phone: string;
  message: string;
  bootcampId: string;
}

export interface LeadsResponse {
  data: ApiLead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message: string;
  success: boolean;
  timestamp: string;
}

export interface LeadResponse {
  data: ApiLead;
  message: string;
  success: boolean;
  timestamp: string;
}

export const leadService = {
  // Récupérer tous les leads
  async getLeads(page = 1, limit = 10): Promise<LeadsResponse> {
    const response = await api.get(`/leads?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Récupérer un lead par ID
  async getLeadById(id: string): Promise<LeadResponse> {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  // Créer un nouveau lead
  async createLead(data: CreateLeadData): Promise<LeadResponse> {
    const response = await api.post('/leads', data);
    return response.data;
  },

  // Mettre à jour le statut d'un lead
  async updateLeadStatus(id: string, status: ApiLead['status']): Promise<LeadResponse> {
    const response = await api.patch(`/leads/${id}/status`, { status });
    return response.data;
  },

  // Supprimer un lead
  async deleteLead(id: string): Promise<{ message: string; success: boolean }> {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
}; 