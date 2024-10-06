import { AuthContext } from "../context/AuthContext";

export type RouterContext = {
  auth: AuthContext;
  queryClient: QueryClient;
};
