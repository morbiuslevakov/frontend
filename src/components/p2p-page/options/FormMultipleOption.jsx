import React from 'react'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, Typography } from '@mui/material'
import { OptionWrapper } from './Styled'
import { menuProps, selectStyle } from '../../../utils/constants/select-options';

export const FormMultipleOption = ({ label, options, selectedValues, setSelectedValues }) => {
  const handleChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === 'All') {
      setSelectedValues(selectedValues.includes('All') ? [] : ['All', ...options.map(option => option.id)]);
    } else {
      setSelectedValues(value.filter(item => item !== 'All'));
    }
  };

  const handleClose = () => {
    if (selectedValues.length === 0) {
      setSelectedValues(['All', ...options.map(option => option.id)]);
    }
  };

  return (
    <OptionWrapper width={120}>
      <FormControl fullWidth>
        <InputLabel variant='standard'>
          <Typography variant='gray'>{label}</Typography>
        </InputLabel>
        <Select
          variant='standard'
          disableUnderline
          multiple
          value={selectedValues}
          onChange={handleChange}
          onClose={handleClose}
          renderValue={(selected) =>
            selected.includes('All') || selected.length === options.length + 1
              ? 'All'
              : options.filter(option => selected.includes(option.id)).map(option => option.name).join(', ')
          }
          sx={selectStyle}
          MenuProps={menuProps}
        >
          <MenuItem value="All">
            <Checkbox checked={selectedValues.includes('All')} />
            <ListItemText primary="All" />
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={selectedValues.includes(option.id)} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </OptionWrapper>
  );
}
