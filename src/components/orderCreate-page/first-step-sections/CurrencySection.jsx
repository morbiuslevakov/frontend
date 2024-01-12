import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { CurrencyWrapper, FormContentWrapper, FormSectionWrapper, FormStack } from '../Styled'
import { ListDrawer } from '../../drawer/ListDrawer'

export const CurrencySection = ({ allCurrencies, currency, handleCurrencySelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const handleCurrency = (value) => {
    handleCurrencySelect(value)
    handleDrawer()
  }

  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Typography>Фиатная валюта</Typography>
          <CurrencyWrapper onClick={handleDrawer}>
            <Typography variant='blue' fontWeight={600}>{currency}</Typography>
          </CurrencyWrapper>
          <ListDrawer items={allCurrencies} isOpen={isOpen} handleDrawer={handleDrawer} handleSelect={handleCurrency} />
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
