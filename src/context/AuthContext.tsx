import { createContext, useCallback, useContext, useEffect } from 'react';
import {
  AddOtherInfoCredentials,
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  User,
} from '../types/auth.types';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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
  login: () => UseMutationResult<AuthResponse, Error, LoginCredentials>;
  signup: () => UseMutationResult<AuthResponse, Error, SignupCredentials>;
  logout: () => UseMutationResult<void, Error, void>;
  addOtherInfo: () => UseMutationResult<
    AuthResponse,
    Error,
    AddOtherInfoCredentials
  >;
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
    },
    onSettled: () => {
      queryClient.setQueryData(['user'], null);
      router.navigate({ to: '/' });
    },
  });

  const addUserOtherInfo = useMutation({
    mutationFn: (credentials: AddOtherInfoCredentials) =>
      authApi.addOtherInfo(credentials),
    onSuccess: async (data) => {
      toast.success('User info added successfully');
      setAccessToken(data.accessToken);
      await refetchUser();
      if (data.user.role === 'project_manager') {
        router.navigate({ to: '/projectManager/managerOverview' });
      } else {
        router.navigate({ to: '/' });
      }
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const login = useCallback(() => loginMutation, [loginMutation]);
  const signup = useCallback(() => signupMutation, [signupMutation]);
  const logout = useCallback(() => logoutMutation, [logoutMutation]);
  const addOtherInfo = useCallback(() => addUserOtherInfo, [addUserOtherInfo]);

  // Effect to handle token refresh

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { accessToken } = await authApi.refreshToken();
        setAccessToken(accessToken);
        await refetchUser();
      } catch (error) {
        clearAccessToken();
        console.log('Error refreshing token', error);

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
        addOtherInfo,
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
