import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProjectType } from "../../types/projectType";
import { createNewProject } from "../projectApis";

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
