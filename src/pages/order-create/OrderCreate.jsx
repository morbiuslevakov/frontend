import React from 'react'
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { FormContentWrapper, FormWrapper, PageContent, Wrapper } from '../../components/orderCreate-page/Styled';
import { OrderSteps } from '../../components/orderCreate-page/OrderSteps';
import { useOrderCreate } from '../../hooks/use-order-create.hook';
import { stepsNames } from '../../utils/constants/order-create';

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
                    <FormContentWrapper>
                        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
                            <IconButton color="primary" size="small" onClick={handlers.prevStep} disabled={states.currentStep === 1}>
                                <NavigateBeforeIcon />
                            </IconButton>
                            <Typography>{stepsNames[states.currentStep - 1]}</Typography>
                            <Typography variant='gray'>{states.currentStep}/3</Typography>
                        </Stack>
                    </FormContentWrapper>
                    <OrderSteps
                        states={states}
                        handlers={handlers}
                        setState={setState}
                        errors={errors}
                    />
                </FormWrapper>
                <Box mt={2}>
                    <Button variant="contained" color="blue" fullWidth disabled={!states.isAvailableNext} onClick={handlers.nextStep}>
                        <Typography variant="secondary">{states.orderButtonName}</Typography>
                    </Button>
                </Box>
            </PageContent>
        </Wrapper>
    )
}