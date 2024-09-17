import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import OverView from "./pages/OverView/OverView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    path: "/payments",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <OverView />,
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
