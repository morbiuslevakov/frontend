import React from 'react'
import { Stack } from '@mui/material'
import { FormContentWrapper, FormSectionWrapper } from './Styled'
import { MainInfoPreview } from './third-step-sections/MainInfoPreview'
import { UserInfoPreview } from './third-step-sections/UserInfoPreview'
import { OrderInfoPreview } from './third-step-sections/OrderInfoPreview'
import { FeeSection } from './third-step-sections/FeeSection'
import { OrderCreatedModal } from './third-step-sections/OrderCreatedModal'

export const ThirdStep = ({ states }) => {
  return (
    <>
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
      <FeeSection states={states} />
    </>
  )
}
