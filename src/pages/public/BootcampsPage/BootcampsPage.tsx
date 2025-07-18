import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Calendar,
  GraduationCap,
  Star
} from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import BootcampCard from '../../../components/features/BootcampCard';
import { useBootcampStore } from '../../../stores/bootcampStore';

const BootcampsPage = () => {
  const { bootcamps, loading, error, fetchBootcamps } = useBootcampStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');

  useEffect(() => {
    fetchBootcamps();
  }, [fetchBootcamps]);

  const filteredBootcamps = bootcamps.filter(bootcamp => {
    const matchesSearch = 
      bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bootcamp.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDuration = !durationFilter || bootcamp.duration.includes(durationFilter);
    
    const matchesPrice = !priceFilter || (() => {
      const price = parseFloat(bootcamp.price);
      switch (priceFilter) {
        case 'low':
          return price <= 100000;
        case 'medium':
          return price > 100000 && price <= 200000;
        case 'high':
          return price > 200000;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesDuration && matchesPrice;
  });

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(numericPrice);
  };

  if (loading && bootcamps.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-orange to-primary-pink py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Nos Bootcamps
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Découvrez nos programmes de formation intensifs et transformez votre carrière dans le numérique
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filtres et recherche */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un bootcamp..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtre par durée */}
              <div className="lg:w-48">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                >
                  <option value="">Toutes les durées</option>
                  <option value="8 semaines">8 semaines</option>
                  <option value="12 semaines">12 semaines</option>
                  <option value="16 semaines">16 semaines</option>
                </select>
              </div>

              {/* Filtre par prix */}
              <div className="lg:w-48">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                >
                  <option value="">Tous les prix</option>
                  <option value="low">Moins de 100k FCFA</option>
                  <option value="medium">100k - 200k FCFA</option>
                  <option value="high">Plus de 200k FCFA</option>
                </select>
              </div>

              {/* Statistiques */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>{filteredBootcamps.length} bootcamp{filteredBootcamps.length > 1 ? 's' : ''} trouvé{filteredBootcamps.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              {error}
            </motion.div>
          )}

          {/* Grille des bootcamps */}
          {filteredBootcamps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBootcamps.map((bootcamp, index) => (
                <motion.div
                  key={bootcamp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BootcampCard
                    bootcamp={bootcamp}
                    variant="grid"
                    onInterest={(bootcampId) => {
                      console.log('Intérêt pour le bootcamp:', bootcampId);
                      // Ici on pourrait rediriger vers un formulaire de contact
                      window.location.href = `/contact?bootcamp=${bootcampId}`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun bootcamp trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-primary-orange to-primary-pink rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Prêt à transformer votre carrière ?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Rejoignez notre communauté d'apprenants et accédez aux métiers du numérique les plus demandés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/contact'}
                className="bg-white text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Parler à un conseiller
              </button>
              <button
                onClick={() => window.location.href = '/about'}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-orange transition-colors"
              >
                En savoir plus
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default BootcampsPage; 