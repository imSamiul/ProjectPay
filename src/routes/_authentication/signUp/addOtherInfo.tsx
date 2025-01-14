import { createFileRoute } from '@tanstack/react-router';
import InputField from '../../../components/ui/InputField';

import ErrorComponent from '../../../components/ErrorComponent';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

import CustomErrorComponent from '../../../components/CustomErrorComponent';
import { AddOtherInfoFormType } from '../../../types/userType';
import { useAddUserOtherInfo } from '../../../services/mutations/userMutations';
import phone from 'phone';

type SearchType = {
  temporaryToken: string;
};
const initialValues: AddOtherInfoFormType = {
  phone: '',
  role: '',
  temporaryToken: '',
};

export const Route = createFileRoute('/_authentication/signUp/addOtherInfo')({
  validateSearch: (search: Record<string, unknown>): SearchType => {
    return {
      temporaryToken: search.token as string,
    };
  },
  component: AddOtherInfo,
  errorComponent: CustomErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function AddOtherInfo() {
  return <div>AddOtherInfo</div>;
}

export default AddOtherInfo;

// function AddOtherInfo() {
//   const { temporaryToken } = Route.useSearch();

//   const [formValues, setFormValues] = useState<AddOtherInfoFormType>({
//     ...initialValues,
//     temporaryToken,
//   });
//   const [formError, setFormError] = useState<string | null>(null);

//   const {
//     mutate: addUserOtherInfo,
//     isError: isAddUserOtherInfoError,
//     error: addUserOtherInfoError,
//     isSuccess: isAddUserOtherInfoSuccess,
//     isPending: isAddUserOtherInfoPending,
//     reset: resetAddUserOtherInfo,
//   } = useAddUserOtherInfo();

//   // Handle form changes
//   const handleFormValues = (
//     event:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setFormError(null);
//     console.log(event.target.name, event.target.value);

//     setFormValues({
//       ...formValues,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const validateForm = (): boolean => {
//     if (formValues.phone === "") {
//       setFormError("Please fill all the fields");
//       return false;
//     }

//     const phoneNum = "+880" + formValues.phone;
//     const isValidPhone = phone(phoneNum);

//     if (!isValidPhone.isValid) {
//       setFormError("Phone no must be valid");
//       return false;
//     }
//     if (formValues.phone?.length !== 10) {
//       setFormError("Phone no must be 10 digit");
//       return false;
//     }

//     if (
//       formValues.role?.toLowerCase() !== "client" &&
//       formValues.role?.toLowerCase() !== "project_manager"
//     ) {
//       setFormError("User type must be either client or project manager");
//       return false;
//     }

//     return true;
//   };
//   // Handle form submission
//   const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setFormError(null);

//     if (!validateForm()) {
//       return;
//     }
//     addUserOtherInfo({
//       ...formValues,
//       phone: "+880" + formValues.phone,
//       temporaryToken,
//     });
//     setFormValues(initialValues);
//   };

//   useEffect(() => {
//     if (isAddUserOtherInfoSuccess) {
//       toast.success("User created successfully");
//     }
//     if (isAddUserOtherInfoError) {
//       toast.error(addUserOtherInfoError?.message || "An error occurred");
//     }
//   }, [
//     isAddUserOtherInfoSuccess,
//     isAddUserOtherInfoError,
//     addUserOtherInfoError,
//   ]);

//   if (isAddUserOtherInfoError) {
//     return (
//       <ErrorComponent
//         errorMessage={
//           addUserOtherInfoError
//             ? addUserOtherInfoError.message
//             : "An error occurred"
//         }
//         onRetry={resetAddUserOtherInfo}
//       />
//     );
//   }
//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col pt-5 justify-center items-center">
//         <h1 className="font-lexend text-3xl font-medium ">
//           One more step to go...
//         </h1>
//         <form
//           className="my-10  w-full md:w-3/4  lg:w-1/2 "
//           onSubmit={onSubmitHandler}
//         >
//           <div className="flex items-center gap-2">
//             <p className="mt-10">(+880)</p>
//             <InputField
//               label="Phone"
//               type="text"
//               placeholder="Your phone number"
//               value={formValues.phone ?? ""}
//               name="phone"
//               minLength={10}
//               maxLength={10}
//               onChange={handleFormValues}
//               className="w-full"
//             />
//           </div>
//           <div className="form-control w-full ">
//             <label className="label md:text-lg font-medium">
//               Manger or Client?
//             </label>
//             <select
//               className="select select-bordered"
//               value={formValues.role}
//               name="role"
//               onChange={handleFormValues}
//             >
//               <option>Choose...</option>
//               <option>project_manager</option>
//               <option>client</option>
//             </select>
//           </div>
//           <div className=" mt-5 flex flex-col md:flex-row gap-5 items-center">
//             <Button
//               className=" btn-primary"
//               disabled={isAddUserOtherInfoPending}
//             >
//               {isAddUserOtherInfoPending ? "Creating...." : "SignUp"}
//             </Button>
//             {formError && (
//               <p className="text-red-500 w-56 text-center">{formError}</p>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
