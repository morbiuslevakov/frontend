import React from 'react'
import { FormContentWrapper, FormSectionClickWrapper, FormStack } from '../orderCreate-page/Styled'

export const FormStackClickSection = ({ children, handleClick }) => {
  return (
    <FormSectionClickWrapper onClick={handleClick}>
      <FormContentWrapper>
        <FormStack>
          {children}
        </FormStack>
      </FormContentWrapper>
    </FormSectionClickWrapper>
  )
}
