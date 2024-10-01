import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/ui/Navbar";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <Navbar />
    </div>
  ),
});
