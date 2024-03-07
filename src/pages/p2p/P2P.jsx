import React from "react";
import { Stack } from "@mui/material";
import { PageContent, Wrapper } from "../../components/p2p-page/Styled";
import { PageHeader } from "../../components/p2p-page/PageHeader";
import { ControlButtons } from "../../components/p2p-page/ControlButtons";
import { AddsSection } from "../../components/p2p-page/AddsSection";
import { useDeals } from "../../hooks/use-deals";
import { UserDeals } from "../../components/p2p-page/userDeals/UserDeals";
import { HelpButtons } from "../../components/p2p-page/HelpButtons";

export const P2P = () => {
    const { deals } = useDeals()

    return (
        <Wrapper>
            <PageContent>
                <Stack gap={2} width={'100%'}>
                    <Stack gap={2} mb={4} alignItems={'center'} width={'100%'}>
                        <PageHeader />
                        <ControlButtons />
                    </Stack>
                    <AddsSection />
                    <HelpButtons />
                    <UserDeals deals={deals} />
                </Stack>
            </PageContent>
        </Wrapper>
    )
}