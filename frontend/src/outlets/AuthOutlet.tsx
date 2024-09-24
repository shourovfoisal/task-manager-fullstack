import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const AuthOutlet = () => {
  const { user } = useUserContext();

  return user !== null ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthOutlet;
