import React from "react";
import { useGetProjectOverview } from "../../services/projectQueries";
import { ProjectType } from "../../types/projectType";

function AllProject() {
  const { data } = useGetProjectOverview();
  console.log(data);

  return (
    <div className="grid grid-cols-3 gap-5">
      {data
        ?.sort((a: ProjectType, b: ProjectType) => {
          if (a.status === "Active" && b.status === "Done") {
            return -1;
          } else if (a.status === "Done" && b.status === "Active") {
            return 1;
          } else {
            return 0;
          }
        })
        .map((project: ProjectType) => {
          return (
            <div
              className={`${
                project.status === "Active" ? "bg-[#fefae0]" : "bg-[#fefae0]/40"
              } min-h-60   p-5 shadow-md rounded-md`}
            >
              <div className="flex  justify-between text-xl mb-0">
                <h3 className="font-lexend font-bold text-black">
                  {project.name}
                </h3>
                <div
                  className={
                    project.status === "Done"
                      ? "bg-[#283618] text-white py-1 px-2 rounded"
                      : ""
                  }
                >
                  {project.status === "Done" ? "Done" : ""}
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
    </div>
  );
}

export default AllProject;
