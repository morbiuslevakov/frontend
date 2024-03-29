import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { InputLabel, Stack, Typography } from "@mui/material";
import { BackButton } from "../../components/back-button/BackButton";
import { WelcomeText } from "../../components/welcome-text/WelcomeText";
import { CardContent, CustomFormCard, CustomInput, FormWrapper, PageContent, Wrapper } from "../../components/auth-pages/Styled";
import { RedirectLink } from "../../components/auth-pages/RedirectLink";
import { SubmitFormButton } from "../../components/auth-pages/SubmitFormButton";
import { FormError } from "../../components/auth-pages/FormError";
import { PasswordAddornment } from "../../components/auth-pages/PasswordAddornment";
import { useLogin } from "../../hooks/use-login.hook";
import UserContext from "../../context/user-context";
import { ConfirmEmail } from "../../components/auth-pages/ConfirmEmail";

export const Login = () => {
    const { states, changeHandlers, handleLogin, togglePasswordVisible, setConfirmEmail } = useLogin()
    const { user } = useContext(UserContext)

    if (user) {
        return <Navigate to={'/p2p'} />
    }

    return (
        <Wrapper>
            <PageContent>
                <ConfirmEmail email={states.email} open={states.confirmEmail} onClose={setConfirmEmail} />
                <WelcomeText />
                <CustomFormCard>
                    <CardContent>
                        <Typography fontSize={32}>Войти в аккаунт</Typography>
                        <FormWrapper onSubmit={handleLogin}>
                            <FormError isError={states.isError} errorMessage={states.errorMessage} />
                            <Stack gap={1}>
                                <InputLabel>Почта или логин</InputLabel>
                                <CustomInput size="lg" type="text" value={states.email} onChange={changeHandlers.email} placeholder="Email or username" />
                            </Stack>
                            <Stack gap={1}>
                                <InputLabel>Пароль</InputLabel>
                                <CustomInput size="lg" type={states.passwordType} value={states.password} onChange={changeHandlers.password}
                                    placeholder="Введите пароль" endAdornment={<PasswordAddornment callback={togglePasswordVisible} isVisible={states.showPassword} />} />
                            </Stack>
                            {states.faRequired && <Stack gap={1}>
                                <InputLabel>2FA Код</InputLabel>
                                <CustomInput size="lg" type="text" value={states.fa} onChange={changeHandlers.fa} placeholder="Введите 2FA код" />
                            </Stack>}
                            <SubmitFormButton text="Войти" />
                        </FormWrapper>
                        <RedirectLink text="Нет аккаунта?" linkText="Создать аккаунт" link="/register" />
                    </CardContent>
                    <BackButton />
                </CustomFormCard>
            </PageContent>
        </Wrapper>
    )
}