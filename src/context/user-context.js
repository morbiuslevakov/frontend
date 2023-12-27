import React, { createContext, useState, useEffect } from "react";
import { Loader } from "../components/loader/Loader";

const UserContext = createContext({
  user: null,
  setUser: () => { },
  logout: () => { }
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {!isLoading ? children : <Loader />}
    </UserContext.Provider>
  );
};

export default UserContext;
