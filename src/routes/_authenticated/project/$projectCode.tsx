import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetProjectDetails } from "../../../services/queries/projectQueries";
import ProjectDetails from "../../../components/projectsDetails/ProjectDetails";
import PaymentList from "../../../components/projectsDetails/PaymentList";

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
    <div className="container mx-auto p-4 ">
      <ProjectDetails details={data} />
      <PaymentList />
    </div>
  );
}
