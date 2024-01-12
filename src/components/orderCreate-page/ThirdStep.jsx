import React from 'react'
import { Stack } from '@mui/material'
import { FormContentWrapper, FormSectionWrapper } from './Styled'
import { MainInfoPreview } from './third-step-sections/MainInfoPreview'
import { UserInfoPreview } from './third-step-sections/UserInfoPreview'
import { OrderInfoPreview } from './third-step-sections/OrderInfoPreview'
import { FeeSection } from './third-step-sections/FeeSection'

export const ThirdStep = ({ states }) => {
  return (
    <>
      <Stack gap={0.2}>
        <MainInfoPreview states={states} />
        <FormSectionWrapper>
          <FormContentWrapper width={'70%'}>
            <UserInfoPreview />
            <OrderInfoPreview states={states} />
          </FormContentWrapper>
        </FormSectionWrapper>
      </Stack>
      <FeeSection states={states} />
    </>
  )
}
