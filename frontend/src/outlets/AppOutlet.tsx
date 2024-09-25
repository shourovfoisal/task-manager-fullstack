import { Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { MainLayout } from "../layouts";

function AppOutlet() {
  const { userLoading } = useUserContext();

  return (
    <div>
      {userLoading ? (
        "User is loading"
      ) : (
        <MainLayout>
          <Outlet />
        </MainLayout>
      )}
    </div>
  );
}

export default AppOutlet;
