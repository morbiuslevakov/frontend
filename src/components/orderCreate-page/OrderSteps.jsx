import React from 'react'
import { FirstStep } from './FirstStep'
import { SecondStep } from './SecondStep'
import { ThirdStep } from './ThirdStep'

export const OrderSteps = ({ states, handlers, setState, errors }) => {
  if (states.currentStep === 1) {
    return <FirstStep states={states}
      handlers={handlers}
      setState={setState}
      errors={errors}
    />
  }

  if (states.currentStep === 2) {
    return <SecondStep states={states} setState={setState} />
  }

  if (states.currentStep === 3) {
    return <ThirdStep states={states} />
  }

  return <></>
}
