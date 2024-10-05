import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/projectManager/addProject",
)({
  component: AddProject,
});

import Button from "../../../components/ui/Button";

import { useProjectForm } from "../../../hooks/useAddProjectForm";

function AddProject() {
  const { project, error, handleInputChange, onSubmitHandler } =
    useProjectForm();

  // const data = useLoaderData({ from: "/_authenticated" });
  // console.log(data);

  return (
    <div className="p-4">
      <h1 className="font-lexend text-3xl font-medium">Add Your Project</h1>
      <div className="divider "></div>
      <form className="space-y-4 py-2" onSubmit={onSubmitHandler}>
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
        <div className="text-red-500">{error}</div>
        <Button className=" btn-success w-auto" title="Submit" />
      </form>
    </div>
  );
}
