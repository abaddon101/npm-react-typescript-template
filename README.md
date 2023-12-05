# Table Plugin Modulable

The Table Plugin Modulable is a versatile React component designed for displaying and managing tabular data. It comes with features such as sorting, searching, pagination, and customizable entries per page. This README will guide you through the installation, functionality, usage, and advantages of the plugin.

## Introduction

The Table Plugin Modulable provides a flexible solution for efficient tabular data management in React applications. It offers modularity, configurability, and a user-friendly interface for enhanced data visualization.

## Installation

To install the Table Plugin Modulable, follow these steps:

1. Ensure you have Node.js installed on your machine.

2. Install the table-plugin using npm or yarn:

   ```shell
   npm install mr01-table-plugin
   ```

### Usage

#### Importing the Plugin

Import the TablePlugin component into your React application where you want to use it:

```js
import { TablePlugin } from 'mr01-table-plugin';
```

#### Integrating the Plugin

Use the TablePlugin component in your JSX:

```js
function App() {
  // headers of the array by example
  const headers: string[] = ["Firstname", "Lastname", "date of birth"];
  // data in the array by example
  const data: string[][] = [
    ["Stannis", "Baratheon", "1989/12/05"],
    ["Romulus", "Calghar", "1979/11/09"],
    ["Karadoc", "Ladose", "1998/10/13"],
    ["Perceval", "Legallois", "1997/09/17"],
    // ...
  ];

  return (
    <div className="App">
      {/* Utilization with headers and data */}
      <TablePlugin headers={headers} data={data} />
    </div>
  );
}

export default App;
```

#### Features and Customization

The Table Plugin Modulable offers the following features:

- Sorting: Click on column headers to sort data in ascending or descending order.

![sorting example](/src/assets/SortExample.png)

- Searching: Utilize the search bar to filter data based on a search term.
  ![searching example](/src/assets/searchExample.png)
- Pagination: Navigate through multiple pages of data with the pagination controls.
  ![pagination example](/src/assets/paginationExample.png)
- Entries Per Page: Adjust the number of entries displayed per page using the dropdown.
  ![entries example](/src/assets/showExample.png)
- Possibility to display or don't display element,if the showHeader or showTableInfo are false, they will be don't display, if they are true, they will be display

```js
function App() {
  // headers of the array by example
  const headers: string[] = ["Firstname", "Lastname", "date of birth"];
  // data in the array by example
  const data: string[][] = [
    ["Stannis", "Baratheon", "1989/12/05"],
    ["Romulus", "Calghar", "1979/11/09"],
    ["Karadoc", "Ladose", "1998/10/13"],
    ["Perceval", "Legallois", "1997/09/17"],
    // ...
  ];

  return (
    <div className="App">
      {/* Utilization with headers and data */}
      <TablePlugin headers={headers} data={data} showHeader={false} showTableInfo={false} />
    </div>
  );
}

export default App;
```

#### Components Overview

- TablePlugin
  The main component that orchestrates the rendering of the table and controls.

- EntriesPerPageDropdown
  A dropdown component to choose the number of entries per page.

- SearchBar
  An input component for searching/filtering data with optional filter status.

- SortIcon
  Displays an arrow icon indicating the sorting direction.

- TableInfo
  Displays information about the current page, total entries, and search term.

#### Advantages

- Modularity: Each feature is encapsulated into separate components, promoting reusability.

- Configurability: Easily configure the number of entries per page and handle sorting logic.

- User-friendly: Intuitive UI with clear indicators for sorting and filtering.

- Responsive: Adapts seamlessly to different screen sizes.

Enjoy using the Table Plugin Modulable for efficient tabular data management in your React applications!
