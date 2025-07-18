import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useLeadStore } from '../../../stores/leadStore';
import type { ApiLead } from '../../../services/leadService';

const LeadsPage = () => {
  const navigate = useNavigate();
  const { 
    leads, 
    loading, 
    error, 
    pagination, 
    fetchLeads, 
    fetchLeadById, 
    updateLeadStatus, 
    deleteLead,
    clearError 
  } = useLeadStore();

  const [selectedLead, setSelectedLead] = useState<ApiLead | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleStatusChange = async (leadId: string, newStatus: ApiLead['status']) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      setShowStatusModal(false);
      setSelectedLead(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce lead ?')) {
      try {
        await deleteLead(leadId);
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleViewDetails = async (leadId: string) => {
    try {
      await fetchLeadById(leadId);
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setSelectedLead(lead);
        setShowDetailsModal(true);
      }
    } catch (error) {
      console.error('Error fetching lead details:', error);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.bootcamp?.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOUVEAU':
        return 'bg-blue-100 text-blue-800';
      case 'CONTACTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'INTERESSE':
        return 'bg-orange-100 text-orange-800';
      case 'INSCRIT':
        return 'bg-green-100 text-green-800';
      case 'PERDU':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && leads.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Leads</h1>
              <p className="text-gray-600">
                Gérez vos prospects et suivez leur progression
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                ← Retour au tableau de bord
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/admin/bootcamps')}
              >
                Gérer les bootcamps
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou bootcamp..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtre par statut */}
            <div className="md:w-48">
              <select
                title="Filtrer par statut"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="NOUVEAU">Nouveau</option>
                <option value="CONTACTE">Contacté</option>
                <option value="INTERESSE">Intéressé</option>
                <option value="INSCRIT">Inscrit</option>
                <option value="PERDU">Perdu</option>
              </select>
            </div>

            {/* Statistiques */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{filteredLeads.length} leads trouvés</span>
            </div>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Tableau des leads */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prospect
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bootcamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {lead.bootcamp?.title || 'Bootcamp non spécifié'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {lead.bootcamp?.duration || 'Durée non spécifiée'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          title="Voir les détails"
                          onClick={() => handleViewDetails(lead.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          title="Modifier le statut"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowStatusModal(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          title="Supprimer le lead"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => fetchLeads(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => fetchLeads(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> à{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>{' '}
                    sur <span className="font-medium">{pagination.total}</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      title="Page précédente"
                      onClick={() => fetchLeads(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      title="Page suivante"
                      onClick={() => fetchLeads(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      {showDetailsModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Détails du Lead</h2>
                <button
                  title="Fermer"
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Nom</p>
                        <p className="font-medium">{selectedLead.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedLead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium">{selectedLead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date de création</p>
                        <p className="font-medium">{formatDate(selectedLead.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bootcamp */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Bootcamp d'intérêt</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <GraduationCap className="w-5 h-5 text-primary-orange" />
                      <h4 className="font-semibold">{selectedLead.bootcamp?.title || 'Bootcamp non spécifié'}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{selectedLead.bootcamp?.description || 'Aucune description disponible'}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Durée: {selectedLead.bootcamp?.duration || 'Non spécifiée'}</span>
                      <span>Prix: {selectedLead.bootcamp?.price ? `${selectedLead.bootcamp.price} FCFA` : 'Non spécifié'}</span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                      <p className="text-gray-700">{selectedLead.message}</p>
                    </div>
                  </div>
                </div>

                {/* Statut */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Statut actuel</h3>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Fermer
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowStatusModal(true);
                  }}
                >
                  Modifier le statut
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de modification de statut */}
      {showStatusModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Modifier le statut</h2>
                <button
                  title="Fermer"
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Modifier le statut de <strong>{selectedLead.name}</strong>
                </p>
                <div className="space-y-3">
                  {(['NOUVEAU', 'CONTACTE', 'INTERESSE', 'INSCRIT', 'PERDU'] as const).map((status) => (
                    <label key={status} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedLead.status === status}
                        onChange={() => handleStatusChange(selectedLead.id, status)}
                        className="text-primary-orange focus:ring-primary-orange"
                      />
                      <span className="text-sm font-medium text-gray-900">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStatusModal(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage; 