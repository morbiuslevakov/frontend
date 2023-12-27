import React, { useContext } from "react";
import { Stack } from "@mui/material";
import UserContext from "../../context/user-context";
import { ProfileInfo } from "../../components/profile-page/ProfileInfo";
import { PageContent, Wrapper } from "../../components/profile-page/Styled";
import { PrimaryInfo } from "../../components/profile-page/PrimaryInfo";
import { Statistics } from "../../components/profile-page/Statistics";
import { Security } from "../../components/profile-page/Security";

export const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <Wrapper>
            <PageContent>
                <Stack mt={10} gap={7}>
                    <ProfileInfo user={user} />
                    <Stack gap={4}>
                        <PrimaryInfo user={user} />
                        <Statistics />
                        <Security />
                    </Stack>
                </Stack>
            </PageContent>
        </Wrapper>
    )
}