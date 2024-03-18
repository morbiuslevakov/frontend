import React from 'react'
import { CircularProgress, Stack } from "@mui/material";
import { FormWrapper, PageContent, Wrapper } from '../../components/orderCreate-page/Styled';
import { OrderSteps } from '../../components/orderCreate-page/OrderSteps';
import { useOrderCreate } from '../../hooks/use-order-create.hook';
import { OrderHeader } from '../../components/orderCreate-page/OrderHeader';
import { OrderFooter } from '../../components/orderCreate-page/OrderFooter';

export const OrderCreate = () => {
    const { isLoading, states, setState, errors, handlers } = useOrderCreate()

    if (!isLoading) {
        return <Stack alignItems={'center'} pt={10}>
            <CircularProgress />
        </Stack>
    }

    return (
        <Wrapper>
            <PageContent>
                <FormWrapper>
                    <OrderHeader states={states} handlePrevious={handlers.prevStep} />
                    <OrderSteps states={states} setState={setState} errors={errors} />
                    <OrderFooter states={states} handleNext={handlers.nextStep} />
                </FormWrapper>
            </PageContent>
        </Wrapper>
    )
}