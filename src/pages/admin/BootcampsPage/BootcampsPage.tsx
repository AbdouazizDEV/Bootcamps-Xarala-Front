import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  X,
  Save,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useBootcampStore } from '../../../stores/bootcampStore';
import type { ApiBootcamp, CreateBootcampData, UpdateBootcampData } from '../../../services/bootcampService';

const BootcampsPage = () => {
  const navigate = useNavigate();
  const { 
    bootcamps, 
    loading, 
    error, 
    fetchBootcamps, 
    fetchBootcampById,
    createBootcamp, 
    updateBootcamp, 
    deleteBootcamp,
    clearError 
  } = useBootcampStore();

  const [selectedBootcamp, setSelectedBootcamp] = useState<ApiBootcamp | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Form data for create/edit
  const [formData, setFormData] = useState<CreateBootcampData>({
    title: '',
    description: '',
    duration: '',
    price: 0,
    nextSession: '',
    isActive: true,
  });

  useEffect(() => {
    fetchBootcamps();
  }, [fetchBootcamps]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleCreateBootcamp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBootcamp(formData);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating bootcamp:', error);
    }
  };

  const handleUpdateBootcamp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBootcamp) return;
    
    try {
      await updateBootcamp(selectedBootcamp.id, formData);
      setShowEditModal(false);
      setSelectedBootcamp(null);
      resetForm();
    } catch (error) {
      console.error('Error updating bootcamp:', error);
    }
  };

  const handleDeleteBootcamp = async (bootcampId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bootcamp ?')) {
      try {
        await deleteBootcamp(bootcampId);
      } catch (error) {
        console.error('Error deleting bootcamp:', error);
      }
    }
  };

  const handleEditBootcamp = (bootcamp: ApiBootcamp) => {
    setSelectedBootcamp(bootcamp);
    setFormData({
      title: bootcamp.title,
      description: bootcamp.description,
      duration: bootcamp.duration,
      price: parseFloat(bootcamp.price),
      nextSession: bootcamp.nextSession.split('T')[0], // Format YYYY-MM-DD
      isActive: bootcamp.isActive,
    });
    setShowEditModal(true);
  };

  const handleViewDetails = async (bootcampId: string) => {
    try {
      await fetchBootcampById(bootcampId);
      const bootcamp = bootcamps.find(b => b.id === bootcampId);
      if (bootcamp) {
        setSelectedBootcamp(bootcamp);
        setShowDetailsModal(true);
      }
    } catch (error) {
      console.error('Error fetching bootcamp details:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: 0,
      nextSession: '',
      isActive: true,
    });
  };

  const filteredBootcamps = bootcamps.filter(bootcamp => {
    const matchesSearch = 
      bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bootcamp.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || 
      (statusFilter === 'active' && bootcamp.isActive) ||
      (statusFilter === 'inactive' && !bootcamp.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(numericPrice);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && bootcamps.length === 0) {
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
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Bootcamps</h1>
              <p className="text-gray-600">
                Gérez vos programmes de formation
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
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau bootcamp
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
                  placeholder="Rechercher par titre ou description..."
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
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
            </div>

            {/* Statistiques */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <GraduationCap className="w-4 h-4" />
              <span>{filteredBootcamps.length} bootcamps trouvés</span>
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

        {/* Tableau des bootcamps */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bootcamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prochaine session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBootcamps.map((bootcamp) => (
                  <motion.tr
                    key={bootcamp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {bootcamp.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {bootcamp.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{bootcamp.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatPrice(bootcamp.price)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {formatDate(bootcamp.nextSession)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {bootcamp.isActive ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          bootcamp.isActive ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {bootcamp.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          title="Voir les détails"
                          onClick={() => handleViewDetails(bootcamp.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          title="Modifier le statut"
                          onClick={() => handleEditBootcamp(bootcamp)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          title="Supprimer le bootcamp"
                          onClick={() => handleDeleteBootcamp(bootcamp.id)}
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
        </div>
      </div>

      {/* Modal de création */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Nouveau Bootcamp</h2>
                <button
                  title="Fermer"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateBootcamp} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre *
                    </label>
                    <input
                      title="Titre"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée *
                    </label>
                    <input
                      title="Durée"
                      type="text"
                      required
                      placeholder="ex: 12 semaines"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (FCFA) *
                    </label>
                    <input
                      title="Prix"
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prochaine session *
                    </label>
                    <input
                      title="Prochaine session"
                      type="date"
                      required
                      value={formData.nextSession}
                      onChange={(e) => setFormData({ ...formData, nextSession: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    title="Description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    title="Bootcamp actif"
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary-orange focus:ring-primary-orange border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Bootcamp actif
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    size="sm"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Créer le bootcamp
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de modification */}
      {showEditModal && selectedBootcamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Modifier le Bootcamp</h2>
                <button
                  title="Fermer"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedBootcamp(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateBootcamp} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre *
                    </label>
                    <input
                      title="Titre"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée *
                    </label>
                    <input
                      title="Durée"
                      type="text"
                      required
                      placeholder="ex: 12 semaines"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (FCFA) *
                    </label>
                    <input
                      title="Prix"
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prochaine session *
                    </label>
                    <input
                      title="Prochaine session"
                      type="date"
                      required
                      value={formData.nextSession}
                      onChange={(e) => setFormData({ ...formData, nextSession: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    title="Description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    title="Bootcamp actif"
                    type="checkbox"
                    id="isActiveEdit"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary-orange focus:ring-primary-orange border-gray-300 rounded"
                  />
                  <label htmlFor="isActiveEdit" className="text-sm font-medium text-gray-700">
                    Bootcamp actif
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedBootcamp(null);
                      resetForm();
                    }}
                    size="sm"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Modifier le bootcamp
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de détails */}
      {showDetailsModal && selectedBootcamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Détails du Bootcamp</h2>
                <button
                  title="Fermer"
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedBootcamp.title}</h3>
                  <p className="text-gray-600">{selectedBootcamp.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Durée</p>
                      <p className="font-medium">{selectedBootcamp.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Prix</p>
                      <p className="font-medium">{formatPrice(selectedBootcamp.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Prochaine session</p>
                      <p className="font-medium">{formatDate(selectedBootcamp.nextSession)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {selectedBootcamp.isActive ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Statut</p>
                      <p className={`font-medium ${
                        selectedBootcamp.isActive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedBootcamp.isActive ? 'Actif' : 'Inactif'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowDetailsModal(false)}
                    >
                      Fermer
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleEditBootcamp(selectedBootcamp);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BootcampsPage; 