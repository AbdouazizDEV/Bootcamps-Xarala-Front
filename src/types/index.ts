// Types de base
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: Date;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Type pour la structure réelle des bootcamps de l'API
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

// Types pour les bootcamps (structure complète pour l'interface)
export interface Bootcamp {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  price: number;
  duration: number; // en semaines
  level: 'débutant' | 'intermédiaire' | 'avancé';
  category: string;
  tags: string[];
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  curriculum: CurriculumItem[];
  sessions: Session[];
  stats: {
    enrolledStudents: number;
    successRate: number;
    averageRating: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurriculumItem {
  id: string;
  title: string;
  description: string;
  duration: number; // en heures
  order: number;
}

export interface Session {
  id: string;
  startDate: Date;
  endDate: Date;
  maxStudents: number;
  enrolledStudents: number;
  isActive: boolean;
}

// Types pour les leads
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  bootcampId: string;
  bootcamp?: Bootcamp;
  status: 'nouveau' | 'contacté' | 'intéressé' | 'inscrit' | 'perdu';
  source: 'site_web' | 'réseaux_sociaux' | 'recommandation' | 'autre';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les formulaires
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  bootcampId: string;
}

export interface BootcampFormData {
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  category: string;
  tags: string[];
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  curriculum: CurriculumItem[];
  isActive: boolean;
}

// Types pour la pagination
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Types pour les filtres
export interface BootcampFilters {
  duration: string[];
  priceRange: [number, number];
  searchTerm: string;
  level?: string;
  category?: string;
}

export interface LeadFilters {
  status?: string;
  source?: string;
  dateRange?: [Date, Date];
  searchTerm: string;
}

// Types pour les statistiques
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  activeBootcamps: number;
  totalStudents: number;
  successRate: number;
  monthlyGrowth: number;
}

export interface HomePageStats {
  totalStudents: number;
  successRate: number;
  bootcampsAvailable: number;
  totalGraduates: number;
}

// Types pour les composants UI
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

// Types pour les props des pages
export interface HomePageProps {
  featuredBootcamps: Bootcamp[];
  stats: HomePageStats;
}

export interface BootcampsListProps {
  bootcamps: Bootcamp[];
  filters: BootcampFilters;
  pagination: PaginationData;
}

export interface BootcampDetailProps {
  bootcamp: Bootcamp;
  relatedBootcamps: Bootcamp[];
}

export interface DashboardData {
  stats: DashboardStats;
  recentLeads: Lead[];
  popularBootcamps: Bootcamp[];
}

export interface LeadsTableProps {
  leads: Lead[];
  filters: LeadFilters;
  pagination: PaginationData;
}

export interface BootcampsAdminProps {
  bootcamps: Bootcamp[];
  onEdit: (bootcamp: Bootcamp) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

// Types pour les stores Zustand
export interface AuthStore {
  user: Admin | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginFormData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface BootcampStore {
  bootcamps: Bootcamp[];
  featuredBootcamps: Bootcamp[];
  loading: boolean;
  error: string | null;
  fetchBootcamps: () => Promise<void>;
  fetchFeaturedBootcamps: () => Promise<void>;
  getBootcampById: (id: string) => Bootcamp | null;
  createBootcamp: (data: BootcampFormData) => Promise<void>;
  updateBootcamp: (id: string, data: Partial<BootcampFormData>) => Promise<void>;
  deleteBootcamp: (id: string) => Promise<void>;
}

export interface LeadStore {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: () => Promise<void>;
  createLead: (data: LeadFormData) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

// Types pour les API responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationData;
  message: string;
  success: boolean;
}

// Types pour les erreurs
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

// Types pour les notifications
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
} 