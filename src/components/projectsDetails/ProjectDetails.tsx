import { ManagerType } from "../../types/managerType";
import { ProjectType } from "../../types/projectType";
import Button from "../ui/Button";
import { TiTick } from "react-icons/ti";
import { MdEditDocument } from "react-icons/md";

type ClientSectionKeys = keyof ProjectType;
type ProjectSectionKeys = keyof ProjectType;
type ManagerSectionKeys = keyof ManagerType;
const ClientSection: { name: string; value: ClientSectionKeys }[] = [
  {
    name: "Client Name",
    value: "client",
  },
  {
    name: "Client Email",
    value: "clientEmail",
  },
  {
    name: "Client Phone",
    value: "clientPhone",
  },
  {
    name: "Client Address",
    value: "clientAddress",
  },
  {
    name: "Client Details",
    value: "clientDetails",
  },
];

const ProjectSection: { name: string; value: ProjectSectionKeys }[] = [
  {
    name: "Project Code",
    value: "projectCode",
  },
  {
    name: "Budget",
    value: "budget",
  },
  {
    name: "Advance",
    value: "advance",
  },
  {
    name: "Due",
    value: "due",
  },
  {
    name: "Start Date",
    value: "startDate",
  },
  {
    name: "End Date",
    value: "endDate",
  },
  {
    name: "Demo Link",
    value: "demoLink",
  },
  {
    name: "Type of Web",
    value: "typeOfWeb",
  },
  {
    name: "Description",
    value: "description",
  },
];

const ProjectManager: { name: string; value: ManagerSectionKeys }[] = [
  {
    name: "Project Manager Name",
    value: "name",
  },
  {
    name: "Project Manager Email",
    value: "email",
  },
];

type ProjectDetailsPropsType = {
  details: ProjectType & ManagerType;
};

function ProjectDetails({ details }: ProjectDetailsPropsType) {
  return (
    <div className="mb-5">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-2xl font-bold md:text-3xl font-lexend mb-4">
          {details.name}
        </h1>
        <div className="flex gap-2 ">
          <Button>
            <MdEditDocument size={20} />
            Edit
          </Button>

          {details.status === true ? (
            <Button className="bg-martinique-900">
              <TiTick size={20} />
              Done
            </Button>
          ) : (
            <Button>
              <TiTick size={20} />
              Make Complete
            </Button>
          )}
        </div>
      </div>
      <div className="divider my-0"></div>
      <div className="dark:bg-martinique-200 card text-black shadow-xl border">
        <div className="card-body">
          <h3 className="text-lg md:text-xl font-semibold">Project Section</h3>
          <div className="divider  before:bg-martinique-300 after:bg-martinique-300 my-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-1">
            {ProjectSection.map((projectDetail) => {
              const value = details[projectDetail.value];
              return (
                <p key={projectDetail.value} className="text-base md:text-xl">
                  <span className="text-martinique-900 font-medium">
                    {projectDetail.name}:{" "}
                  </span>
                  {typeof value === "object" && value !== null
                    ? JSON.stringify(value)
                    : value}
                </p>
              );
            })}
          </div>

          <h3 className="text-lg md:text-xl font-semibold">Client Section</h3>
          <div className="divider  before:bg-martinique-300 after:bg-martinique-300 my-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-4">
            {ClientSection.map((clientDetail) => {
              const value = details[clientDetail.value];
              return (
                <p key={clientDetail.value} className="text-base md:text-xl">
                  <span className="text-martinique-900 font-medium">
                    {clientDetail.name}:{" "}
                  </span>
                  {typeof value === "object" && value !== null
                    ? JSON.stringify(value)
                    : value}
                </p>
              );
            })}
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Manager Section</h3>
          <div className="divider  before:bg-martinique-300 after:bg-martinique-300 my-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            {ProjectManager.map((managerDetail) => {
              const value = details.projectManager?.[managerDetail.value];
              return (
                <p key={managerDetail.value} className="text-base md:text-xl">
                  <span className="text-martinique-900 font-medium">
                    {managerDetail.name}:{" "}
                  </span>
                  {typeof value === "object" && value !== null
                    ? JSON.stringify(value)
                    : value}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
