// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Import the Select component from the 'react-select' library
import Select from 'react-select';

// Define the prop types for the component
interface EntriesPerPageDropdownProps {
  onChange: (value: number) => void;
}

// Define the functional component using TypeScript
const EntriesPerPageDropdown: React.FC<EntriesPerPageDropdownProps> = ({ onChange }) => {
  // Define the available options for entries per page
  const entriesPerPageOptions = [10, 25, 50, 100];

  // Initialize the component state for the selected option
  const [selectedOption, setSelectedOption] = useState({
    value: entriesPerPageOptions[0],
    label: entriesPerPageOptions[0],
  });

  // Event handler for handling the selection in the dropdown
  const handleSelect = (selectedOption: { value: number; label: number }) => {
    // Update the component state with the selected option
    setSelectedOption(selectedOption);

    // Trigger the onChange callback with the selected value
    onChange(selectedOption.value);
  };

  // Render the component
  return (
    <div className="EntriesPerPageDropdown">
      {/* Display a text label */}
      <span>Show </span>

      {/* Render the Select component from 'react-select' */}
      <Select
        value={selectedOption}
        onChange={handleSelect}
        // Map entriesPerPageOptions to the required format for react-select
        options={entriesPerPageOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        // Customize the styles for the dropdown and menu
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: '1px solid rgba(52, 152, 219, 0.7)',
            borderRadius: '5px',
            boxShadow: state.isFocused ? '0 0 5px  #3498db ' : 'none',
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
          }),
        }}
      />

      {/* Display a text label */}
      <span> entries</span>
    </div>
  );
};

// Export the component as the default export
export default EntriesPerPageDropdown;
