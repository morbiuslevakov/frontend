import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { authErrorMessages } from '../utils/constants/auth';
import { postUserLoginToApi } from '../utils/api-utils';
import { setUserToStorage } from '../utils/user-utils';

export const useLogin = () => {
  const location = useLocation();
  const emailFromLocation = location.state?.email;

  const [email, setEmail] = useState(emailFromLocation || "");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

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
    } else {
      setIsError(false);
    }

    const formData = JSON.stringify({ principal: email, password: password })

    postUserLoginToApi(formData).then(result => {
      setUserToStorage(result)
      window.location.reload()
    }).catch((error) => {
      setErrorMessage(error);
      setIsError(true);
    })
  };

  const togglePasswordVisible = () => {
    setShowPassword(prev => prev === true ? false : true);
  };

  const passwordType = showPassword ? 'password' : 'text'

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)

  const changeHandlers = {
    email: handleChangeEmail,
    password: handleChangePassword
  }

  const states = {
    email,
    password,
    isError,
    errorMessage,
    showPassword,
    passwordType
  }

  return { states, changeHandlers, handleLogin, togglePasswordVisible }
}
