import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/projectManager/addProject",
)({
  component: AddProject,
});

import React, { useState } from "react";
import Button from "../../../components/ui/Button";

interface Project {
  name: string;
  budget: number | string;
  advance: number | string;
  due: number | string;
  client: string;
  clientPhone: string;
  clientEmail: string;

  startDate: string;
  endDate: string;

  description: string;
}

const InitialProject: Project = {
  name: "",
  budget: "",
  advance: "",
  due: "",
  client: "",
  clientPhone: "",
  clientEmail: "",
  description: "",

  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
};

function AddProject() {
  const [project, setProject] = useState<Project>(InitialProject);
  // const data = useLoaderData({ from: "/_authenticated" });
  // console.log(data);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  return (
    <form className="space-y-4 p-4 ">
      <div className="grid grid-cols-3 gap-5 ">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Project Name:</label>
          <input
            className="input input-bordered"
            type="text"
            name="name"
            value={project.name}
            placeholder="Project Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold ">Budget:</label>
          <input
            className="input input-bordered"
            type="number"
            name="budget"
            value={project.budget}
            placeholder="Project Total Budget"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Advance:</label>
          <input
            className="input input-bordered"
            type="number"
            name="advance"
            value={project.advance}
            placeholder="Advance Payment"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Client:</label>
          <input
            className="input input-bordered"
            type="text"
            name="client"
            value={project.client}
            placeholder="Client Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Client Phone:</label>
          <div className="flex items-center gap-2">
            <p>(+880)</p>
            <input
              className="input input-bordered w-full"
              type="tel"
              name="clientPhone"
              placeholder="Client Phone Number (eg. 17XXXXXXXX)"
              value={project.clientPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Client Email:</label>
          <input
            className="input input-bordered"
            type="email"
            name="clientEmail"
            placeholder="Client Email Address"
            value={project.clientEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Start Date:</label>
          <input
            className="input input-bordered"
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">End Date:</label>
          <input
            className="input input-bordered"
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-3">
          <label className="text-lg font-semibold">Description:</label>
          <textarea
            className="textarea textarea-bordered"
            name="description"
            placeholder="Project Description (eg. GitHub Repository URL)"
            value={project.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button classNames="w-full btn-success w-auto" title="Submit" />
    </form>
  );
}
