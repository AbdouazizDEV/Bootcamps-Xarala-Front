import api from './api';

export interface ApiBootcamp {
  id: string;
  title: string;
  description: string;
  duration: string; // en semaines
  price: string; // prix en FCFA
  nextSession: string; // date ISO
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateBootcampData {
  title: string;
  description: string;
  duration: string;
  price: number;
  nextSession: string;
  isActive: boolean;
}

export interface UpdateBootcampData {
  title?: string;
  description?: string;
  duration?: string;
  price?: number;
  nextSession?: string;
  isActive?: boolean;
}

export interface BootcampsResponse {
  data: ApiBootcamp[];
  message: string;
  success: boolean;
  timestamp: string;
}

export interface BootcampResponse {
  data: ApiBootcamp;
  message: string;
  success: boolean;
  timestamp: string;
}

export const bootcampService = {
  // Récupérer tous les bootcamps (public)
  async getBootcamps(): Promise<BootcampsResponse> {
    const response = await api.get('/bootcamps');
    return response.data;
  },

  // Récupérer un bootcamp par ID (public)
  async getBootcampById(id: string): Promise<BootcampResponse> {
    const response = await api.get(`/bootcamps/${id}`);
    return response.data;
  },

  // Créer un bootcamp (admin)
  async createBootcamp(data: CreateBootcampData): Promise<BootcampResponse> {
    const response = await api.post('/bootcamps', data);
    return response.data;
  },

  // Modifier un bootcamp (admin)
  async updateBootcamp(id: string, data: UpdateBootcampData): Promise<BootcampResponse> {
    const response = await api.patch(`/bootcamps/${id}`, data);
    return response.data;
  },

  // Supprimer un bootcamp (admin)
  async deleteBootcamp(id: string): Promise<{ message: string; success: boolean }> {
    const response = await api.delete(`/bootcamps/${id}`);
    return response.data;
  },
}; 