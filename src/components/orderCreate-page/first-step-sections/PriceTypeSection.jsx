import React from 'react'
import { Typography } from '@mui/material'
import { FormContentWrapper, FormSectionWrapper, FormSelect, FormStack } from '../Styled'
import { priceTypes } from '../../../utils/constants/order-create'

export const PriceTypeSection = ({ selectPriceType }) => {
  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Typography>Тип цены</Typography>
          <FormSelect defaultValue={priceTypes[0].value} disableUnderline onChange={selectPriceType}>
            {priceTypes.map(item => {
              return <option key={item.value} value={item.value}>{item.name}</option>
            })}
          </FormSelect>
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
