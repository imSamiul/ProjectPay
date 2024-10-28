import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/userApis";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const isLogged = context.auth.isLogged();

    if (isLogged) {
      const data = await fetchUserDetails();
      context.auth.setUserDetails(data.user);
      return data.user;
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
