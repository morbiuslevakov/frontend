import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { InputLabel, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BackButton } from "../../components/back-button/BackButton";
import { WelcomeText } from "../../components/welcome-text/WelcomeText";
import { CardContent, CustomFormCard, CustomInput, FormWrapper, PageContent, Wrapper } from "../../components/auth-pages/Styled";
import { RedirectLink } from "../../components/auth-pages/RedirectLink";
import { SubmitFormButton } from "../../components/auth-pages/SubmitFormButton";
import { FormError } from "../../components/auth-pages/FormError";
import { PasswordAddornment } from "../../components/auth-pages/PasswordAddornment";
import { useRegister } from "../../hooks/use-register.hook";
import UserContext from "../../context/user-context";

export const Register = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const { states, changeHandlers, handleRegister, togglePasswordVisible } = useRegister()
    const { user } = useContext(UserContext)

    if (user) {
        return <Navigate to={'/trade'} />
    }

    return (
        <Wrapper>
            <PageContent>
                {!matches && <WelcomeText />}
                <CustomFormCard>
                    <CardContent>
                        <Typography fontSize={32}>Создать аккаунт</Typography>
                        <FormWrapper onSubmit={handleRegister}>
                            <FormError isError={states.isError} errorMessage={states.errorMessage} />
                            <Stack gap={1}>
                                <InputLabel>Имя пользователя</InputLabel>
                                <CustomInput type="text" value={states.username} onChange={changeHandlers.username} placeholder="Придумайте имя пользователя" />
                            </Stack>
                            <Stack gap={1}>
                                <InputLabel>Email</InputLabel>
                                <CustomInput size="lg" type="email" value={states.email} onChange={changeHandlers.email} placeholder="Введите email" />
                            </Stack>
                            <Stack gap={1}>
                                <InputLabel>Пароль</InputLabel>
                                <CustomInput size="lg" type={states.passwordType} value={states.password} onChange={changeHandlers.password}
                                    placeholder="Введите пароль" endAdornment={<PasswordAddornment callback={togglePasswordVisible} isVisible={states.showPassword} />} />
                            </Stack>
                            <SubmitFormButton text="Создать аккаунт" />
                        </FormWrapper>
                        <RedirectLink text="Уже заргестрированы?" linkText="Войти" link="/login" />
                    </CardContent>
                    <BackButton />
                </CustomFormCard>
            </PageContent>
        </Wrapper>
    );
};