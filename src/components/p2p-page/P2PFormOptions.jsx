import React from 'react'
import { Stack } from '@mui/material'
import { FormContentWrapper } from '../orderCreate-page/Styled'
import { FormOption } from './options/FormOption'
import { FormMultipleOption } from './options/FormMultipleOption'
import { useP2P } from '../../hooks/use-p2p.hook'
import { useBanks } from '../../hooks/use-banks.hook'
import { useCrypto } from '../../hooks/use-crypto.hook'

export const P2PFormOptions = ({ states, setState }) => {
  const { allBanks } = useBanks(states.currency)
  const { allCurrencies } = useP2P()
  const { cryptoNames } = useCrypto(states.currency)

  return (
    <FormContentWrapper>
      <Stack flexDirection={'row'} gap={2}>
        <FormMultipleOption label={"Method"} options={allBanks}
          selectedValues={states.selectedBanks}
          setSelectedValues={setState.banks} />
        <FormOption label={"Currency"} options={allCurrencies} value={states.currency} setValue={setState.currency} />
        <FormOption label={"Crypto"} options={cryptoNames} value={states.crypto} setValue={setState.crypto} />
      </Stack>
    </FormContentWrapper>
  )
}
