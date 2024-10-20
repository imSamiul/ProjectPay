import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectType, updateProjectStatusType } from "../../types/projectType";
import { createNewProject, updateProjectStatus } from "../projectApis";

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
    mutationFn: (updatedStatusObj: updateProjectStatusType) =>
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
