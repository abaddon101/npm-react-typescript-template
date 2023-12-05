import React, { useState } from 'react';
// import Table from "react-bootstrap/Table";
import TableInfo from './TableInfo';
import EntriesPerPageDropdown from './EntriesPerPageDropdown';
import SortIcon from './SortIcon';
import SearchBar from './SearchBar';
// import employeesData from './data'; // Import the data
// import { Employee } from './data';
// import '../styles.module.css';

/**
 * The `TablePlugin` component is a versatile table display component for rendering employee information.
 * It includes features like sorting, searching, pagination, and configurable entries per page.
 * @component
 * @returns {JSX.Element} The rendered `TablePlugin` component.
 */

interface TablePluginProps {
  headers: string[];
  data: string[][];
}

const TablePlugin: React.FC<TablePluginProps> = ({ headers, data }) => {
  // State variables to manage the component's behavior
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<number | null>(null);

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sample employee data
  const arrayHeader: string[] = headers;
  const array: string[][] = data;
  // Calculating various metrics for display and pagination
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, array.length);
  const totalEmployees = array.length;
  const totalPages = Math.ceil(totalEmployees / entriesPerPage);

  // Function to handle sorting of the table en envoyant l'index
  // const handleSort = (key: number) => {
  //   // Toggling sort direction if the same key is clicked again
  //   if (sortKey === key) {
  //     setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  //   } else {
  //     setSortKey(key);
  //     setSortDirection('asc');
  //   }
  // };

  const handleHeaderSort = (key: number) => {
    // Toggling sort direction if the same key is clicked again
    if (sortKey === key) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Sorting the employees array based on selected key and direction
  const sortedEmployees = array.slice().sort((a, b) => {
    const aValue = a[sortKey as number];
    const bValue = b[sortKey as number];

    if (sortDirection === 'asc') {
      return aValue.toString().localeCompare(bValue.toString());
    } else if (sortDirection === 'desc') {
      return bValue.toString().localeCompare(aValue.toString());
    } else {
      return 0;
    }
  });

  // Filtering employees based on the search term
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredEmployees = sortedEmployees.filter((employee) =>
    Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Function to handle changes in entries per page
  const handleEntriesPerPageChange = (value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  // Functions to handle pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleGoToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  // Slicing the array to display only the relevant employees on the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Configurations for pagination buttons
  const PAGE_NEIGHBORS = 1;
  const FIRST_PAGE = 1;
  const pageButtons = [];
  const buttonStyle = {
    padding: '8px 12px',
    margin: '0 5px',
    border: '1px solid #007bff',
    borderRadius: '5px',
    color: '#fff',
    background: 'rgb(52, 152, 219)',
    cursor: 'pointer',
  };

  for (let i = 1; i <= totalPages; i++) {
    // Displaying the first and last button, as well as neighbors of the current page
    if (
      i === FIRST_PAGE ||
      i === totalPages ||
      (i >= currentPage - PAGE_NEIGHBORS && i <= currentPage + PAGE_NEIGHBORS)
    ) {
      pageButtons.push(
        <button key={i} onClick={() => handleGoToPage(i)} disabled={i === currentPage} style={buttonStyle}>
          {i}
        </button>,
      );
    } else if (i === FIRST_PAGE + 1 || i === totalPages - 1) {
      // Displaying ellipsis (...) next to the first and last buttons
      pageButtons.push(
        <span key={i} className="pagination-ellipsis" style={buttonStyle}>
          ...
        </span>,
      );
    }
  }

  // Checking for empty table or empty search results
  const isTableEmpty = array.length === 0 && searchTerm === '';
  const isFilterResultEmpty = filteredEmployees.length === 0 && searchTerm !== '';

  // Rendering the table component with sorting, searching, and pagination controls

  return (
    <div>
      {/* Navigation links */}
      <header
        className="header-app"
        style={{
          fontFamily: '"Times New Roman", serif',
          background: 'linear-gradient(to right, #3498db, #296fb9, #1f4a8d)',
          padding: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ color: '#fff' }}>Tableau de Filtrage</h2>
      </header>
      <div
        className="header-table"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px',
          width: '65%',
          borderBottom: '1px solid white', // Bordure blanche en bas
        }}
      >
        <EntriesPerPageDropdown onChange={handleEntriesPerPageChange} />
        <SearchBar onSearch={handleSearch} isFilterActive={filteredEmployees.length > 0} />
      </div>

      {/* Table displaying employee information */}
      <table
        style={{
          display: 'table',
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '1rem',
          backgroundColor: '#fff',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid black', // Bordure de la table
        }}
      >
        <thead style={{ backgroundColor: '#2980b9', color: '#fff' }}>
          <tr>
            {arrayHeader.map((header, index) => (
              <th
                key={index}
                onClick={() => handleHeaderSort(index)}
                style={{
                  border: '1px solid white', // Bordure blanche
                  padding: '8px',
                  textAlign: 'left',
                  backgroundColor: '#3498db',
                }}
              >
                {header} <SortIcon direction={sortKey === index ? sortDirection : undefined} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isTableEmpty && !isFilterResultEmpty ? (
            <tr>
              <td colSpan={arrayHeader.length}>No data available in table</td>
            </tr>
          ) : (
            currentEmployees.map((employee: Array<string>, index: number) => (
              <tr
                key={index}
                style={{
                  border: '1px solid black', // Bordure de chaque ligne
                  margin: '4px 0', // Marge entre chaque ligne
                }}
              >
                {arrayHeader.map((header, dataIndex) => (
                  <td
                    key={dataIndex}
                    style={{
                      border: '1px solid black', // Bordure de chaque cellule
                      padding: '8px',
                    }}
                  >
                    {employee[arrayHeader.indexOf(header)]}
                  </td>
                ))}
              </tr>
            ))
          )}
          {isFilterResultEmpty && !isTableEmpty && (
            <tr>
              <td colSpan={9}>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Displaying information about the current page, total entries, and search term */}
      <div style={{ margin: '15px' }}>
        <TableInfo
          startRange={startRange}
          endRange={endRange}
          totalEmployees={totalEmployees}
          filteredEmployees={filteredEmployees.length}
          searchTerm={searchTerm}
        />
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls" style={{ marginTop: '15px' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            margin: '0 5px',
            border: '1px solid #007bff',
            borderRadius: '5px',
            color: '#fff',
            background: 'rgb(52, 152, 219)',
            cursor: 'pointer',
          }}
        >
          Previous
        </button>

        {pageButtons}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            margin: '0 5px',
            border: '1px solid #007bff',
            borderRadius: '5px',
            color: '#fff',
            background: 'rgb(52, 152, 219)',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePlugin;
