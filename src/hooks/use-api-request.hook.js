import { useContext, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user-context';
// import { refreshAccessToken } from '../utils/api-utils';

export const useApiRequest = () => {
  // const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // const updateAccessToken = useCallback(async () => {
  //   try {
  //     const res = await refreshAccessToken(user.refreshToken);
  //     setUser({ ...user, accessToken: res.accessToken });
  //     localStorage.setItem('user', JSON.stringify({ ...user, accessToken: res.accessToken }));
  //     return res.accessToken;
  //   } catch (error) {
  //     localStorage.removeItem('user');
  //     navigate('/login');
  //     window.location.reload();
  //   }
  // }, [user, setUser, navigate]);

  const apiRequest = useCallback(async (requestFunction, ...params) => {
    try {
      return await requestFunction(user.accessToken, ...params);
    } catch (error) {
      console.log(error.status)
      console.log(error.response.status)
      // if (error.response && error.response.status === 444) {
      //   const newToken = await updateAccessToken();
      //   return requestFunction(newToken, ...params);
      // } else {
      //   throw error.response.data;
      // }
    }
  }, [user]);

  return apiRequest;
};