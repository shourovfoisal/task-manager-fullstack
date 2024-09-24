import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./auth";
import { Dashboard } from "./components/dashboard";
import { Fallback } from "./components/fallback";
import { AppOutlet, AuthOutlet } from "./outlets";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppOutlet />,
      children: [
        {
          path: "/",
          element: <AuthOutlet />,
          children: [{ path: "/dashboard", element: <Dashboard /> }],
        },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
};
