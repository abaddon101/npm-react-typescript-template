/**
 * SearchBar Component
 *
 * This component provides a search input for filtering a list of entries. It includes
 * options to dynamically update the displayed results based on the user's input.
 *
 * @component
 * @param {Object} props - The properties of the SearchBar component.
 * @param {function} props.onSearch - A callback function triggered when the user types
 *     in the search input. It receives the current search term as a parameter.
 * @param {boolean} props.isFilterActive - A boolean flag indicating whether filtering
 *     is currently active. When true, a message is displayed indicating that the
 *     displayed entries are filtered.
 *
 * @example
 * // Basic usage with a search callback
 * <SearchBar onSearch={(term) => handleSearch(term)} isFilterActive={true} />
 *
 * @example
 * // Integration with a parent component
 * const MyParentComponent = () => {
 *   const handleSearch = (term) => {
 *     // Perform search logic
 *     // Update state or make API calls based on the search term
 *   };
 *
 *   return (
 *     <div>
 *       <SearchBar onSearch={handleSearch} isFilterActive={false} />
 *       {/* Other components or UI elements /}
 *     </div>
 *   );
 * };
 */
import React from 'react';
interface SearchBarProps {
    onSearch: (term: string) => void;
    isFilterActive: boolean;
}
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
