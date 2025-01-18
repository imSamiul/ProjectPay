import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api/auth.api';
import { toast } from 'react-toastify';
import { clearAccessToken, setAccessToken } from '../../utils/auth';
import { useNavigate } from '@tanstack/react-router';
import { router } from '../../App';
import { AddOtherInfoCredentials } from '../../types/auth.types';

export function useAuthMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      toast.success('Login successful');
      setAccessToken(data.accessToken);

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
    onSuccess: async (data) => {
      toast.success('Signup successful');
      setAccessToken(data.accessToken);

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

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      clearAccessToken();
      await queryClient.clear();
      router.navigate({ to: '/' });
      toast.success('Logout successful');
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  // Add other info mutation
  const addUserOtherInfo = useMutation({
    mutationFn: (credentials: AddOtherInfoCredentials) =>
      authApi.addOtherInfo(credentials),
    onSuccess: async (data) => {
      toast.success('User info added successfully');
      setAccessToken(data.accessToken);

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
