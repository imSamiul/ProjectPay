import { createFileRoute } from "@tanstack/react-router";
import CustomDatePicker from "../../../../components/ui/CustomDatePicker";
import { useGetProjectDetails } from "../../../../services/queries/projectQueries";
import { useEffect, useState } from "react";
import { ProjectType } from "../../../../types/projectType";
import InputField from "../../../../components/ui/InputField";

export const Route = createFileRoute(
  "/_authenticated/project/edit/$projectCode",
)({
  component: EditProject,
});

const INITIAL_VALUES = {
  name: "",
  budget: 0,
  advance: 0,
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  clientDetails: "",
  clientPhone: "",
  demoLink: "",
  endDate: "",
  typeOfWeb: "",
  description: "",
  startDate: "",
  status: false,
};

function EditProject() {
  const { projectCode } = Route.useParams();

  const { data, isLoading, isError, error } = useGetProjectDetails(projectCode);

  const [editProjectValues, setEditProjectValues] =
    useState<ProjectType>(INITIAL_VALUES);

  useEffect(() => {
    if (data) {
      setEditProjectValues((prevValues) => ({
        ...prevValues,
        ...data,
      }));
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setEditProjectValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setEditProjectValues((prev) => ({
        ...prev,
        endDate: date.toISOString().split("T")[0],
      }));
    }
  };

  return (
    <div className="container mx-auto  p-4">
      <h1 className="font-lexend text-xl md:text-3xl font-medium">
        Edit Project: {editProjectValues?.name} ({projectCode})
      </h1>
      <div className="divider my-2"></div>
      <form className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 mb-3">
          <InputField
            label="Project Name: "
            placeholder="Project Name (required)"
            value={editProjectValues.name}
            onChange={handleInputChange}
            name="name"
            type="text"
          />
          <InputField
            label="Budget:"
            placeholder="Total Budget (required)"
            value={editProjectValues.budget}
            onChange={handleInputChange}
            name="budget"
            type="number"
          />
          <InputField
            label="Advance:"
            placeholder="Total Advance (required)"
            value={editProjectValues.advance}
            onChange={handleInputChange}
            name="advance"
            type="number"
          />

          <InputField
            label="Client Name:"
            placeholder="Client Name (required)"
            value={editProjectValues.clientName}
            onChange={handleInputChange}
            name="clientName"
            type="text"
          />
          <InputField
            label="Client Phone:"
            placeholder="Client Phone Number (eg. 017XXXXXXXX) (required)"
            value={editProjectValues.clientPhone}
            onChange={handleInputChange}
            name="clientPhone"
            type=""
          />

          <InputField
            label="Client Email:"
            placeholder="Client Email (required)"
            value={editProjectValues.clientEmail}
            onChange={handleInputChange}
            name="clientEmail"
            type="email"
          />

          <InputField
            label="Client Address:"
            placeholder="Client Address"
            value={editProjectValues.clientAddress}
            onChange={handleInputChange}
            name="clientAddress"
            type="text"
          />

          <InputField
            label="Client Details:"
            placeholder="Client Details"
            value={editProjectValues.clientDetails}
            onChange={handleInputChange}
            name="clientDetails"
            type="text"
          />

          <InputField
            label="Demo Link:"
            placeholder="Demo Link"
            value={editProjectValues.demoLink}
            onChange={handleInputChange}
            name="demoLink"
            type="text"
          />

          <CustomDatePicker
            label="End Date:"
            selectedDate={new Date(editProjectValues.endDate)}
            onSelectDate={handleDateChange}
          />
          <InputField
            label="Type of web:"
            placeholder="Type of Web (eg. E-commerce)"
            value={editProjectValues.typeOfWeb}
            onChange={handleInputChange}
            name="typeOfWeb"
            type="text"
          />

          <div className="form-control md:col-span-3">
            <label className="label md:text-lg font-medium ">
              Description:
            </label>
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered"
              value={editProjectValues.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditProject;
