import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from '../../types/projectType';
import {
  apiUpdateProjectDetails,
  deleteProject,
  updateProjectStatus,
} from '../../api/project.api';
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
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
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
      updateProjectStatus(updatedStatusObj),
    onSuccess: () => {
      navigate({ to: '/projectManager/managerOverview' });
    },

    onError: (error) => {
      console.log(error);
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
      apiUpdateProjectDetails(updatedProjectObj),
    onSuccess: (data) => {
      negative({
        to: '/project/$projectCode',
        params: { projectCode: data.projectCode },
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ['projects', projectCode],
      });
    },
  });
}
// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      navigate({ to: '/projectManager/managerOverview' });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      await queryClient.removeQueries({
        queryKey: ['projectDetails', data.projectCode],
      });
    },
  });
}
