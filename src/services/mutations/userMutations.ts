// // Add other info
// export function useAddUserOtherInfo() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (userObj: AddOtherInfoFormType) => addUserOtherInfo(userObj),
//     onSuccess: (data) => {
//       toast.success('User info added successfully');
//       if (data.user.role === 'project_manager') {
//         navigate({ to: '/projectManager/managerOverview' });
//       }
//       // if (data.user.userType === "client") {
//       //   navigate({ to: "/client/clientOverview" });
//       // }
//       else {
//         navigate({ to: '/' });
//       }
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//     onSettled: async (data, error) => {
//       console.log(data, error);
//       await queryClient.invalidateQueries({ queryKey: ['userDetails'] });
//     },
//   });
// }

// logout user
// export function useLogOutUser() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: logOutUser,
//     onSuccess: () => {
//       removeRole();
//       queryClient.invalidateQueries({ queryKey: ["userDetails"] });
//       navigate({ to: "/" });
//     },
//   });
// }
