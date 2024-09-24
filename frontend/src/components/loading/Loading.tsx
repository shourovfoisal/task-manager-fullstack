import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

function Loading() {
  const navigate = useNavigate();
  const { userLoading } = useUserContext();

  useEffect(() => {
    if (!userLoading) {
      navigate("/dashboard");
    }
  }, [userLoading, navigate]);

  return <div>Loading</div>;
}

export default Loading;
