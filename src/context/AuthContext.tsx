import * as React from "react";
import { UserType } from "../types/userType";
import { getAuthToken, setAuthToken } from "../utils/auth";
import { useFetchUserDetails } from "../services/queries/userQueries";

export type AuthContext = {
  login: (token: string, user: UserType) => void;
  isTokenSaved: () => boolean;

  user: UserType | null;
  setUserDetails: (user: UserType) => void;
};

export const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType>({} as UserType);
  const { data, isPending } = useFetchUserDetails();

  React.useEffect(() => {
    if (data?.user !== null && data?.user !== undefined) {
      console.log("called");

      setUser(data.user);
    }
  }, [data]);

  function login(token: string, user: UserType) {
    setAuthToken(token);
    setUser(user);
  }

  function isTokenSaved() {
    const token = getAuthToken();
    if (token) {
      return true;
    }
    return false;
  }

  function setUserDetails(user: UserType) {
    setUser(user);
  }
  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserDetails,
        login,
        isTokenSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
