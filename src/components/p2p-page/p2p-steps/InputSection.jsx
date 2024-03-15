import React from 'react'
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { FormInput } from './Styled'
import { P2PInputHandleChange, countMaxLimit, inputText } from '../../../utils/p2p-utils'
import SwapVertIcon from '@mui/icons-material/SwapVert';

export const InputSection = ({ amount, setAmount, states, setState, oneTokenPrice, maxLimit, order }) => {
  const isCrypto = states.inputValue === "crypto"
  const maxBalance = states.walletInfo.assets[states.crypto].balance
  const inputAdornment = inputText(isCrypto, states.crypto, states.currency)
  const cryptoInCurrency = parseFloat((amount * oneTokenPrice).toFixed(2))
  const currencyInCrypto = parseFloat((amount / oneTokenPrice).toFixed(2))
  const buttonText = states.type === "SELL" ? "Купить все" : "Продать все"

  const handleChange = (event) => {
    P2PInputHandleChange(event, setAmount, maxLimit)
  }

  const handleMax = () => {
    setAmount(maxLimit)
  }

  const handleChangeInputValue = () => {
    if (states.inputValue === 'currency') {
      setState.inputValue('crypto')
      const newValue = parseFloat((amount / oneTokenPrice).toFixed(2))
      const newMaxLimit = countMaxLimit('crypto', order.available, oneTokenPrice, maxBalance, states.type)
      setAmount(newValue < Number(newMaxLimit) ? newValue : newMaxLimit)
    }
    if (states.inputValue === 'crypto') {
      setState.inputValue('currency')
      const newValue = parseFloat((amount * oneTokenPrice).toFixed(2))
      const newMaxLimit = countMaxLimit('currency', order.available, oneTokenPrice, maxBalance, states.type)
      setAmount(newValue < Number(newMaxLimit) ? newValue : newMaxLimit)
    }
  }

  return (
    <FormContentWrapper mb={4}>
      <FormInput variant="standard" width={'420px'} value={amount} onChange={handleChange} InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position='start'>
            <Stack flexDirection={'row'}>
              <Typography pt={2} variant='gray' fontSize={40} fontWeight={600}>{inputAdornment}</Typography>
              <IconButton onClick={handleChangeInputValue}><SwapVertIcon color='gray' fontSize='large' /></IconButton>
            </Stack>
          </InputAdornment>
        )
      }} />
      <Box ml={1}>
        {isCrypto ? <Typography variant={'gray'} >{cryptoInCurrency} {states.currency}</Typography>
          : <Typography variant={'gray'} >{currencyInCrypto} {states.crypto}</Typography>}
      </Box>
      <Typography ml={1} mb={1}>Цена за 1 {states.crypto} ≈ {oneTokenPrice} {states.currency}</Typography>
      <Button color='blue' onClick={handleMax}>{buttonText}</Button>
    </FormContentWrapper>
  )
}
