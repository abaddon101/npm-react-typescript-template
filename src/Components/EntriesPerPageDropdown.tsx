// EntriesPerPageDropdown.tsx
import React, { useState } from 'react';

interface EntriesPerPageDropdownProps {
  onChange: (value: number) => void;
}

const EntriesPerPageDropdown: React.FC<EntriesPerPageDropdownProps> = ({ onChange }) => {
  const entriesPerPageOptions = [10, 25, 50, 100];
  const [selectedOption, setSelectedOption] = useState(entriesPerPageOptions[0]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="EntriesPerPageDropdown">
      {' '}
      {/* Ajouter la classe ici */}
      Show{' '}
      <select value={selectedOption} onChange={handleSelect}>
        {entriesPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>{' '}
      entries
    </div>
  );
};

export default EntriesPerPageDropdown;
