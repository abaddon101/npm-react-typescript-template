// SortIcon.tsx
import React from 'react';
// import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
// import "./SortIcon.css"; // Make sure to import the CSS file for your styles

/**
 * SortIcon Component
 *
 * Displays an arrow icon indicating the sorting direction (ascending or descending).
 *
 * @component
 * @param {object} props - The properties of the SortIcon component.
 * @param {"asc" | "desc" | undefined} props.direction - The sorting direction: "asc" for ascending, "desc" for descending, or undefined for no sorting.
 * @returns {JSX.Element} - The rendered SortIcon component.
 */
interface SortIconProps {
  direction: 'asc' | 'desc' | undefined;
}

const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
  return (
    <div className={`sort-icon ${direction ? direction : ''}`}>
      {direction === 'asc' && 'up'}
      {direction === 'desc' && 'down'}
    </div>
  );
};

export default SortIcon;
