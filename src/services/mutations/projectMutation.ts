import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from '../../types/projectType';

import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { projectApi } from '../../api/project.api';

// Create a new project
export function useCreateNewProject() {
  const queryClient = useQueryClient();
  const negative = useNavigate();
  return useMutation({
    mutationFn: (projectObj: ProjectType) =>
      projectApi.createNewProject(projectObj),
    onSuccess: (data) => {
      negative({
        to: '/project/$projectCode',
        params: { projectCode: data.projectCode },
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
// Update project status
export function useUpdateProjectStatus() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updatedStatusObj: UpdateProjectStatusType) =>
      projectApi.updateProjectStatus(updatedStatusObj),
    onSuccess: () => {
      navigate({ to: '/projectManager/managerOverview' });
    },

    onSettled: async (data) => {
      const projectCode = data.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
    },
  });
}
// Update project details
export function useUpdateProjectDetails() {
  const queryClient = useQueryClient();
  const negative = useNavigate();
  return useMutation({
    mutationFn: (updatedProjectObj: UpdateProjectType) =>
      projectApi.updateProjectDetails(updatedProjectObj),
    onSuccess: (data) => {
      negative({
        to: '/project/$projectCode',
        params: { projectCode: data.projectCode },
      });
    },

    onSettled: async (data) => {
      const projectCode = data.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ['projectsDetails', projectCode],
      });
    },
  });
}
// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (projectId: string) =>
      projectApi.deleteProject(projectId),
    onSuccess: () => {
      navigate({ to: '/projectManager/managerOverview' });
    },

    onSettled: async (data) => {
      await queryClient.removeQueries({
        queryKey: ['projectDetails', data.projectCode],
      });
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Send project invitation
export function useSendProjectInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      clientId,
    }: {
      projectId: string;
      clientId: string;
    }) => projectApi.sendProjectInvitation(projectId, clientId),
    onSuccess: () => {
      toast.success('Project invitation sent successfully');
    },
    onError: () => {
      toast.error('Failed to send project invitation');
    },
    onSettled: async (data) => {
      const projectCode = data?.project.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
    },
  });
}

// Cancel project invitation
export function useCancelProjectInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      clientId,
    }: {
      projectId: string;
      clientId: string;
    }) => projectApi.cancelProjectInvitation(projectId, clientId),
    onSuccess: () => {
      toast.success('Invitation cancelled successfully');
    },
    onError: () => {
      toast.error('Failed to cancel invitation');
    },
    onSettled: async (data) => {
      const projectCode = data?.project.projectCode;
      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
    },
  });
}
// delete a client from a project
export function useDeleteClientFromProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      clientId,
    }: {
      projectId: string;
      clientId: string;
    }) => projectApi.deleteClientFromProject(projectId, clientId),
    onSuccess: () => {
      toast.success('Client deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete client');
    },
    onSettled: async (data) => {
      const projectCode = data?.project.projectCode;
      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
    },
  });
}
// accept project invitation
export function useAcceptProjectInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) =>
      projectApi.acceptProjectInvitation(projectId),
    onSuccess: () => {
      toast.success('Project invitation accepted successfully');
    },
    onError: () => {
      toast.error('Failed to accept project invitation');
    },
    onSettled: async (data) => {
      const projectCode = data?.project.projectCode;
      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
      await queryClient.invalidateQueries({
        queryKey: ['requestedProjects'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['clientProjects'],
      });
    },
  });
}
// reject project invitation

export function useRejectProjectInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) =>
      projectApi.rejectProjectInvitation(projectId),
    onSuccess: () => {
      toast.success('Project invitation rejected successfully');
    },
    onError: () => {
      toast.error('Failed to reject project invitation');
    },
    onSettled: async (data) => {
      const projectCode = data?.project.projectCode;
      await queryClient.invalidateQueries({
        queryKey: ['projectDetails', projectCode],
      });
      await queryClient.invalidateQueries({
        queryKey: ['requestedProjects'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['clientProjects'],
      });
    },
  });
}
