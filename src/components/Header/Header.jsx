import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import isLoggedIn from "../../utils/isLoggedIn";
import { logout } from "../../actions/auth";
import { HeaderWrapper } from './Styled'
import { HeaderLogo } from "./HeaderLogo";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderAccount } from "./HeaderAccount";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const isUserInStorage = isLoggedIn(logout)
        setIsLogged(isUserInStorage)
    }, [])

    return (
        <HeaderWrapper>
            <Stack flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
                <Stack flexDirection={'row'} gap={10}>
                    <HeaderLogo />
                    <HeaderMenu isLogged={isLogged} />
                </Stack>
                <HeaderAccount isLogged={isLogged} />
            </Stack>
        </HeaderWrapper>
    );
}