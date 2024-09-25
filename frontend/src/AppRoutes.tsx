import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signin, Signup } from "./components/auth";
import { Dashboard } from "./components/dashboard";
import { Fallback } from "./components/fallback";
import { Settings } from "./components/settings";
import { TaskDetails } from "./components/taskdetails";
import { AppOutlet, AuthOutlet } from "./outlets";

// TODO - have to do lazy imports
export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppOutlet />,
      children: [
        {
          path: "/",
          element: <AuthOutlet />,
          children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/task-details", element: <TaskDetails /> },
            { path: "/settings", element: <Settings /> },
          ],
        },
        { path: "/signin", element: <Signin /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
};
