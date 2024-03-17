import React, { useContext } from "react";
import { Stack } from "@mui/material";
import UserContext from "../../context/user-context";
import { ProfileInfo } from "../../components/profile-page/ProfileInfo";
import { PageContent, Wrapper } from "../../components/profile-page/Styled";
import { PrimaryInfo } from "../../components/profile-page/PrimaryInfo";
import { Security } from "../../components/profile-page/Security";
import { useP2P } from "../../hooks/use-p2p.hook";
import { Notifications } from "../../components/profile-page/Notifications";


export const Profile = () => {
    const { user } = useContext(UserContext);
    const { userDetails } = useP2P()

    return (
        <Wrapper>
            <PageContent>
                <Stack my={5} gap={7}>
                    <ProfileInfo user={user} userDetails={userDetails} />
                    <Stack gap={4}>
                        <PrimaryInfo user={user} userDetails={userDetails} />
                        <Security />
                        <Notifications />
                    </Stack>
                </Stack>
            </PageContent>
        </Wrapper>
    )
}