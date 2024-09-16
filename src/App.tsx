import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import OverView from "./pages/OverView";

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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
