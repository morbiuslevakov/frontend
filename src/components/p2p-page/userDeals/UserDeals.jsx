import React from 'react'
import { Deal } from './Deal'
import { DealsContainer, DealsWrapper, LineDivider } from './Styled'
import { FormSectionWrapper, FormWrapper } from '../../orderCreate-page/Styled'
import { Stack, Typography } from '@mui/material'

export const UserDeals = ({ deals }) => {
  return (
    <DealsWrapper>
      <FormWrapper>
        <FormSectionWrapper>
          <DealsContainer>
            <Typography variant="blue">Мои сделки</Typography>
          </DealsContainer>
          <LineDivider />
          <Stack>
            {deals?.length === 0 && <FormSectionWrapper>
              <DealsContainer>
                <Typography variant='gray'>Здесь появятся ваши сделки</Typography>
              </DealsContainer>
            </FormSectionWrapper>}
            {deals?.map((deal, index) => (
              <React.Fragment key={deal.dealId}>
                <Deal deal={deal} />
                {index !== deals?.length - 1 && <LineDivider />}
              </React.Fragment>
            ))}
          </Stack>
        </FormSectionWrapper>
      </FormWrapper>
    </DealsWrapper>
  )
}
