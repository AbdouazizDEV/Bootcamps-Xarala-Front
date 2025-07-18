import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Award, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  UserPlus,
  GraduationCap,
  MessageSquare,
  LogOut,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useAuthStore } from '../../../stores/authStore';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  activeBootcamps: number;
  totalStudents: number;
  successRate: number;
  monthlyGrowth: number;
  revenue: number;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  bootcamp: string;
  status: string;
  date: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    activeBootcamps: 0,
    totalStudents: 0,
    successRate: 0,
    monthlyGrowth: 0,
    revenue: 0,
  });

  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const loadDashboardData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalLeads: 1250,
        newLeads: 45,
        convertedLeads: 320,
        activeBootcamps: 12,
        totalStudents: 850,
        successRate: 94,
        monthlyGrowth: 12.5,
        revenue: 45000000,
      });

      setRecentLeads([
        {
          id: '1',
          name: 'Fatou Diop',
          email: 'fatou.diop@email.com',
          bootcamp: 'Développement Web Full-Stack',
          status: 'nouveau',
          date: 'Il y a 2 heures',
        },
        {
          id: '2',
          name: 'Moussa Ba',
          email: 'moussa.ba@email.com',
          bootcamp: 'Data Science & IA',
          status: 'contacté',
          date: 'Il y a 4 heures',
        },
        {
          id: '3',
          name: 'Aissatou Diallo',
          email: 'aissatou.diallo@email.com',
          bootcamp: 'Développement Mobile',
          status: 'intéressé',
          date: 'Il y a 6 heures',
        },
        {
          id: '4',
          name: 'Omar Sall',
          email: 'omar.sall@email.com',
          bootcamp: 'Développement Web Full-Stack',
          status: 'inscrit',
          date: 'Il y a 1 jour',
        },
      ]);

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau':
        return 'bg-blue-100 text-blue-800';
      case 'contacté':
        return 'bg-yellow-100 text-yellow-800';
      case 'intéressé':
        return 'bg-orange-100 text-orange-800';
      case 'inscrit':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
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
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">
                Bienvenue, {user?.name || 'Administrateur'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Informations utilisateur */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/leads')}
              >
                Voir tous les leads
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/admin/bootcamps')}
              >
                Gérer les bootcamps
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Leads',
              value: formatNumber(stats.totalLeads),
              change: '+12%',
              changeType: 'up',
              icon: Users,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
            },
            {
              title: 'Nouveaux Leads',
              value: formatNumber(stats.newLeads),
              change: '+8%',
              changeType: 'up',
              icon: UserPlus,
              color: 'text-green-600',
              bgColor: 'bg-green-50',
            },
            {
              title: 'Taux de conversion',
              value: `${stats.successRate}%`,
              change: '+2.1%',
              changeType: 'up',
              icon: TrendingUp,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
            },
            {
              title: 'Revenus',
              value: formatCurrency(stats.revenue),
              change: '+15%',
              changeType: 'up',
              icon: DollarSign,
              color: 'text-orange-600',
              bgColor: 'bg-orange-50',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${
                      stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leads récents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Leads récents</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin/leads')}
                >
                  Voir tout
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-xs text-gray-500">{lead.bootcamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className="text-xs text-gray-500">{lead.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Statistiques rapides */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border"
          >
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Statistiques rapides</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    title: 'Bootcamps actifs',
                    value: stats.activeBootcamps,
                    icon: GraduationCap,
                    color: 'text-blue-600',
                  },
                  {
                    title: 'Étudiants total',
                    value: formatNumber(stats.totalStudents),
                    icon: Users,
                    color: 'text-green-600',
                  },
                  {
                    title: 'Leads convertis',
                    value: formatNumber(stats.convertedLeads),
                    icon: Award,
                    color: 'text-purple-600',
                  },
                  {
                    title: 'Croissance mensuelle',
                    value: `${stats.monthlyGrowth}%`,
                    icon: TrendingUp,
                    color: 'text-orange-600',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 