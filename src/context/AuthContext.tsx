import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/auth.types';
import { useAuthQueries } from '../services/queries/authQueries';
import { getLocalAccessToken, saveLocalAccessToken } from '../utils/auth';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string;
  isLoading: boolean;
  saveAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getUserQuery, refreshTokenQuery } = useAuthQueries();
  const { data: user, isLoading, error } = getUserQuery;
  const [accessToken, setAccessToken] = useState<string | null>(
    getLocalAccessToken(),
  );
  const { refetch } = refreshTokenQuery;
  const isAuthenticated = !!user;
  const contextValue = {
    user: user ? user : null,
    isAuthenticated,
    isLoading,
    error,
    accessToken: accessToken ? accessToken : '',
    saveAccessToken,
    clearAccessToken,
  };

  function saveAccessToken(accessToken: string) {
    setAccessToken(accessToken);
    saveLocalAccessToken(accessToken);
  }
  function clearAccessToken() {
    setAccessToken(null);
    saveLocalAccessToken('');
  }

  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);
  return (
    <AuthContext.Provider value={{ ...contextValue }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
