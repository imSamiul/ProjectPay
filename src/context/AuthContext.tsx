import { createContext, useCallback, useContext, useEffect } from 'react';
import { LoginCredentials, SignupCredentials, User } from '../types/auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../api/auth.api';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../utils/auth';
import { toast } from 'react-toastify';
import { router } from '../App';

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // Query for user data
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getUser,
    retry: false,
    enabled: !!getAccessToken(),
    refetchOnWindowFocus: false,
  });
  if (isError) {
    if (error instanceof Error && error.message.includes('401')) {
      localStorage.removeItem('accessToken');
      queryClient.setQueryData(['user'], null);
    }
  }

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      toast.success('Login successful');
      console.log(data);
      setAccessToken(data.accessToken);
      await refetchUser();
      if (data.user.role === 'project_manager') {
        router.navigate({ to: '/projectManager/managerOverview' });
      } else {
        router.navigate({ to: '/' });
      }
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: async (data) => {
      toast.success('Signup successful');
      console.log(data);
      setAccessToken(data.accessToken);
      await refetchUser();
      if (data.user.role === 'project_manager') {
        router.navigate({ to: '/projectManager/managerOverview' });
      } else {
        router.navigate({ to: '/' });
      }
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      toast.success('Logout successful');
      clearAccessToken();
      queryClient.clear();
      router.navigate({ to: '/' });
    },
  });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await loginMutation.mutateAsync(credentials);
    },
    [loginMutation],
  );

  const signup = useCallback(
    async (credentials: SignupCredentials) => {
      await signupMutation.mutateAsync(credentials);
    },
    [signupMutation],
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  // Effect to handle token refresh

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { accessToken } = await authApi.refreshToken();
        setAccessToken(accessToken);
        await refetchUser();
      } catch (e) {
        clearAccessToken();
        queryClient.setQueryData(['user'], null);
      }
    };
    // set up periodic token refresh
    const intervalId = setInterval(
      () => {
        if (getAccessToken()) {
          refreshToken();
        }
      },
      1000 * 60 * 10,
    ); // 10 minutes

    // initial token refresh
    if (getAccessToken()) {
      console.log('initial token refresh');

      refreshToken();
    }
    return () => clearInterval(intervalId);
  }, [queryClient, refetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
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
