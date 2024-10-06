import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProject } from "../apis";
import { ProjectType } from "../../types/projectType";

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
