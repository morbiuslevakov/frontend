import React from 'react'
import { FormContentWrapper, FormSectionWrapper, FormStack } from '../orderCreate-page/Styled'

export const FormStackSection = ({ children, isChat, ...props }) => {
  const isChatSx = isChat && { backgroundColor: '#151515 !important' }

  return (
    <FormSectionWrapper {...props} sx={{ ...isChatSx }}>
      <FormContentWrapper>
        <FormStack>
          {children}
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
