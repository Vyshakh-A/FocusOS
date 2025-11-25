//AuthContext.jsx

import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("authUser")) || null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);
  
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
