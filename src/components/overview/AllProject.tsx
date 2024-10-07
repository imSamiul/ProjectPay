import { useInView } from "react-intersection-observer";
import { ProjectType } from "../../types/projectType";
import { useEffect } from "react";

type AllProjectPropsType = {
  projects: ProjectType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

function AllProject({
  projects,
  hasNextPage,
  fetchNextPage,
}: AllProjectPropsType) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="grid grid-cols-3 gap-5">
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
              key={project.id}
              className={`${
                project.status === false ? "bg-[#fefae0]" : "bg-[#fefae0]/40"
              } min-h-60   p-5 shadow-md rounded-md`}
            >
              <div className="flex  justify-between text-xl mb-0">
                <h3 className="font-lexend font-bold text-black">
                  {project.name}
                </h3>
                <div
                  className={
                    project.status === true
                      ? "bg-[#283618] text-white py-1 px-2 rounded"
                      : ""
                  }
                >
                  {project.status === true ? "Done" : ""}
                </div>
              </div>

              <div className="divider mt-0"></div>
              <p className="text-lg text-black">
                <span className="font-bold text-[#bc6c25]">Client Name: </span>
                {project.client}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-[#bc6c25]">Client Phone: </span>
                {project.clientPhone}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-[#bc6c25]">Budget: </span>
                {project.budget}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-[#bc6c25]">Advance: </span>
                {project.advance}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-[#bc6c25]">Due: </span>
                {project.due}
              </p>
              <p className="text-lg text-black">
                <span className="font-bold text-[#bc6c25]">Deadline: </span>
                {project.endDate}
              </p>
            </div>
          );
        })}

      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}

export default AllProject;
