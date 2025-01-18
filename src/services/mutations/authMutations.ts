/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api/auth.api';
import { toast } from 'react-toastify';

import { useNavigate } from '@tanstack/react-router';
import { router } from '../../App';
import { AddOtherInfoCredentials } from '../../types/auth.types';
import { useAuth } from '../../context/AuthContext';

export function useAuthMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      toast.success('Login successful');
      auth.saveAccessToken(data.accessToken);

      if (data.user.role === 'project_manager') {
        navigate({ to: '/projectManager/managerOverview' });
      } else {
        navigate({ to: '/' });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      toast.success('Signup successful');
      auth.saveAccessToken(data.accessToken);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      auth.clearAccessToken();
      toast.success('Logout successful');
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.clear();
    },
  });
  // Add other info mutation
  const addUserOtherInfo = useMutation({
    mutationFn: (credentials: AddOtherInfoCredentials) =>
      authApi.addOtherInfo(credentials),
    onSuccess: async (data) => {
      toast.success('User info added successfully');
      // auth.saveAccessToken(data.accessToken);

      if (data.user.role === 'project_manager') {
        router.navigate({ to: '/projectManager/managerOverview' });
      } else {
        router.navigate({ to: '/' });
      }
    },
    onError: (error) => {
      console.log('error', error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return { loginMutation, signupMutation, logoutMutation, addUserOtherInfo };
}
