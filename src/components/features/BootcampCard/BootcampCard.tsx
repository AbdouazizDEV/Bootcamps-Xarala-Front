import React from 'react';
import type { ApiBootcamp } from '../../../types';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Clock, Users, Star, MapPin, Calendar } from 'lucide-react';

interface BootcampCardProps {
  bootcamp: ApiBootcamp;
  variant?: 'grid' | 'list' | 'featured';
  onInterest?: (bootcampId: string) => void;
  className?: string;
}

const BootcampCard: React.FC<BootcampCardProps> = ({
  bootcamp,
  variant = 'grid',
  onInterest,
  className = '',
}) => {
  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(numericPrice);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'débutant':
        return 'bg-success text-white';
      case 'intermédiaire':
        return 'bg-warning text-white';
      case 'avancé':
        return 'bg-error text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const isListVariant = variant === 'list';
  const isFeaturedVariant = variant === 'featured';

  return (
    <Card 
      className={`overflow-hidden ${isListVariant ? 'flex' : ''} ${className}`}
      hover={true}
    >
      {/* Image Container */}
      <div className={`relative ${isListVariant ? 'w-48 h-32' : 'h-48'}`}>
        <img
          src={`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center`}
          alt={bootcamp.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-sm font-bold text-primary-orange">
            {formatPrice(bootcamp.price)}
          </span>
        </div>
        
        {/* Level Badge - Utiliser un niveau par défaut */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${getLevelColor('débutant')}`}>
          Débutant
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${isListVariant ? 'flex-1' : ''}`}>
        {/* Title and Category */}
        <div className="mb-3">
          <h3 className={`font-bold text-gray-900 ${isFeaturedVariant ? 'text-xl' : 'text-lg'} mb-1`}>
            {bootcamp.title}
          </h3>
          <p className="text-sm text-primary-orange font-medium">
            Développement Web
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {bootcamp.description}
        </p>

        {/* Stats - Données mockées car l'API ne les fournit pas */}
        <div className={`flex items-center gap-4 mb-4 text-sm text-gray-500 ${isListVariant ? 'flex-wrap' : ''}`}>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{bootcamp.duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>25 étudiants</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>4.8</span>
          </div>
        </div>

        {/* Instructor - Mocké */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="Instructeur"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Mamadou Diallo
            </p>
            <p className="text-xs text-gray-500">Instructeur</p>
          </div>
        </div>

        {/* Next Session */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>
            Prochaine session: {new Date(bootcamp.nextSession).toLocaleDateString('fr-FR')}
          </span>
        </div>

        {/* CTA Button */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onInterest?.(bootcamp.id)}
            className="flex-1"
          >
            Je suis intéressé(e)
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = `/bootcamps/${bootcamp.id}`}
          >
            Détails
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BootcampCard; 