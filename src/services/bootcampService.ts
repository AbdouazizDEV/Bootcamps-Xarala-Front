import api from './api';
import { mockBootcampService } from './mockData';

export interface ApiBootcamp {
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
}

export interface CreateBootcampData {
  title: string;
  description: string;
  duration: string;
  price: string;
  nextSession: string;
  isActive: boolean;
}

export interface UpdateBootcampData extends Partial<CreateBootcampData> {}

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
  // Récupérer tous les bootcamps
  async getBootcamps(): Promise<BootcampsResponse> {
    try {
      const response = await api.get('/bootcamps');
      return response.data;
    } catch (error: any) {
      console.warn('API error, using mock data:', error.message);
      // En cas d'erreur CORS ou réseau, utiliser les données mockées
      return mockBootcampService.getBootcamps();
    }
  },

  // Récupérer un bootcamp par ID
  async getBootcampById(id: string): Promise<BootcampResponse> {
    try {
      const response = await api.get(`/bootcamps/${id}`);
      return response.data;
    } catch (error: any) {
      console.warn('API error, using mock data:', error.message);
      return mockBootcampService.getBootcampById(id);
    }
  },

  // Créer un nouveau bootcamp
  async createBootcamp(data: CreateBootcampData): Promise<BootcampResponse> {
    const response = await api.post('/bootcamps', data);
    return response.data;
  },

  // Mettre à jour un bootcamp
  async updateBootcamp(id: string, data: UpdateBootcampData): Promise<BootcampResponse> {
    const response = await api.put(`/bootcamps/${id}`, data);
    return response.data;
  },

  // Supprimer un bootcamp
  async deleteBootcamp(id: string): Promise<{ message: string; success: boolean }> {
    const response = await api.delete(`/bootcamps/${id}`);
    return response.data;
  },
}; 