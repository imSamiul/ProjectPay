import * as React from "react";
import { setAuthToken } from "../utils/auth";
import Cookies from "js-cookie";

export type AuthContext = {
  login: (token: string) => void;
  isLogged: () => boolean;
  getAuthToken: () => string | null;
};

export const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  function login(token: string) {
    setAuthToken(token);
    // setUser(username);
  }
  function getAuthToken() {
    const token = Cookies.get("token");
    if (!token) {
      console.log("No token found");
      return null;
    }
    return token;
  }
  function isLogged() {
    const token = getAuthToken();
    if (token) {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ login, isLogged, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
