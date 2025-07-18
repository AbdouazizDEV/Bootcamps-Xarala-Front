import React from 'react';
import { Info } from 'lucide-react';

interface DemoBannerProps {
  className?: string;
}

const DemoBanner: React.FC<DemoBannerProps> = ({ className = '' }) => {
  return (
    <div className={`bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
        <div className="text-sm">
          <p className="text-blue-200 font-medium">Mode Démo Activé</p>
          <p className="text-blue-300/80 text-xs mt-1">
            L'API backend n'est pas accessible. L'application utilise des données de démonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner; 