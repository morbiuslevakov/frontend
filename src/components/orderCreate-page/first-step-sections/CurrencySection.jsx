import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { CurrencyWrapper } from '../Styled'
import { ListDrawer } from '../../drawer/ListDrawer'
import { FormStackSection } from '../../form/FormStackSection'

export const CurrencySection = ({ allCurrencies, currency, setCurrency }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const handleCurrency = (value) => {
    setCurrency(value)
    handleDrawer()
  }

  return (
    <FormStackSection>
      <Typography>Фиатная валюта</Typography>
      <CurrencyWrapper onClick={handleDrawer}>
        <Typography variant='blue' fontWeight={600}>{currency}</Typography>
      </CurrencyWrapper>
      <ListDrawer items={allCurrencies} isOpen={isOpen} handleDrawer={handleDrawer} handleSelect={handleCurrency} />
    </FormStackSection>
  )
}
