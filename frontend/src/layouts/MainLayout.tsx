import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

type Props = React.PropsWithChildren;

const MainLayout = ({ children }: Props) => {
  const { user } = useUserContext();

  return (
    <div className="bg-gray-200 h-screen">
      <div className="bg-blue-500 py-6 px-7">
        <div className="flex justify-between">
          <div className="space-x-5">
            {user && (
              <>
                <Link to="/dashboard" className="text-white">
                  Dashboard
                </Link>
                <Link to="/task-details" className="text-white">
                  Task Details
                </Link>
                <Link to="/settings" className="text-white">
                  Settings
                </Link>
              </>
            )}
          </div>
          <div className="space-x-5">
            {user === null && (
              <>
                <Link to="/signin" className="text-white">
                  SignIn
                </Link>
                <Link to="/signup" className="text-white">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
