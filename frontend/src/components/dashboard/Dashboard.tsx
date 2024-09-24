import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {
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
