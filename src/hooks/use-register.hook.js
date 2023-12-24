import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { inputValidator } from '../utils/auth-utils';
import { postUserToApi } from '../utils/api-utils';
import { authErrorMessages } from '../utils/constants/auth';

export const useRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();
    if (3 <= username.length <= 20) {
      setIsError(true);
      setErrorMessage(authErrorMessages.username);
      return;
    }
    if (!inputValidator("email", email)) {
      setIsError(true);
      setErrorMessage(authErrorMessages.email);
      return;
    } else if (!inputValidator("password", password)) {
      setIsError(true);
      setErrorMessage(authErrorMessages.password);
      return;
    } else {
      setIsError(false);
    }

    const formData = JSON.stringify({ username: username, email: email, password: password })

    postUserToApi(formData).then(() => navigate("/login", { state: { email: formData.email } })).catch(error => {
      setErrorMessage(error);
      setIsError(true);
    })
  };

  const togglePasswordVisible = () => {
    setShowPassword(prev => prev === true ? false : true);
  };

  const passwordType = showPassword ? 'password' : 'text'

  const handleChangeUsername = (e) => setUsername(e.target.value)
  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)

  const changeHandlers = {
    username: handleChangeUsername,
    email: handleChangeEmail,
    password: handleChangePassword
  }

  const states = {
    username,
    email,
    password,
    isError,
    errorMessage,
    showPassword,
    passwordType
  }

  return { states, changeHandlers, handleRegister, togglePasswordVisible }
}
