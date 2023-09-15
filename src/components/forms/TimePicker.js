import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function TimePicker() {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const hours = [...Array(24).keys()]; // Cria um array de horas de 0 a 23
  const minutes = [...Array(60).keys()]; // Cria um array de minutos de 0 a 59

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };

  return (
    <>
      <FormControl variant="outlined" sx={{ width: '90px' }}>
        <InputLabel htmlFor="hour-select">Hora</InputLabel>
        <Select
          label="Hora"
          value={selectedHour}
          onChange={handleHourChange}
          inputProps={{
            name: 'hour',
            id: 'hour-select',
          }}
          style={{ margin: '5px' }}
        >
          {hours.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ width: '90px' }}>
        <InputLabel htmlFor="minute-select">Minutos</InputLabel>
        <Select
          label="Minutos"
          value={selectedMinute}
          onChange={handleMinuteChange}
          inputProps={{
            name: 'minute',
            id: 'minute-select',
          }}
          style={{ margin: '5px' }}
        >
          {minutes.map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default TimePicker;
