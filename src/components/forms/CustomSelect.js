import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CustomSelect = ({ options, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth style={{ margin: '5px 0' }}>
      <InputLabel>{placeholder}</InputLabel>
      <Select
        value={selectedValue}
        onChange={handleSelectChange}
        fullWidth
        label={placeholder}
        input={<OutlinedInput label={placeholder} />}
      >
        <MenuItem disabled>Selecione uma opção</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
