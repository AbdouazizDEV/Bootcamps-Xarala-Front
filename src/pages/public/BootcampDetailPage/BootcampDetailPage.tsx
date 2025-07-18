import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Calendar, MapPin } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import Button from '../../../components/ui/Button';

const BootcampDetailPage = () => {
  const { id } = useParams();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(price);
  };

  // Mock data - en production, cela viendrait de l'API
  const bootcamp = {
    id: '1',
    title: 'Développement Web Full-Stack',
    description: 'Apprenez à créer des applications web modernes avec les dernières technologies. Ce bootcamp intensif vous permettra de maîtriser React, Node.js, et les bases de données pour devenir un développeur full-stack compétent.',
    shortDescription: 'Maîtrisez React, Node.js et les bases de données pour devenir développeur full-stack.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    price: 450000,
    duration: 12,
    level: 'débutant',
    category: 'Développement Web',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    instructor: {
      name: 'Mamadou Diallo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Développeur senior avec 8 ans d\'expérience dans le développement web. Spécialisé dans React et Node.js.',
    },
    curriculum: [
      { id: '1', title: 'Introduction au développement web', description: 'Bases HTML, CSS, JavaScript', duration: 20, order: 1 },
      { id: '2', title: 'React Fundamentals', description: 'Composants, props, state, hooks', duration: 40, order: 2 },
      { id: '3', title: 'Backend avec Node.js', description: 'Express, API REST, bases de données', duration: 50, order: 3 },
      { id: '4', title: 'Projet final', description: 'Application complète full-stack', duration: 60, order: 4 },
    ],
    sessions: [
      {
        id: '1',
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-05-15'),
        maxStudents: 20,
        enrolledStudents: 15,
        isActive: true,
      },
    ],
    stats: {
      enrolledStudents: 150,
      successRate: 96,
      averageRating: 4.8,
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={bootcamp.image}
                  alt={bootcamp.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-xl"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <span className="inline-block bg-primary-orange text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {bootcamp.category}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {bootcamp.title}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {bootcamp.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-primary-orange" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{bootcamp.duration} semaines</div>
                    <div className="text-sm text-gray-600">Durée</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-primary-orange" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{bootcamp.stats.enrolledStudents}</div>
                    <div className="text-sm text-gray-600">Étudiants</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 text-primary-orange" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{bootcamp.stats.averageRating}</div>
                    <div className="text-sm text-gray-600">Note</div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{formatPrice(bootcamp.price)}</div>
                      <div className="text-sm text-gray-600">Prix total</div>
                    </div>
                    <Button variant="primary" size="lg" gradient>
                      Je suis intéressé(e)
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Programme détaillé</h2>
              <p className="text-lg text-gray-600">Découvrez le contenu de cette formation</p>
            </motion.div>

            <div className="space-y-6">
              {bootcamp.curriculum.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.order}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{item.duration}h</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructor */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Votre instructeur</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={bootcamp.instructor.avatar}
                  alt={bootcamp.instructor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{bootcamp.instructor.name}</h3>
                  <p className="text-gray-600">{bootcamp.instructor.bio}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Next Session */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-orange to-primary-pink rounded-xl p-8 text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Prochaine session</h2>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Calendar className="h-6 w-6" />
                <span className="text-lg">
                  {new Date(bootcamp.sessions[0].startDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-lg mb-6">
                Places disponibles : {bootcamp.sessions[0].maxStudents - bootcamp.sessions[0].enrolledStudents}
              </p>
              <Button variant="secondary" size="lg">
                Réserver ma place
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BootcampDetailPage; 