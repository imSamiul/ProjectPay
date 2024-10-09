import React, { useState } from "react";
import { ProjectType } from "../types/projectType";

export type ProjectContext = {
  projects: ProjectType[];
  setProjectsHandler: (projects: ProjectType[]) => void;
};

export const ProjectContext = React.createContext<ProjectContext | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function setProjectsHandler(projects: ProjectType[]) {
    setProjects(projects);
  }

  return (
    <ProjectContext.Provider value={{ projects, setProjectsHandler }}>
      {children}
    </ProjectContext.Provider>
  );
}
