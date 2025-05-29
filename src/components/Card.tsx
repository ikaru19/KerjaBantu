import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm ${hoverable ? 'hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card; 