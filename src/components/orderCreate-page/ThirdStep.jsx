import React from 'react'
import { Stack } from '@mui/material'
import { FormContentWrapper, FormSectionWrapper } from './Styled'
import { MainInfoPreview } from './third-step-sections/MainInfoPreview'
import { UserInfoPreview } from './third-step-sections/UserInfoPreview'
import { OrderInfoPreview } from './third-step-sections/OrderInfoPreview'
import { FeeSection } from './third-step-sections/FeeSection'
import { OrderCreatedModal } from './third-step-sections/OrderCreatedModal'
import { OrderErrorModal } from './third-step-sections/OrderErrorModal'

export const ThirdStep = ({ states, setState }) => {
  const isSell = states.orderAction === "SELL"

  return (
    <>
      <OrderErrorModal error={states.orderError} setError={setState.orderError} />
      <OrderCreatedModal isOpen={states.isCreated} />
      <Stack gap={0.2}>
        <MainInfoPreview states={states} />
        <FormSectionWrapper>
          <FormContentWrapper width={'75%'}>
            <UserInfoPreview userDetails={states.userDetails} />
            <OrderInfoPreview states={states} />
          </FormContentWrapper>
        </FormSectionWrapper>
      </Stack>
      {isSell && <FeeSection />}
    </>
  )
}
