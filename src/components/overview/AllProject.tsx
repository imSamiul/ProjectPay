import { useInView } from "react-intersection-observer";
import { ProjectType } from "../../types/projectType";
import { useEffect } from "react";

type AllProjectPropsType = {
  projects: ProjectType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isSearching: boolean;
};

// true => Done
// false => Not Done

function AllProject({
  projects,
  hasNextPage,
  fetchNextPage,
  isSearching,
}: AllProjectPropsType) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  console.log(hasNextPage);

  if (projects.length === 0) {
    return <div>No Projects Found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-notoSans">
      {projects
        ?.sort((a: ProjectType, b: ProjectType) => {
          if (a.status === false && b.status === true) {
            return -1;
          } else if (a.status === true && b.status === false) {
            return 1;
          } else {
            return 0;
          }
        })
        .map((project: ProjectType) => {
          return (
            <div
              key={project._id}
              className={`${
                project.status === false
                  ? "bg-martinique-50"
                  : "bg-martinique-200"
              } min-h-60   p-5 shadow-md rounded-md`}
            >
              <div className="flex  justify-between text-lg md:text-xl mb-0">
                <h3 className="font-lexend font-bold text-black ">
                  {project.name}
                </h3>
                <div
                  className={
                    project.status === true
                      ? "bg-martinique-700 text-white py-1 px-2 rounded"
                      : ""
                  }
                >
                  {project.status === true ? "Done" : ""}
                </div>
              </div>

              <div className="divider my-0"></div>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">
                  Project ID:{" "}
                </span>
                {project.projectId}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">
                  Client Name:{" "}
                </span>
                {project.client}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">
                  Client Phone:{" "}
                </span>
                {project.clientPhone}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">Budget: </span>
                {project.budget}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">Advance: </span>
                {project.advance}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">Due: </span>
                {project.due}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-martinique-950">
                  Deadline:{" "}
                </span>
                {project.endDate}
              </p>
            </div>
          );
        })}

      {hasNextPage && !isSearching && <div ref={ref}>Loading...</div>}
    </div>
  );
}

export default AllProject;
