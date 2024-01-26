import React from 'react'
import { FormContentWrapper, FormSectionWrapper, FormStack } from '../orderCreate-page/Styled'

export const FormStackSection = ({ children, ...props }) => {
  return (
    <FormSectionWrapper {...props}>
      <FormContentWrapper>
        <FormStack>
          {children}
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
