import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { authErrorMessages } from '../utils/constants/auth';
import { postUserLoginToApi } from '../utils/api-utils';
import { setUserToStorage } from '../utils/user-utils';

export const useLogin = () => {
  const location = useLocation();
  const emailFromLocation = location.state?.email;

  const [confirmEmail, setConfirmEmail] = useState(false)
  const [email, setEmail] = useState(emailFromLocation || "");
  const [password, setPassword] = useState("");
  const [fa, setFa] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [faRequired, setFaRequired] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setIsError(true);
      setErrorMessage(authErrorMessages.email);
      return;
    } else if (!password) {
      setIsError(true);
      setErrorMessage(authErrorMessages.password);
      return;
    } else if (faRequired && !fa) {
      setIsError(true);
      setErrorMessage(authErrorMessages.fa);
      return;
    } else {
      setIsError(false);
    }

    const formData = faRequired ? JSON.stringify({ principal: email, password: password, totpCode: fa }) : JSON.stringify({ principal: email, password: password })

    postUserLoginToApi(formData).then(result => {
      setUserToStorage(result)
      window.location.reload()
    }).catch((error) => {
      if (error.response.status === 400) {
        setConfirmEmail(true)
      }
      if (error.response.data === "2FA required") {
        setFaRequired(true)
      }
      setErrorMessage(error.response.data);
      setIsError(true);
    })
  };

  const togglePasswordVisible = () => {
    setShowPassword(prev => prev === true ? false : true);
  };

  const passwordType = showPassword ? 'password' : 'text'

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleChangeFa = (e) => setFa(e.target.value)


  const changeHandlers = {
    email: handleChangeEmail,
    password: handleChangePassword,
    fa: handleChangeFa
  }

  const states = {
    fa,
    faRequired,
    confirmEmail,
    email,
    password,
    isError,
    errorMessage,
    showPassword,
    passwordType
  }

  return { states, changeHandlers, handleLogin, togglePasswordVisible, setConfirmEmail }
}
