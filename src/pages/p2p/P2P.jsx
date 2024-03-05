import React from "react";
import { Stack } from "@mui/material";
import { PageContent, Wrapper } from "../../components/p2p-page/Styled";
import { PageHeader } from "../../components/p2p-page/PageHeader";
import { ControlButtons } from "../../components/p2p-page/ControlButtons";
import { AddsSection } from "../../components/p2p-page/AddsSection";

export const P2P = () => {
    return (
        <Wrapper>
            <PageContent>
                <Stack gap={2} mb={4}>
                    <PageHeader />
                    <ControlButtons />
                </Stack>
                <AddsSection />
            </PageContent>
        </Wrapper>
    )
}