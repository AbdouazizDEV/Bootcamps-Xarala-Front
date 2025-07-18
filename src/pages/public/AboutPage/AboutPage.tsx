import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, Star, MapPin, Phone, Mail, Globe } from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import Button from '../../../components/ui/Button';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-orange via-primary-pink to-purple-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              À propos de Xarala
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-4xl mx-auto">
              Leader en formation tech au Sénégal, nous transformons les carrières 
              et connectons les talents aux opportunités du numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Chez Xarala, nous croyons que l'éducation technologique est le moteur 
                de la transformation numérique en Afrique. Notre mission est de former 
                la prochaine génération de talents tech africains.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nous combinons expertise technique, mentorat personnalisé et insertion 
                professionnelle pour garantir le succès de nos apprenants dans 
                l'écosystème numérique.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-orange mb-2">1250+</div>
                  <div className="text-sm text-gray-600">Étudiants formés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-orange mb-2">94%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-orange to-primary-pink rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Nos Valeurs</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Award className="w-5 h-5 mr-3" />
                    <span>Excellence académique et professionnelle</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="w-5 h-5 mr-3" />
                    <span>Communauté et collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 mr-3" />
                    <span>Innovation et créativité</span>
                  </li>
                  <li className="flex items-center">
                    <Globe className="w-5 h-5 mr-3" />
                    <span>Impact social et développement durable</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre Histoire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez le parcours qui nous a menés à devenir le leader 
              de la formation tech au Sénégal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: '2020',
                title: 'Fondation',
                description: 'Création de Xarala avec la vision de démocratiser l\'accès aux métiers du numérique en Afrique.',
              },
              {
                year: '2021',
                title: 'Premiers Bootcamps',
                description: 'Lancement de nos premiers programmes intensifs en développement web et mobile.',
              },
              {
                year: '2023',
                title: 'Expansion',
                description: 'Ouverture de nouveaux programmes et partenariats avec les entreprises tech locales.',
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-3xl font-bold text-primary-orange mb-4">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts passionnés qui partagent leur expertise pour former 
              la prochaine génération de talents tech
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Mamadou Diallo',
                role: 'Directeur Général',
                bio: 'Expert en développement web avec 8 ans d\'expérience. Passionné par l\'éducation tech.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
              },
              {
                name: 'Fatou Sall',
                role: 'Directrice Pédagogique',
                bio: 'Data Scientist avec 6 ans d\'expérience chez Google. Spécialiste en IA et Machine Learning.',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
              },
              {
                name: 'Ousmane Ba',
                role: 'Responsable Formation',
                bio: 'Développeur mobile freelance avec 5 ans d\'expérience. Expert en React Native et Flutter.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-orange font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-r from-primary-orange to-primary-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prêt à rejoindre Xarala ?
            </h2>
            <p className="text-xl mb-8">
              Contactez-nous pour en savoir plus sur nos programmes 
              et commencer votre transformation professionnelle
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center">
                <MapPin className="w-6 h-6 mr-3" />
                <span>Dakar, Sénégal</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-6 h-6 mr-3" />
                <span>+221 33 XXX XX XX</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="w-6 h-6 mr-3" />
                <span>contact@xarala.sn</span>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/contact'}
              className="group"
            >
              Nous contacter
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 