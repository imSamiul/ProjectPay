import { createFileRoute } from '@tanstack/react-router';
import { CiCalendar } from 'react-icons/ci';
import { MdOutlineShoppingBag } from 'react-icons/md';

import {
  useAcceptProjectInvitation,
  useRejectProjectInvitation,
} from '../../../services/mutations/projectMutation';
import {
  useGetClientProjects,
  useGetRequestedProjects,
} from '../../../services/queries/clientQueries';
import { ProjectType } from '../../../types/projectType';

export const Route = createFileRoute('/_authenticated/client/clientOverview')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: acceptInvitation } = useAcceptProjectInvitation();
  const { mutate: rejectInvitation } = useRejectProjectInvitation();
  const { data: clientProjects } = useGetClientProjects();
  const { data: requestedProjects } = useGetRequestedProjects();

  // accept invite
  const acceptInvite = (projectId: string | undefined) => {
    if (!projectId) return;
    acceptInvitation(projectId);
  };
  // decline invite
  const declineInvite = (projectId: string | undefined) => {
    if (!projectId) return;
    rejectInvitation(projectId);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="py-4 px-8 shadow-md border border-gray-200 rounded-lg flex items-center justify-between gap-2">
        <div>
          <p className=" text-gray-500 font-medium">Active Projects</p>
          <h1 className="text-2xl font-bold">
            {
              clientProjects?.projects.filter(
                (project: ProjectType) => project.status === false,
              ).length
            }
          </h1>
        </div>
        <MdOutlineShoppingBag className="text-4xl text-blue-500" />
      </div>
      {/* pending invites */}
      <div className="py-4 px-8 shadow-md border border-gray-200 rounded-lg flex items-center justify-between gap-2">
        <div>
          <p className=" text-gray-500 font-medium">Pending Invites</p>
          <h1 className="text-2xl font-bold">
            {requestedProjects?.projects.length}
          </h1>
        </div>
        <CiCalendar className="text-4xl text-red-500" />
      </div>
      {/* show active projects */}
      <div className="py-4 px-8 shadow-md border border-gray-200 rounded-lg ">
        <div>
          <p className=" text-gray-500 font-medium">Active Projects</p>
          {clientProjects?.projects
            .filter((project: ProjectType) => project.status === false)
            .map((project: ProjectType) => (
              <div
                key={project.projectCode}
                className="flex flex-col gap-2 bg-gray-200 py-2 px-4 rounded-lg my-4 "
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-gray-500 text-sm">
                      Budget: ${project.budget}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Paid: ${project.totalPaid}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      Due:{' '}
                      {project.due
                        ? new Date(project.due).toLocaleDateString()
                        : 'No due date'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {project.due
                        ? Math.ceil(
                            (new Date(project.due).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24),
                          )
                        : 0}{' '}
                      days remaining
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {!clientProjects?.projects.some(
            (project: ProjectType) => project.status === false,
          ) && <p className="text-gray-500 text-sm">No active projects</p>}
        </div>
      </div>
      {/* show pending invites */}
      <div className="py-4 px-8 shadow-md border border-gray-200 rounded-lg ">
        {requestedProjects?.projects.length > 0 ? (
          <div>
            <p className="  font-medium">Pending Invites</p>
            <p className="text-gray-500 text-sm">
              Project's you have been invited to
            </p>
            <div className="flex flex-col gap-2 bg-gray-100 py-2 px-4 rounded-lg my-4">
              {requestedProjects?.projects.map((invite: ProjectType) => (
                <div
                  key={invite.projectCode}
                  className="flex items-center justify-between w-full"
                >
                  <div>
                    <p className="font-medium">{invite.name}</p>
                    <p className="text-gray-500 text-sm">
                      {invite.projectCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => acceptInvite(invite._id)}
                      disabled={!invite._id}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => declineInvite(invite._id)}
                      disabled={!invite._id}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">You have no pending invites</p>
        )}
      </div>
    </div>
  );
}
