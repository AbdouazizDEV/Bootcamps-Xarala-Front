import React from 'react';
import type { CardProps } from '../../../types';

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02]' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card; 