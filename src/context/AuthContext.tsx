import { createContext, useContext, useEffect } from 'react';
import { User } from '../types/auth.types';
import { useAuthQueries } from '../services/queries/authQueries';
import { getAccessToken } from '../utils/auth';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;

  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getUserQuery, refreshTokenQuery } = useAuthQueries();
  const { data: user, isLoading, error } = getUserQuery;
  const { refetch } = refreshTokenQuery;
  const isAuthenticated = !!user;
  const contextValue = {
    user: user ? user : null,
    isAuthenticated,
    isLoading,
    error,
  };

  useEffect(() => {
    if (getAccessToken()) {
      refetch();
    }
  }, [refetch]);
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
