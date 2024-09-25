import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterSliceStateType } from "../../global/globalTypes";

const Dashboard = () => {
  const { filter } = useSelector<FilterSliceStateType>((state) => state.filter);
  console.log("🚀 ~ Dashboard ~ filter:", filter);

  async function getAllUsers() {
    const users = await axios.get("/users");
    console.log("🚀 ~ getAllUsers ~ users:", users);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="bg-gray-50 py-10 rounded-lg"></div>
    </div>
  );
};

export default Dashboard;
