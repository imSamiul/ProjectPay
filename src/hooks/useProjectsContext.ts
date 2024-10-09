import { useContext } from "react";
import { ProjectContext } from "../context/projectContext";

export function useProjectsContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectsContext must be used within a ProjectProvider");
  }
  return context;
}
