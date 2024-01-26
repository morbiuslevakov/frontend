import React from 'react'
import { Typography } from '@mui/material'
import { FormSelect } from '../Styled'
import { priceTypes } from '../../../utils/constants/order-create'
import { FormStackSection } from '../../form/FormStackSection'

export const PriceTypeSection = ({ setPriceType }) => {
  const handlePriceTypeSelect = (event) => {
    setPriceType(event.target.value)
  }

  return (
    <FormStackSection>
      <Typography>Тип цены</Typography>
      <FormSelect defaultValue={priceTypes[0].value} disableUnderline onChange={handlePriceTypeSelect}>
        {priceTypes.map(item => {
          return <option key={item.value} value={item.value}>{item.name}</option>
        })}
      </FormSelect>
    </FormStackSection>
  )
}
