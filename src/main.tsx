import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { StrictMode } from "react";
import { ProjectProvider } from "./context/projectContext.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <AuthProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </AuthProvider>
    </StrictMode>
  </>,
);
