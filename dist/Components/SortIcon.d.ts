import React from 'react';
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
declare const SortIcon: React.FC<SortIconProps>;
export default SortIcon;
