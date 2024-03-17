import { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Container, HeaderWrapper } from './Styled'
import { HeaderLogo } from "./HeaderLogo";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderAccount } from "./HeaderAccount";
import UserContext from "../../context/user-context";
import { MobileMenu } from "./MobileMenu";
import { useMediaQueryHook } from "../../hooks/use-media-query.hook";

export default function Header() {
    const isMobile = useMediaQueryHook('sm')
    const [isLogged, setIsLogged] = useState(false)
    const { user } = useContext(UserContext);

    useEffect(() => {
        setIsLogged(!!user)
    }, [user])

    return (
        <HeaderWrapper>
            <Container>
                <Stack flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
                    <Stack flexDirection={'row'} gap={10}>
                        <HeaderLogo />
                        {!isMobile && <HeaderMenu isLogged={isLogged} />}
                    </Stack>
                    {!isMobile && <HeaderAccount isLogged={isLogged} user={user} />}
                    {isMobile && <MobileMenu />}
                </Stack>
            </Container>
        </HeaderWrapper>
    );
}