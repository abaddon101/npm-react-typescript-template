import React, { useState } from 'react';
import Select from 'react-select';

interface EntriesPerPageDropdownProps {
  onChange: (value: number) => void;
}

const EntriesPerPageDropdown: React.FC<EntriesPerPageDropdownProps> = ({ onChange }) => {
  const entriesPerPageOptions = [10, 25, 50, 100];
  const [selectedOption, setSelectedOption] = useState({
    value: entriesPerPageOptions[0],
    label: entriesPerPageOptions[0],
  });

  const handleSelect = (selectedOption: { value: number; label: number }) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption.value);
  };

  return (
    <div className="EntriesPerPageDropdown">
      <span>Show </span>
      <Select
        value={selectedOption}
        onChange={handleSelect}
        options={entriesPerPageOptions.map((option) => ({
          value: option,
          label: option,
        }))}
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
      <span> entries</span>
    </div>
  );
};

export default EntriesPerPageDropdown;
