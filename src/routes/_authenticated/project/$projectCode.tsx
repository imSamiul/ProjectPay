import { createFileRoute } from '@tanstack/react-router';
import ErrorComponent from '../../../components/ErrorComponent';
import Loader from '../../../components/Loader';
import PaymentList from '../../../components/projectsDetails/PaymentList';
import ProjectDetails from '../../../components/projectsDetails/ProjectDetails';
import VerifiedClientTable from '../../../components/table/VerifiedClientTable';
import { useGetProjectDetails } from '../../../services/queries/projectQueries';

export const Route = createFileRoute('/_authenticated/project/$projectCode')({
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
    <div className="py-4 ">
      <ProjectDetails details={data} />
      <PaymentList
        projectName={data.name}
        due={data.due}
        projectId={data._id}
        paymentList={data.paymentList}
      />
      <VerifiedClientTable
        approvedClients={data.approvedClientList}
        pendingClientList={data.pendingClientList}
      />
    </div>
  );
}
