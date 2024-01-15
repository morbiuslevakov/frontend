import React from 'react'
import { Typography } from '@mui/material'
import { FormContentWrapper, FormSectionWrapper, FormSelect, FormStack } from '../Styled'
import { actionType } from '../../../utils/constants/order-create'

export const TokenSection = ({ orderAction, allTokens, setToken }) => {
  const handleTokenSelect = (event) => {
    setToken(event.target.value)
  }

  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Typography>{actionType[orderAction]} криптовалюту</Typography>
          <FormSelect defaultValue={allTokens[0].alias} disableUnderline onChange={handleTokenSelect}>
            {allTokens.map(token => {
              return <option key={token.alias} value={token.alias}>{token.alias}</option>
            })}
          </FormSelect>
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
