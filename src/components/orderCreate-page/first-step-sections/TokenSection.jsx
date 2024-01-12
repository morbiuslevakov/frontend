import React from 'react'
import { FormContentWrapper, FormSectionWrapper, FormSelect, FormStack } from '../Styled'
import { Typography } from '@mui/material'

export const TokenSection = ({ orderAction, allTokens, handleTokenSelect }) => {
  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Typography>{orderAction} криптовалюту</Typography>
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
