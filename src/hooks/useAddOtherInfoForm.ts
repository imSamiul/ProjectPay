import { useState } from "react";
import { AddOtherInfoFormType } from "../types/userType";
import { phone } from "phone";
import { useAddUserOtherInfo } from "../services/mutations/userMutations";

const initialValues: AddOtherInfoFormType = {
  phone: "",
  role: "",
};

export function useAddOtherInfo() {
  const [formValues, setFormValues] =
    useState<AddOtherInfoFormType>(initialValues);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    mutate: addUserOtherInfo,
    isError: isAddUserOtherInfoError,
    error: addUserOtherInfoError,
    isSuccess: isAddUserOtherInfoSuccess,
    isPending: isAddUserOtherInfoPending,
    reset: resetAddUserOtherInfo,
  } = useAddUserOtherInfo();

  // Handle form changes
  const handleFormValues = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormError(null);
    console.log(event.target.name, event.target.value);

    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (formValues.phone === "") {
      setFormError("Please fill all the fields");
      return false;
    }

    const phoneNum = "+880" + formValues.phone;
    const isValidPhone = phone(phoneNum);

    if (!isValidPhone.isValid) {
      setFormError("Phone no must be valid");
      return false;
    }
    if (formValues.phone?.length !== 10) {
      setFormError("Phone no must be 10 digit");
      return false;
    }

    if (
      formValues.role?.toLowerCase() !== "client" &&
      formValues.role?.toLowerCase() !== "project_manager"
    ) {
      setFormError("User type must be either client or project manager");
      return false;
    }

    return true;
  };
  // Handle form submission
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }
    addUserOtherInfo({ ...formValues, phone: "+880" + formValues.phone });
    setFormValues(initialValues);
  };
  return {
    formValues,
    formError,
    handleFormValues,
    isAddUserOtherInfoError,
    addUserOtherInfoError,
    isAddUserOtherInfoPending,
    isAddUserOtherInfoSuccess,
    resetAddUserOtherInfo,
    onSubmitHandler,
  };
}
