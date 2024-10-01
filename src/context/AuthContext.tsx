import * as React from "react";
import { setAuthToken } from "../utils/auth";

export type AuthContext = {
  login: (token: string) => void;
};

export const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  function login(token: string) {
    setAuthToken(token);
    // setUser(username);
  }

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
