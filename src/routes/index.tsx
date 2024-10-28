import { createFileRoute, redirect } from "@tanstack/react-router";
import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/userApis";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const saved = context.auth.isTokenSaved();

    if (saved) {
      const data = await fetchUserDetails();
      context.auth.setUserDetails(data.user);
      if (data.user.userType === "project manager") {
        return redirect({
          to: "/projectManager/managerOverview",
        });
      }
    }
  },
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
