// TableInfo.tsx
import React from "react";

interface TableInfoProps {
  // The starting range of displayed entries.
  startRange: number;

  // The ending range of displayed entries.
  endRange: number;

  // The total number of employees in the dataset.
  totalEmployees: number;

  // The number of employees after applying any filtering.
  filteredEmployees: number;

  // The search term used for filtering the entries.
  searchTerm: string;
}

/**
 * TableInfo Component
 *
 * Displays information about the currently shown entries, such as the range,
 * total number of entries, and any applied filtering information.
 *
 * @param startRange - The starting range of displayed entries.
 * @param endRange - The ending range of displayed entries.
 * @param totalEmployees - The total number of employees in the dataset.
 * @param filteredEmployees - The number of employees after applying any filtering.
 * @param searchTerm - The search term used for filtering the entries.
 */
const TableInfo: React.FC<TableInfoProps> = ({
  startRange,
  totalEmployees,
  filteredEmployees,
  searchTerm,
}) => {
  // Additional information to display when entries are filtered.
  const entriesInfo =
    searchTerm.trim().length > 0
      ? ` (filtered from ${totalEmployees} total entries)`
      : "";

  // Rendering the component.
  return (
    <div>
      Showing {filteredEmployees === 0 ? 0 : startRange} to {filteredEmployees}{" "}
      of {filteredEmployees} entries
      {entriesInfo}
    </div>
  );
};

// Exporting the TableInfo component as the default export.
export default TableInfo;
