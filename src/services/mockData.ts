// Données mockées pour contourner les problèmes CORS en production
export const mockBootcamps = [
  {
    id: "1",
    title: "Développement Web Full-Stack",
    description: "Apprenez à développer des applications web modernes avec les dernières technologies. Formation intensive de 12 semaines couvrant HTML, CSS, JavaScript, React, Node.js et bases de données.",
    duration: "12 semaines",
    price: "150000",
    nextSession: "2024-03-01T00:00:00.000Z",
    isActive: true,
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    deletedAt: null,
  },
  {
    id: "2",
    title: "Développement Mobile",
    description: "Formation complète en développement mobile avec React Native et Flutter. Créez des applications mobiles performantes pour iOS et Android.",
    duration: "10 semaines",
    price: "120000",
    nextSession: "2024-04-01T00:00:00.000Z",
    isActive: true,
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    deletedAt: null,
  },
  {
    id: "3",
    title: "Data Science & IA",
    description: "Découvrez les fondamentaux de la data science, du machine learning et de l'intelligence artificielle. Python, pandas, scikit-learn et plus encore.",
    duration: "14 semaines",
    price: "180000",
    nextSession: "2024-05-01T00:00:00.000Z",
    isActive: true,
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    deletedAt: null,
  },
];

export const mockLeads = [
  {
    id: "1",
    name: "Fatou Diop",
    email: "fatou.diop@email.com",
    phone: "+221 77 123 45 67",
    message: "Je suis très intéressée par le bootcamp Full-Stack. Pouvez-vous me donner plus d'informations sur les prérequis ?",
    status: "NOUVEAU" as const,
    bootcampId: "1",
    createdAt: "2024-01-20T14:30:00.000Z",
    updatedAt: "2024-01-20T14:30:00.000Z",
    bootcamp: mockBootcamps[0],
  },
  {
    id: "2",
    name: "Mamadou Diallo",
    email: "mamadou.diallo@email.com",
    phone: "+221 76 987 65 43",
    message: "Bonjour, je voudrais m'inscrire au bootcamp Data Science. Y a-t-il des places disponibles ?",
    status: "INTERESSE" as const,
    bootcampId: "3",
    createdAt: "2024-01-19T09:15:00.000Z",
    updatedAt: "2024-01-19T09:15:00.000Z",
    bootcamp: mockBootcamps[2],
  },
  {
    id: "3",
    name: "Aissatou Ba",
    email: "aissatou.ba@email.com",
    phone: "+221 78 456 78 90",
    message: "Je souhaite développer des applications mobiles. Le bootcamp Mobile est-il adapté pour les débutants ?",
    status: "CONTACTE" as const,
    bootcampId: "2",
    createdAt: "2024-01-18T16:45:00.000Z",
    updatedAt: "2024-01-18T16:45:00.000Z",
    bootcamp: mockBootcamps[1],
  },
];

// Fonction pour simuler un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Service mock pour les bootcamps
export const mockBootcampService = {
  async getBootcamps() {
    await delay(1000); // Simuler un délai réseau
    return {
      success: true,
      data: mockBootcamps,
      message: "Bootcamps récupérés avec succès",
      timestamp: new Date().toISOString(),
    };
  },

  async getBootcampById(id: string) {
    await delay(500);
    const bootcamp = mockBootcamps.find(b => b.id === id);
    if (!bootcamp) {
      throw new Error("Bootcamp non trouvé");
    }
    return {
      success: true,
      data: bootcamp,
      message: "Bootcamp récupéré avec succès",
      timestamp: new Date().toISOString(),
    };
  },
};

// Service mock pour les leads
export const mockLeadService = {
  async getLeads(page = 1, limit = 10) {
    await delay(800);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedLeads = mockLeads.slice(start, end);
    
    return {
      success: true,
      data: paginatedLeads,
      pagination: {
        page,
        limit,
        total: mockLeads.length,
        totalPages: Math.ceil(mockLeads.length / limit),
      },
      message: "Leads récupérés avec succès",
      timestamp: new Date().toISOString(),
    };
  },

  async getLeadById(id: string) {
    await delay(500);
    const lead = mockLeads.find(l => l.id === id);
    if (!lead) {
      throw new Error("Lead non trouvé");
    }
    return {
      success: true,
      data: lead,
      message: "Lead récupéré avec succès",
      timestamp: new Date().toISOString(),
    };
  },
}; 