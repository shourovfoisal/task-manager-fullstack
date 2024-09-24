import { Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

function AppOutlet() {
  const { userLoading } = useUserContext();

  return <div>{userLoading ? "User is loading" : <Outlet />}</div>;
}

export default AppOutlet;
