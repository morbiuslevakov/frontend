import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { ReactComponent as P2PLogo } from '../../images/p2p-logo.svg'
import { PageContent, TradeCard, Wrapper } from "../../components/trade-page/Styled";

export const Trade = () => {
    const navigate = useNavigate();

    const handleP2P = () => {
        navigate('/p2p')
    }

    return (
        <Wrapper>
            <PageContent>
                <TradeCard onClick={handleP2P}>
                    <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
                        <Box width={'30%'}>
                            <P2PLogo />
                        </Box>
                        <Stack gap={1} width={'70%'}>
                            <Typography fontSize={28} fontWeight={600}>P2P Маркет</Typography>
                            <Typography variant="lightGray"> Простой и безопасный обмен валюты: переведите свои фиатные средства в криптовалюту в несколько кликов!
                                Мы создали пространство для безопасного обмена вашей фиатной валюты на цифровые активы.
                                Доверьтесь нам - мы объединяем удобство, надёжность и скорость для вашего уверенного шага в мир криптофинансов.</Typography>
                        </Stack>
                    </Stack>
                </TradeCard>
            </PageContent>
        </Wrapper>
    )
}