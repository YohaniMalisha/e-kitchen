import React, { createContext, useState, ReactNode } from "react";

// Type for Login context
interface LoginContextType {
  isLoggedIn: boolean;
  userName: string;
  login: (userName: string) => void;
  logout: () => void;
}

// Create the context
const LoginContext = createContext<LoginContextType | undefined>(undefined);

const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const login = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
