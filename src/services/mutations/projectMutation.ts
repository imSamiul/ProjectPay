import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from '../../types/projectType';

import { useNavigate } from '@tanstack/react-router';
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
