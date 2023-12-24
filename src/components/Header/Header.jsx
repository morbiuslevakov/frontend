import { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { HeaderWrapper } from './Styled'
import { HeaderLogo } from "./HeaderLogo";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderAccount } from "./HeaderAccount";
import UserContext from "../../context/user-context";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false)
    const { user } = useContext(UserContext);

    useEffect(() => {
        setIsLogged(!!user)
    }, [user])

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