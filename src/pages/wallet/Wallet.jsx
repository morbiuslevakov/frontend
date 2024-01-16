import React from "react";
import { Navigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { PageContent, Wrapper } from "../../components/wallet-page/Styled";
import { UserSection } from "../../components/wallet-page/UserSection";
import { useWallet } from "../../hooks/use-wallet.hook";
import { TokensTable } from "../../components/wallet-page/TokensTable";

export const Wallet = () => {
    const { user, tokensRows, walletInfo } = useWallet()

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    return (
        <Wrapper>
            <PageContent>
                <Stack mt={10} gap={7}>
                    <UserSection user={user} walletInfo={walletInfo} />
                    <TokensTable tokensRows={tokensRows} walletInfo={walletInfo} />
                </Stack>
            </PageContent>
        </Wrapper>
    )
}