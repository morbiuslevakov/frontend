import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { OptionWrapper } from './Styled'
import { menuProps, selectStyle } from '../../../utils/constants/select-options'

export const FormOption = ({ label, options, value, setValue, width }) => {
  const customWidth = width || 120

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  if (options.length === 0) {
    return null;
  }

  return (
    <OptionWrapper width={customWidth}>
      <FormControl fullWidth>
        <InputLabel variant='standard'>
          <Typography variant='gray'>{label}</Typography>
        </InputLabel>
        <Select
          disableUnderline
          variant="standard"
          value={value}
          label={label}
          onChange={handleChange}
          sx={selectStyle}
          MenuProps={menuProps}
        >
          {options.map(option => {
            return <MenuItem key={option} value={option}>
              <Typography>{option}</Typography>
            </MenuItem>
          })}
        </Select>
      </FormControl>
    </OptionWrapper >
  )
}
