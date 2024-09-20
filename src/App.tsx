import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import OverView from "./pages/OverView/OverView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddClient from "./pages/AddClient/AddClient";
import ClientList from "./pages/ClientList/ClientList";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Authentication from "./pages/Authentication/Authentication";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000, // 1 second
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/authentication",
    element: <Authentication />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/add-clients",
        element: <AddClient />,
      },
      {
        path: "/client-list",
        element: <ClientList />,
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
