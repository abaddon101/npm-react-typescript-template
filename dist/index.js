'use strict';

var React = require('react');

// TableInfo.tsx
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
const TableInfo = ({ startRange, totalEmployees, filteredEmployees, searchTerm, }) => {
    // Additional information to display when entries are filtered.
    const entriesInfo = searchTerm.trim().length > 0
        ? ` (filtered from ${totalEmployees} total entries)`
        : "";
    // Rendering the component.
    return (React.createElement("div", null,
        "Showing ",
        filteredEmployees === 0 ? 0 : startRange,
        " to ",
        filteredEmployees,
        " ",
        "of ",
        filteredEmployees,
        " entries",
        entriesInfo));
};

// EntriesPerPageDropdown.tsx
const EntriesPerPageDropdown = ({ onChange }) => {
    const entriesPerPageOptions = [10, 25, 50, 100];
    const [selectedOption, setSelectedOption] = React.useState(entriesPerPageOptions[0]);
    const handleSelect = (event) => {
        const selectedValue = Number(event.target.value);
        setSelectedOption(selectedValue);
        onChange(selectedValue);
    };
    return (React.createElement("div", { className: "EntriesPerPageDropdown" },
        ' ',
        "Show",
        ' ',
        React.createElement("select", { value: selectedOption, onChange: handleSelect }, entriesPerPageOptions.map((option) => (React.createElement("option", { key: option, value: option }, option)))),
        ' ',
        "entries"));
};

const SortIcon = ({ direction }) => {
    const iconStyle = {
        fontSize: '12px', // Ajustez la taille selon vos besoins
        color: 'white', // Couleur blanche
        marginLeft: '5px', // Espacement à gauche pour séparer de votre texte
    };
    return (React.createElement("div", { className: `sort-icon ${direction ? direction : ''}`, style: iconStyle },
        direction === 'asc' && '↑',
        direction === 'desc' && '↓'));
};

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
const SearchBar = ({ onSearch, isFilterActive }) => {
    // State to manage the current search term
    const [searchTerm, setSearchTerm] = React.useState("");
    // Event handler for changes in the search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // Effect to trigger the search callback when the search term changes
    React.useEffect(() => {
        // Perform search when the search term meets certain criteria
        if (searchTerm.length >= 3 || searchTerm.length === 0) {
            onSearch(searchTerm);
        }
    }, [searchTerm, onSearch]);
    // Render the SearchBar component
    return (React.createElement("div", null,
        "Search:",
        React.createElement("input", { type: "text", placeholder: "", value: searchTerm, onChange: handleSearchChange }),
        isFilterActive));
};

const TablePlugin = ({ headers, data }) => {
    // State variables to manage the component's behavior
    const [entriesPerPage, setEntriesPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortKey, setSortKey] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState(undefined);
    const [searchTerm, setSearchTerm] = React.useState('');
    // Sample employee data
    const arrayHeader = headers;
    const array = data;
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
    const handleHeaderSort = (key) => {
        // Toggling sort direction if the same key is clicked again
        if (sortKey === key) {
            setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
        }
        else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    // Sorting the employees array based on selected key and direction
    const sortedEmployees = array.slice().sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (sortDirection === 'asc') {
            return aValue.toString().localeCompare(bValue.toString());
        }
        else if (sortDirection === 'desc') {
            return bValue.toString().localeCompare(aValue.toString());
        }
        else {
            return 0;
        }
    });
    // Filtering employees based on the search term
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    const filteredEmployees = sortedEmployees.filter((employee) => Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase()));
    // Function to handle changes in entries per page
    const handleEntriesPerPageChange = (value) => {
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
    const handleGoToPage = (pageNumber) => {
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
        if (i === FIRST_PAGE ||
            i === totalPages ||
            (i >= currentPage - PAGE_NEIGHBORS && i <= currentPage + PAGE_NEIGHBORS)) {
            pageButtons.push(React.createElement("button", { key: i, onClick: () => handleGoToPage(i), disabled: i === currentPage, style: buttonStyle }, i));
        }
        else if (i === FIRST_PAGE + 1 || i === totalPages - 1) {
            // Displaying ellipsis (...) next to the first and last buttons
            pageButtons.push(React.createElement("span", { key: i, className: "pagination-ellipsis", style: buttonStyle }, "..."));
        }
    }
    // Checking for empty table or empty search results
    const isTableEmpty = array.length === 0 && searchTerm === '';
    const isFilterResultEmpty = filteredEmployees.length === 0 && searchTerm !== '';
    // Rendering the table component with sorting, searching, and pagination controls
    return (React.createElement("div", null,
        React.createElement("header", { className: "header-app", style: {
                fontFamily: '"Times New Roman", serif',
                background: 'linear-gradient(to right, #3498db, #296fb9, #1f4a8d)',
                padding: '1rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            } },
            React.createElement("h2", { style: { color: '#fff' } }, "Tableau de Filtrage")),
        React.createElement("div", { className: "header-table", style: {
                display: 'flex',
                justifyContent: 'space-between',
                margin: '15px',
                width: '65%',
                borderBottom: '1px solid white', // Bordure blanche en bas
            } },
            React.createElement(EntriesPerPageDropdown, { onChange: handleEntriesPerPageChange }),
            React.createElement(SearchBar, { onSearch: handleSearch, isFilterActive: filteredEmployees.length > 0 })),
        React.createElement("table", { style: {
                display: 'table',
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '1rem',
                backgroundColor: '#fff',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid black', // Bordure de la table
            } },
            React.createElement("thead", { style: { backgroundColor: '#2980b9', color: '#fff' } },
                React.createElement("tr", null, arrayHeader.map((header, index) => (React.createElement("th", { key: index, onClick: () => handleHeaderSort(index), style: {
                        border: '1px solid white', // Bordure blanche
                        padding: '8px',
                        textAlign: 'left',
                        backgroundColor: '#3498db',
                    } },
                    header,
                    " ",
                    React.createElement(SortIcon, { direction: sortKey === index ? sortDirection : undefined })))))),
            React.createElement("tbody", null,
                isTableEmpty && !isFilterResultEmpty ? (React.createElement("tr", null,
                    React.createElement("td", { colSpan: arrayHeader.length }, "No data available in table"))) : (currentEmployees.map((employee, index) => (React.createElement("tr", { key: index, style: {
                        border: '1px solid black', // Bordure de chaque ligne
                        margin: '4px 0', // Marge entre chaque ligne
                    } }, arrayHeader.map((header, dataIndex) => (React.createElement("td", { key: dataIndex, style: {
                        border: '1px solid black', // Bordure de chaque cellule
                        padding: '8px',
                    } }, employee[arrayHeader.indexOf(header)]))))))),
                isFilterResultEmpty && !isTableEmpty && (React.createElement("tr", null,
                    React.createElement("td", { colSpan: 9 }, "No matching records found"))))),
        React.createElement("div", { style: { margin: '15px' } },
            React.createElement(TableInfo, { startRange: startRange, endRange: endRange, totalEmployees: totalEmployees, filteredEmployees: filteredEmployees.length, searchTerm: searchTerm })),
        React.createElement("div", { className: "pagination-controls", style: { marginTop: '15px' } },
            React.createElement("button", { onClick: handlePreviousPage, disabled: currentPage === 1, style: {
                    padding: '8px 12px',
                    margin: '0 5px',
                    border: '1px solid #007bff',
                    borderRadius: '5px',
                    color: '#fff',
                    background: 'rgb(52, 152, 219)',
                    cursor: 'pointer',
                } }, "Previous"),
            pageButtons,
            React.createElement("button", { onClick: handleNextPage, disabled: currentPage === totalPages, style: {
                    padding: '8px 12px',
                    margin: '0 5px',
                    border: '1px solid #007bff',
                    borderRadius: '5px',
                    color: '#fff',
                    background: 'rgb(52, 152, 219)',
                    cursor: 'pointer',
                } }, "Next"))));
};

exports.TablePlugin = TablePlugin;
//# sourceMappingURL=index.js.map
