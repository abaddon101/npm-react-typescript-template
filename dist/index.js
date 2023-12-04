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

// SortIcon.tsx
const SortIcon = ({ direction }) => {
    return (React.createElement("div", { className: `sort-icon ${direction ? direction : ''}` },
        direction === 'asc' && 'up',
        direction === 'desc' && 'down'));
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
        isFilterActive && React.createElement("p", null, "(filtered from total entries)")));
};

const TablePlugin = ({ headers, data }) => {
    // State variables to manage the component's behavior
    const [entriesPerPage, setEntriesPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortKey, setSortKey] = React.useState(0);
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
    // const sortedEmployees = array.sort((a, b) => {
    //   const aValue = a[sortKey];
    //   const bValue = b[sortKey];
    //   if (sortDirection === 'asc') {
    //     return aValue.toString().localeCompare(bValue.toString());
    //   } else if (sortDirection === 'desc') {
    //     return bValue.toString().localeCompare(aValue.toString());
    //   } else {
    //     return 0;
    //   }
    // });
    const sortedEmployees = array;
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
    for (let i = 1; i <= totalPages; i++) {
        // Displaying the first and last button, as well as neighbors of the current page
        if (i === FIRST_PAGE ||
            i === totalPages ||
            (i >= currentPage - PAGE_NEIGHBORS && i <= currentPage + PAGE_NEIGHBORS)) {
            pageButtons.push(React.createElement("button", { key: i, onClick: () => handleGoToPage(i), disabled: i === currentPage }, i));
        }
        else if (i === FIRST_PAGE + 1 || i === totalPages - 1) {
            // Displaying ellipsis (...) next to the first and last buttons
            pageButtons.push(React.createElement("span", { key: i, className: "pagination-ellipsis" }, "..."));
        }
    }
    // Checking for empty table or empty search results
    const isTableEmpty = array.length === 0 && searchTerm === '';
    const isFilterResultEmpty = filteredEmployees.length === 0 && searchTerm !== '';
    // Rendering the table component with sorting, searching, and pagination controls
    return (React.createElement("div", null,
        React.createElement("header", { className: "header-app" },
            React.createElement("h2", null, "Tableau de Filtrage")),
        React.createElement("div", { className: "header-table" },
            React.createElement(EntriesPerPageDropdown, { onChange: handleEntriesPerPageChange }),
            React.createElement(SearchBar, { onSearch: handleSearch, isFilterActive: filteredEmployees.length > 0 })),
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null, arrayHeader.map((header, index) => (React.createElement("th", { key: index, onClick: () => handleHeaderSort(index) },
                    header,
                    " ",
                    React.createElement(SortIcon, { direction: sortKey === index ? sortDirection : undefined })))))),
            React.createElement("tbody", null,
                isTableEmpty && !isFilterResultEmpty ? (React.createElement("tr", null,
                    React.createElement("td", { colSpan: arrayHeader.length }, "No data available in table"))) : (currentEmployees.map((employee, index) => (React.createElement("tr", { key: index }, arrayHeader.map((header, dataIndex) => (React.createElement("td", { key: dataIndex }, employee[arrayHeader.indexOf(header)]))))))),
                isFilterResultEmpty && !isTableEmpty && (React.createElement("tr", null,
                    React.createElement("td", { colSpan: 9 }, "No matching records found"))))),
        React.createElement(TableInfo, { startRange: startRange, endRange: endRange, totalEmployees: totalEmployees, filteredEmployees: filteredEmployees.length, searchTerm: searchTerm }),
        React.createElement("div", { className: "pagination-controls" },
            React.createElement("button", { onClick: handlePreviousPage, disabled: currentPage === 1 }, "Previous"),
            pageButtons,
            React.createElement("button", { onClick: handleNextPage, disabled: currentPage === totalPages }, "Next"))));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* @import '~bootstrap/scss/bootstrap'; */\r\n/* Importation de Bootstrap 5 */\r\nbody {\r\n  font-family: 'Times New Roman', serif;\r\n}\r\n.styles-module_header-container__rL9dS {\r\n  background: linear-gradient(to right, #3498db, #2980b9, #1f618d);\r\n  padding: 1rem;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r\n}\r\n.styles-module_header-container__rL9dS img {\r\n  height: 80px;\r\n}\r\n.styles-module_header-container__rL9dS a {\r\n  text-decoration: none;\r\n  color: #fafafa;\r\n  font-size: 18px;\r\n  margin-left: 20px;\r\n}\r\n.styles-module_header-container__rL9dS .styles-module_App-logo__7NhVt {\r\n  height: 40px;\r\n  transition: opacity 0.3s ease-in-out;\r\n  border-radius: 5px;\r\n}\r\n.styles-module_header-container__rL9dS .styles-module_App-logo__7NhVt:hover {\r\n  opacity: 0.8;\r\n}\r\n.styles-module_welcome-message__pSWCQ {\r\n  margin: 40px 20px;\r\n  font-size: 24px;\r\n  line-height: 1.5;\r\n  color: #333;\r\n}\r\n.styles-module_header-table__QQZON {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin: 15px;\r\n  width: 75%;\r\n}\r\n.styles-module_table__pSrFL {\r\n  width: 100%;\r\n  margin-bottom: 1rem;\r\n  background-color: #fff;\r\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\r\n  border-collapse: collapse;\r\n  overflow-x: auto;\r\n}\r\n.styles-module_table__pSrFL th,\r\n.styles-module_table__pSrFL td {\r\n  padding: 8px;\r\n  font-size: 14px;\r\n}\r\n.styles-module_table__pSrFL th {\r\n  background-color: #2980b9;\r\n  color: #fff;\r\n  cursor: pointer;\r\n}\r\n.styles-module_table__pSrFL tbody tr:hover {\r\n  background-color: #f8f9fa;\r\n}\r\n.styles-module_sort-icon__-J-va {\r\n  display: inline-block;\r\n  margin-left: 5px;\r\n  vertical-align: middle;\r\n}\r\n.styles-module_sort-icon__-J-va .styles-module_icon__f5RIm {\r\n  color: #3498db;\r\n  font-size: 1.2em;\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n.styles-module_sort-icon__-J-va.styles-module_desc__1fbqJ .styles-module_icon__f5RIm {\r\n  transform: rotate(180deg);\r\n}\r\n.styles-module_pagination-controls__pH8wx {\r\n  margin-top: 20px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n.styles-module_pagination-controls__pH8wx button {\r\n  padding: 8px 12px;\r\n  margin: 0 5px;\r\n  border: 1px solid #007bff;\r\n  color: #007bff;\r\n  background-color: #fff;\r\n  cursor: pointer;\r\n}\r\n.styles-module_pagination-controls__pH8wx button:hover {\r\n  background-color: #007bff;\r\n  color: #fff;\r\n}\r\n.styles-module_pagination-controls__pH8wx button:disabled {\r\n  cursor: not-allowed;\r\n  background-color: #e9ecef;\r\n  border-color: #e9ecef;\r\n  color: #6c757d;\r\n}\r\n.styles-module_SearchBar__WBVnz {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-bottom: 20px;\r\n}\r\n.styles-module_SearchBar__WBVnz input {\r\n  padding: 8px;\r\n  border: 1px solid #ced4da;\r\n  border-radius: 4px;\r\n  margin-left: 8px;\r\n  font-size: 14px;\r\n}\r\n.styles-module_SearchBar__WBVnz p {\r\n  margin-left: 8px;\r\n  color: #6c757d;\r\n}\r\n.styles-module_EntriesPerPageDropdown__cjT5A {\r\n  display: inline-block;\r\n  margin-left: 20px;\r\n}\r\n.styles-module_EntriesPerPageDropdown__cjT5A .styles-module_dropdown-toggle__iI5LG {\r\n  background-color: #2980b9;\r\n  color: #fff;\r\n  border: 1px solid #2980b9;\r\n}\r\n.styles-module_EntriesPerPageDropdown__cjT5A .styles-module_dropdown-menu__1546i {\r\n  background-color: #fff;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r\n}\r\n.styles-module_EntriesPerPageDropdown__cjT5A .styles-module_dropdown-menu__1546i .styles-module_dropdown-item__4cKfb {\r\n  color: #495057;\r\n}\r\n.styles-module_EntriesPerPageDropdown__cjT5A .styles-module_dropdown-menu__1546i .styles-module_dropdown-item__4cKfb:hover {\r\n  background-color: #f8f9fa;\r\n  color: #007bff;\r\n}\r\n.styles-module_container-border__3ZGWY {\r\n  border: 1px solid #ced4da;\r\n  border-radius: 8px;\r\n  padding: 20px;\r\n  margin-top: 20px;\r\n  background: linear-gradient(to right, #3498db, #2980b9, #1f618d);\r\n  color: white;\r\n}\r\n.styles-module_mb-3__IDfB7 {\r\n  margin-bottom: 1rem;\r\n}\r\n.styles-module_text-center__WgHzT {\r\n  text-align: center;\r\n}\r\n.styles-module_label-fixed-width__lUPNc {\r\n  width: 150px;\r\n}\r\n.styles-module_button-custom__r76QT {\r\n  margin: 15px;\r\n  background: linear-gradient(to right, #3498db, #2980b9, #1f618d);\r\n  color: white;\r\n  border: none;\r\n}\r\n";
var styles_module = {"header-container":"styles-module_header-container__rL9dS","App-logo":"styles-module_App-logo__7NhVt","welcome-message":"styles-module_welcome-message__pSWCQ","header-table":"styles-module_header-table__QQZON","table":"styles-module_table__pSrFL","sort-icon":"styles-module_sort-icon__-J-va","icon":"styles-module_icon__f5RIm","desc":"styles-module_desc__1fbqJ","pagination-controls":"styles-module_pagination-controls__pH8wx","SearchBar":"styles-module_SearchBar__WBVnz","EntriesPerPageDropdown":"styles-module_EntriesPerPageDropdown__cjT5A","dropdown-toggle":"styles-module_dropdown-toggle__iI5LG","dropdown-menu":"styles-module_dropdown-menu__1546i","dropdown-item":"styles-module_dropdown-item__4cKfb","container-border":"styles-module_container-border__3ZGWY","mb-3":"styles-module_mb-3__IDfB7","text-center":"styles-module_text-center__WgHzT","label-fixed-width":"styles-module_label-fixed-width__lUPNc","button-custom":"styles-module_button-custom__r76QT"};
styleInject(css_248z);

exports.Styles = styles_module;
exports.TablePlugin = TablePlugin;
//# sourceMappingURL=index.js.map
