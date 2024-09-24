import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signin, Signup } from "./components/auth";
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
        { path: "/signin", element: <Signin /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
};
