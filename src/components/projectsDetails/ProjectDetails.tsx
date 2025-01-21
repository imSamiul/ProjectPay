import { ProjectType } from '../../types/projectType';
import Button from '../ui/Button';
import { TiTick } from 'react-icons/ti';
import { MdEditDocument } from 'react-icons/md';
import { useUpdateProjectStatus } from '../../services/mutations/projectMutation';
import { Link } from '@tanstack/react-router';
import ProjectDeleteModal from '../modals/ProjectDeleteModal';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ProjectManager } from '../../types/userType';
import { FaUser } from 'react-icons/fa';

type ClientSectionKeys = keyof ProjectType;
type ProjectSectionKeys = keyof ProjectType;
type ManagerSectionKeys = keyof ProjectManager;
const ClientSection: { name: string; value: ClientSectionKeys }[] = [
  {
    name: 'Client Email',
    value: 'clientEmail',
  },
  {
    name: 'Client Phone',
    value: 'clientPhone',
  },
];

const ProjectSection: { name: string; value: ProjectSectionKeys }[] = [
  {
    name: 'Project Code',
    value: 'projectCode',
  },
  {
    name: 'Budget',
    value: 'budget',
  },
  {
    name: 'Advance',
    value: 'advance',
  },
  {
    name: 'Due',
    value: 'due',
  },
  {
    name: 'Total Paid',
    value: 'totalPaid',
  },
  {
    name: 'Start Date',
    value: 'startDate',
  },
  {
    name: 'End Date',
    value: 'endDate',
  },
  {
    name: 'Description',
    value: 'description',
  },
];

const ProjectManagerSection: { name: string; value: ManagerSectionKeys }[] = [
  {
    name: 'Project Manager Name',
    value: 'userName',
  },
  {
    name: 'Project Manager Email',
    value: 'email',
  },
];

type ProjectDetailsPropsType = {
  details: ProjectType & ProjectManager;
};

function ProjectDetails({ details }: ProjectDetailsPropsType) {
  const { mutate, isError, error, isPending } = useUpdateProjectStatus();

  function handleProjectStatus() {
    // complete
    const status = !details.status;

    mutate({ projectCode: details.projectCode!, status });
  }
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'There is an error');
    }
  }, [isError, error]);

  return (
    <div className="mb-5">
      <div className="flex flex-col md:flex-row md:justify-between items-center py-2 gap-3">
        <h1 className="text-2xl font-bold md:text-3xl font-lexend ">
          {details.name}
        </h1>
        <div className="flex  justify-center items-center gap-2 flex-wrap ">
          <Button
            className={`btn  ${details.status === true ? 'btn-success' : 'btn-outline btn-warning'}`}
            onClick={handleProjectStatus}
          >
            <TiTick size={20} />
            {isPending ? 'Updating...' : 'Completed'}
          </Button>

          <Link
            to="/project/edit/$projectCode"
            params={{
              projectCode: details.projectCode ? details.projectCode : '',
            }}
            className="btn btn-outline btn-primary btn-sm md:btn-md"
          >
            <MdEditDocument size={20} />
            Edit
          </Link>
          <ProjectDeleteModal
            modalId="projectDeleteModal"
            projectCode={details.projectCode!}
            projectId={details._id!}
            projectName={details.name}
          />
        </div>
      </div>
      <div className="divider m-0 mb-2"></div>
      <div className="bg-base-200 card  shadow-lg border">
        <div className="card-body">
          <h4 className="text-lg md:text-xl font-semibold">Project Section</h4>
          <div className="divider   my-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-1">
            {ProjectSection.map((projectDetail) => {
              const value = details[projectDetail.value];
              return (
                <p key={projectDetail.value} className=" md:text-lg">
                  <span className="text-secondary font-medium">
                    {projectDetail.name}:{' '}
                  </span>
                  {typeof value === 'object' && value !== null
                    ? JSON.stringify(value)
                    : value}
                </p>
              );
            })}
          </div>

          <h4 className="text-lg md:text-xl font-semibold">Client Section</h4>
          <div className="divider my-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-4">
            {ClientSection.map((clientDetail) => {
              const value = details[clientDetail.value];
              return (
                <p key={clientDetail.value} className="text-base md:text-lg">
                  <span className="text-secondary font-medium">
                    {clientDetail.name}:{' '}
                  </span>
                  {typeof value === 'object' && value !== null
                    ? JSON.stringify(value)
                    : value}
                </p>
              );
            })}
          </div>
          <h4 className="text-lg md:text-xl font-semibold">Manager Section</h4>
          <div className="divider  my-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-4">
            {ProjectManagerSection.map((managerDetail) => {
              const value = details.projectManager?.[managerDetail.value];
              return (
                <p key={managerDetail.value} className="text-base md:text-lg">
                  <span className="text-secondary font-medium">
                    {managerDetail.name}:{' '}
                  </span>
                  {typeof value === 'object' && value !== null
                    ? JSON.stringify(value)
                    : value}
                </p>
              );
            })}
          </div>
          <h4 className="text-lg md:text-xl font-semibold">Verified Clients</h4>
          <div className="divider  my-0"></div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
            {details.approvedClientList.map((client) => (
              <div
                className="join bg-base-300 p-2 cursor-pointer"
                key={client._id}
                onClick={() => {
                  const modal = document.getElementById(
                    'clientDetails',
                  ) as HTMLDialogElement;
                  modal.showModal();
                }}
              >
                <div className="avatar">
                  <div className="w-12 rounded-md">
                    {client.avatar ? (
                      <img src={client.avatar} alt="avatar" />
                    ) : (
                      <FaUser className="w-full h-full bg-base-300 p-1" />
                    )}
                  </div>
                </div>
                <div className="px-2">
                  <p className="font-semibold">{client.userName}</p>
                  <p className="text-xs">{client.email}</p>
                </div>
                <dialog
                  id="clientDetails"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg ">{client.userName}</h3>
                    <p className="py-4 ">{client.email}</p>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex gap-3">
                          <button className="btn btn-error">Close</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
