import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from "../../types/projectType";
import {
  apiUpdateProjectDetails,
  createNewProject,
  updateProjectStatus,
} from "../projectApis";
import { useNavigate } from "@tanstack/react-router";

export function useCreateNewProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectObj: ProjectType) => createNewProject(projectObj),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProjectStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedStatusObj: UpdateProjectStatusType) =>
      updateProjectStatus(updatedStatusObj),

    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ["projects", projectCode],
      });
    },
  });
}

export function useUpdateProjectDetails() {
  const queryClient = useQueryClient();
  const negative = useNavigate();
  return useMutation({
    mutationFn: (updatedProjectObj: UpdateProjectType) =>
      apiUpdateProjectDetails(updatedProjectObj),
    onSuccess: (data) => {
      negative({
        to: "/project/$projectCode",
        params: { projectCode: data.projectCode },
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data) => {
      const projectCode = data.projectCode;

      await queryClient.invalidateQueries({
        queryKey: ["projects", projectCode],
      });
    },
  });
}
