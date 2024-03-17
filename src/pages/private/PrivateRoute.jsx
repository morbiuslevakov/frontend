import React, { useContext } from 'react'
import UserContext from '../../context/user-context';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/login" />;
};