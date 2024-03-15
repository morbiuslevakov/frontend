import React from 'react'
import { FormWrapper, PageContent, Wrapper } from '../../components/orderCreate-page/Styled'
import { P2PFormHeader } from '../../components/p2p-page/P2PFormHeader';
import { useP2PPage } from '../../hooks/use-p2p-page';
import { OptionsAndList } from '../../components/p2p-page/OptionsAndList';
import { P2PSteps } from '../../components/p2p-page/p2p-steps/P2PSteps';
import { useParams } from 'react-router-dom';
import { P2PDealSteps } from '../../components/p2p-page/p2p-steps/P2PDealSteps';

export const P2PBuy = () => {
  const { states, setState } = useP2PPage('SELL')
  const { dealId } = useParams();

  if (dealId) {
    return <Wrapper>
      <PageContent>
        <FormWrapper>
          <P2PFormHeader states={states} setState={setState} step={states.step} setStep={setState.step} setOrder={setState.order} />
          <P2PDealSteps states={states} setState={setState} dealId={dealId} />
        </FormWrapper>
      </PageContent>
    </Wrapper>
  }


  return (
    <Wrapper>
      <PageContent>
        <FormWrapper>
          <P2PFormHeader step={states.step} setStep={setState.step} setOrder={setState.order} />
          {!!states.selectedOrder ? <P2PSteps states={states} setState={setState} /> : <OptionsAndList states={states} setState={setState} />}
        </FormWrapper>
      </PageContent>
    </Wrapper>
  )
}
