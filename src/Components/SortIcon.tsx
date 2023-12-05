import React from 'react';

interface SortIconProps {
  direction: 'asc' | 'desc' | undefined;
}

const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
  const iconStyle: React.CSSProperties = {
    fontSize: '12px', // Ajustez la taille selon vos besoins
    color: 'white', // Couleur blanche
    marginLeft: '5px', // Espacement à gauche pour séparer de votre texte
  };

  return (
    <div className={`sort-icon ${direction ? direction : ''}`} style={iconStyle}>
      {direction === 'asc' && '↑'}
      {direction === 'desc' && '↓'}
    </div>
  );
};

export default SortIcon;
