import { createFileRoute } from "@tanstack/react-router";
import CustomDatePicker from "../../../../components/ui/CustomDatePicker";

export const Route = createFileRoute(
  "/_authenticated/project/edit/$projectCode",
)({
  component: EditProject,
});

function EditProject() {
  return (
    <div className="container mx-auto  p-4">
      <h1 className="font-lexend text-xl md:text-3xl font-medium">
        Edit Project:
      </h1>
      <div className="divider my-2"></div>
      <form className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 mb-3">
          <div className="form-control">
            <label className="label md:text-lg font-medium">
              Project Name:
            </label>
            <input
              type="text"
              placeholder="Project Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label md:text-lg font-medium ">Budget:</label>
            <input
              type="text"
              placeholder="Budget"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label md:text-lg font-medium ">Advance:</label>
            <input
              type="text"
              placeholder="Advance"
              className="input input-bordered"
            />
          </div>

          <div className="form-control ">
            <label className="label md:text-lg font-medium ">
              Client Name:
            </label>
            <input
              type="text"
              placeholder="Client Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control ">
            <label className="label md:text-lg font-medium ">
              Client Email:
            </label>
            <input
              type="text"
              placeholder="Client Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control ">
            <label className="label md:text-lg font-medium ">
              Client Address:
            </label>
            <input
              type="text"
              placeholder="Client Address"
              className="input input-bordered"
            />
          </div>
          <div className="form-control ">
            <label className="label md:text-lg font-medium ">
              Client Details:
            </label>
            <input
              type="text"
              placeholder="Client Details"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label md:text-lg font-medium ">
              Client Phone:
            </label>
            <input
              type="text"
              placeholder="Client Phone"
              className="input input-bordered"
            />
          </div>
          <div className="form-control ">
            <label className="label md:text-lg font-medium ">Demo Link:</label>
            <input
              type="text"
              placeholder="Demo Link"
              className="input input-bordered"
            />
          </div>

          <CustomDatePicker label="End Date:" selectedDate={new Date()} />
          <div className="form-control">
            <label className="label md:text-lg font-medium ">
              Type of web:
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="typeOfWeb"
              placeholder="Type of Web (eg. E-commerce)"
            />
          </div>
          <div className="form-control md:col-span-3">
            <label className="label md:text-lg font-medium ">
              Description:
            </label>
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered"
            ></textarea>
          </div>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditProject;
