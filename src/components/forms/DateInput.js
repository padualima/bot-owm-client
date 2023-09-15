import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

function DateInput() {
  const [maskedDate, setMaskedDate] = useState('');

  const handleMaskedDateChange = (event) => {
    setMaskedDate(event.target.value);
  };

  return (
    <InputMask
      mask="99/99/9999"
      value={maskedDate}
      onChange={handleMaskedDateChange}
      maskChar={null}
      sx={{ width: '180px' }}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          style={{ margin: '5px 0' }}
          label="Data de Publicação"
          fullWidth
          placeholder="dd/mm/aaaa"
        />
      )}
    </InputMask>
  );
}

export default DateInput;
