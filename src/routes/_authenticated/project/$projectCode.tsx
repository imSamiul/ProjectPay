import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetProjectDetails } from "../../../services/queries/projectQueries";

export const Route = createFileRoute("/_authenticated/project/$projectCode")({
  component: ProjectDetails,
});

function ProjectDetails() {
  const { projectCode } = useParams({
    from: "/_authenticated/project/$projectCode",
  });
  console.log(projectCode);

  const { data } = useGetProjectDetails(projectCode);
  // console.log(data.budget);

  return <div>Project Details</div>;
}
