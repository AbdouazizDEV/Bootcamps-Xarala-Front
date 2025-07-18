import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import DemoBanner from '../../../components/ui/DemoBanner';
import { useAuthStore } from '../../../stores/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: 'admin@xarala.sn',
    password: 'admin123',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await login(formData);
      // La redirection sera gérée par le useEffect ci-dessus
    } catch (error) {
      // Les erreurs sont gérées par le store
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-orange via-primary-pink to-purple-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-orange">X</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Administration Xarala
          </h1>
          <p className="text-white/80">
            Connectez-vous à votre espace administrateur
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Bannière mode démo */}
          <DemoBanner className="mb-6" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="admin@xarala.sn"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          {/* Informations de connexion */}
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Informations de connexion (démo)
            </h3>
            <div className="text-xs text-white/60 space-y-1">
              <p>Email: admin@xarala.sn</p>
              <p>Mot de passe: admin123</p>
            </div>
          </div>
        </div>

        {/* Lien vers la page publique */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white text-sm underline"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage; 