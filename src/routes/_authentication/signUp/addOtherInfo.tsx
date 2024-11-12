import { createFileRoute } from "@tanstack/react-router";
import InputField from "../../../components/ui/InputField";
import { useAddOtherInfo } from "../../../hooks/useAddOtherInfoForm";
import ErrorComponent from "../../../components/ErrorComponent";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";

import CustomErrorComponent from "../../../components/CustomErrorComponent";
import { getTemporaryToken } from "../../../utils/auth";

export const Route = createFileRoute("/_authentication/signUp/addOtherInfo")({
  loader: () => {
    console.log(getTemporaryToken());

    if (!getTemporaryToken()) {
      console.log("You are not authorized to access this page");

      throw new Error("You are not authorized to access this page");
    }
  },
  component: AddOtherInfo,
  errorComponent: CustomErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function AddOtherInfo() {
  const {
    formValues,
    formError,
    handleFormValues,
    isAddUserOtherInfoError,
    addUserOtherInfoError,
    isAddUserOtherInfoPending,
    isAddUserOtherInfoSuccess,
    resetAddUserOtherInfo,
    onSubmitHandler,
  } = useAddOtherInfo();
  useEffect(() => {
    if (isAddUserOtherInfoSuccess) {
      toast.success("User created successfully");
    }
    if (isAddUserOtherInfoError) {
      toast.error(addUserOtherInfoError?.message || "An error occurred");
    }
  }, [
    isAddUserOtherInfoSuccess,
    isAddUserOtherInfoError,
    addUserOtherInfoError,
  ]);
  if (isAddUserOtherInfoError) {
    return (
      <ErrorComponent
        errorMessage={
          addUserOtherInfoError
            ? addUserOtherInfoError.message
            : "An error occurred"
        }
        onRetry={resetAddUserOtherInfo}
      />
    );
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col pt-5 justify-center items-center">
        <h1 className="font-lexend text-3xl font-medium ">
          One more step to go...
        </h1>
        <form
          className="my-10  w-full md:w-3/4  lg:w-1/2 "
          onSubmit={onSubmitHandler}
        >
          <div className="flex items-center gap-2">
            <p className="mt-10">(+880)</p>
            <InputField
              label="Phone"
              type="text"
              placeholder="Your phone number"
              value={formValues.phone ?? ""}
              name="phone"
              minLength={10}
              maxLength={10}
              onChange={handleFormValues}
              className="w-full"
            />
          </div>
          <div className="form-control w-full ">
            <label className="label md:text-lg font-medium">
              Manger or Client?
            </label>
            <select
              className="select select-bordered"
              value={formValues.role}
              name="role"
              onChange={handleFormValues}
            >
              <option>Choose...</option>
              <option>project_manager</option>
              <option>client</option>
            </select>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row gap-5 items-center">
            <Button
              className=" btn-primary"
              disabled={isAddUserOtherInfoPending}
            >
              {isAddUserOtherInfoPending ? "Creating...." : "SignUp"}
            </Button>
            {formError && (
              <p className="text-red-500 w-56 text-center">{formError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
