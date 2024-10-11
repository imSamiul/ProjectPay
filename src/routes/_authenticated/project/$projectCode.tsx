import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetProjectDetails } from "../../../services/queries/projectQueries";
import ProjectDetails from "../../../components/projectsDetails/ProjectDetails";

export const Route = createFileRoute("/_authenticated/project/$projectCode")({
  component: Project,
});

function Project() {
  const { projectCode } = useParams({
    from: "/_authenticated/project/$projectCode",
  });
  console.log(projectCode);

  const { data, isLoading, isError, error } = useGetProjectDetails(projectCode);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <ProjectDetails details={data} />
    </div>
  );
}
