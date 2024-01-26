import React from 'react'
import { FirstStep } from './FirstStep'
import { SecondStep } from './SecondStep'
import { ThirdStep } from './ThirdStep'
import { CommentStep } from './CommentStep'

export const OrderSteps = ({ states, setState, errors }) => {
  switch (states.currentStep) {
    case 1:
      return <FirstStep states={states} setState={setState} errors={errors} />;

    case 2:
      return <SecondStep states={states} setState={setState} />;

    case 3:
      return <CommentStep states={states} setState={setState} />;

    case 4:
      return <ThirdStep states={states} setState={setState} />;

    default:
      return <></>;
  }
}
