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

  return <div>Dashboard</div>;
};

export default Dashboard;
