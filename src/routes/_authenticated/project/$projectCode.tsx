import { createFileRoute } from "@tanstack/react-router";
import { useGetProjectDetails } from "../../../services/queries/projectQueries";
import ProjectDetails from "../../../components/projectsDetails/ProjectDetails";
import PaymentList from "../../../components/projectsDetails/PaymentList";
import Loader from "../../../components/Loader";
import ErrorComponent from "../../../components/ErrorComponent";

export const Route = createFileRoute("/_authenticated/project/$projectCode")({
  component: Project,
});

function Project() {
  const { projectCode } = Route.useParams();

  const { data, isLoading, isError, error, refetch } =
    useGetProjectDetails(projectCode);

  if (isLoading) {
    return <Loader className="h-screen" />;
  }
  if (isError) {
    return <ErrorComponent errorMessage={error?.message} onRetry={refetch} />;
  }

  return (
    <div className="container mx-auto p-4 ">
      <ProjectDetails details={data} />
      <PaymentList
        projectName={data.name}
        due={data.due}
        projectId={data._id}
        paymentList={data.paymentList}
      />
    </div>
  );
}
