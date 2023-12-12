// Import the React library
import React from 'react';

// Define the prop types for the component
interface SortIconProps {
  direction: 'asc' | 'desc' | undefined;
}

// Define the functional component using TypeScript
const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
  // Define the styles for the sort icon
  const iconStyle: React.CSSProperties = {
    fontSize: '12px', // Adjust the size as needed
    color: 'white', // Set the color to white
    marginLeft: '5px', // Left spacing to separate from surrounding text
  };

  // Render the component
  return (
    <div className={`sort-icon ${direction ? direction : ''}`} style={iconStyle}>
      {/* Display the 'up' arrow if direction is 'asc' */}
      {direction === 'asc' && '↑'}

      {/* Display the 'down' arrow if direction is 'desc' */}
      {direction === 'desc' && '↓'}
    </div>
  );
};

// Export the component as the default export
export default SortIcon;
