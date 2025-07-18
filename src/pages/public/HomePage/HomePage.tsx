import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Clock, Star, Play, CheckCircle, TrendingUp } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import BootcampCard from '../../../components/features/BootcampCard';
import Button from '../../../components/ui/Button';
import { useBootcampStore } from '../../../stores/bootcampStore';

const HomePage = () => {
  const { featuredBootcamps, fetchFeaturedBootcamps, loading, error } = useBootcampStore();

  useEffect(() => {
    fetchFeaturedBootcamps();
  }, [fetchFeaturedBootcamps]);

  // Données mockées pour les statistiques (en attendant l'API)
  const mockStats = {
    totalStudents: 1250,
    successRate: 94,
    bootcampsAvailable: 12,
    totalGraduates: 850,
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button variant="primary" size="lg" onClick={fetchFeaturedBootcamps}>
              Réessayer
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - Design moderne avec gradient et animations */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-orange via-primary-pink to-purple-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-white/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Leader en formation tech au Sénégal</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Transformez votre
                <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  avenir numérique
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed"
              >
                Découvrez nos bootcamps intensifs et accédez aux métiers les plus demandés 
                du numérique. Formation pratique, mentors expérimentés, carrière garantie.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = '/bootcamps'}
                  className="group"
                >
                  Découvrir nos bootcamps
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/contact'}
                  className="border-white/30 text-white hover:bg-white hover:text-primary-orange"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir la vidéo
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-300 mb-2">{mockStats.totalStudents}+</div>
                    <div className="text-sm text-gray-200 font-medium">Étudiants formés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-300 mb-2">{mockStats.successRate}%</div>
                    <div className="text-sm text-gray-200 font-medium">Taux de réussite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-300 mb-2">{mockStats.bootcampsAvailable}</div>
                    <div className="text-sm text-gray-200 font-medium">Bootcamps disponibles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-300 mb-2">{mockStats.totalGraduates}+</div>
                    <div className="text-sm text-gray-200 font-medium">Diplômés</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir Xarala ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre approche unique combine expertise technique, mentorat personnalisé et insertion professionnelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Mentorat personnalisé',
                description: 'Accompagnement individuel par des experts du secteur avec un suivi personnalisé de votre progression.',
                color: 'text-primary-orange',
              },
              {
                icon: Award,
                title: 'Certification reconnue',
                description: 'Diplômes et certifications reconnus par l\'industrie tech, validant vos compétences professionnelles.',
                color: 'text-success',
              },
              {
                icon: Clock,
                title: 'Formation intensive',
                description: 'Programmes intensifs de 12-16 semaines pour une montée en compétences rapide et efficace.',
                color: 'text-primary-pink',
              },
              {
                icon: Star,
                title: 'Insertion garantie',
                description: 'Accompagnement vers l\'emploi avec un réseau de partenaires entreprises et un taux de placement de 94%.',
                color: 'text-warning',
              },
              {
                icon: TrendingUp,
                title: 'Technologies actuelles',
                description: 'Formation aux dernières technologies et frameworks utilisés par les entreprises du numérique.',
                color: 'text-primary-orange',
              },
              {
                icon: CheckCircle,
                title: 'Projets concrets',
                description: 'Réalisation de projets réels pour construire un portfolio professionnel impressionnant.',
                color: 'text-success',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bootcamps en vedette */}
      {featuredBootcamps.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Nos Bootcamps en Vedette
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez nos programmes les plus populaires et commencez votre transformation professionnelle dès maintenant
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBootcamps.map((bootcamp, index) => (
                <motion.div
                  key={bootcamp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BootcampCard
                    bootcamp={bootcamp}
                    variant="featured"
                    onInterest={(bootcampId) => {
                      console.log('Intérêt pour le bootcamp:', bootcampId);
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = '/bootcamps'}
                className="group"
              >
                Voir tous nos bootcamps
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section - Design moderne */}
      <section className="py-20 bg-gradient-to-r from-primary-orange to-primary-pink relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-white/5"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre carrière ?
            </h2>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Rejoignez notre communauté d'apprenants et accédez aux métiers du numérique les plus demandés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = '/bootcamps'}
                className="group"
              >
                Découvrir nos programmes
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="border-white/30 text-white hover:bg-white hover:text-primary-orange"
              >
                Parler à un conseiller
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage; 