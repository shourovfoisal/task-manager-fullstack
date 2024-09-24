import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const AuthOutlet = () => {
  const { user } = useUserContext();

  return user !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthOutlet;
