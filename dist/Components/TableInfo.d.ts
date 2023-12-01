import React from "react";
interface TableInfoProps {
    startRange: number;
    endRange: number;
    totalEmployees: number;
    filteredEmployees: number;
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
declare const TableInfo: React.FC<TableInfoProps>;
export default TableInfo;
