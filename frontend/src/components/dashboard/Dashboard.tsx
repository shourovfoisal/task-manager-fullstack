import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FilterSliceStateType } from "../../global/globalTypes";
import {
  priorityLabelMapper,
  statusLabelMapper,
} from "../../staticData/staticData";
import AppTable from "../base/AppTable";

const columnHelper = createColumnHelper();

function TaskListColumnAction(cell, getAllTasks: () => void) {
  async function handleTaskDelete(taskId: number) {
    const response = await axios.delete(`/tasks/${taskId}`);
    if (response.status === 200) {
      getAllTasks();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        className="font-bold text-blue-600"
        to="/task-details"
        state={cell.row.original}
      >
        Edit
      </Link>
      <span
        className="font-bold text-red-600 cursor-pointer"
        onClick={() => {
          const taskId = cell.getValue();
          handleTaskDelete(taskId);
        }}
      >
        Delete
      </span>
    </div>
  );
}

const Dashboard = () => {
  const { filter } = useSelector<FilterSliceStateType>((state) => state.filter);

  const TaskListColumns = [
    columnHelper.accessor("title", {
      header: () => <span>Title</span>,
    }),
    columnHelper.accessor("description", {
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("dueDate", {
      header: () => <span>Due Date</span>,
    }),
    columnHelper.accessor("priority", {
      header: () => <span>Priority </span>,
      cell: (cell) => priorityLabelMapper[cell.getValue()],
    }),
    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
      cell: (cell) => statusLabelMapper[cell.getValue()],
    }),
    columnHelper.accessor("id", {
      header: () => <span>Action</span>,
      cell: (cell) => TaskListColumnAction(cell, getAllTasks),
    }),
  ];

  const [tableData, setTableData] = useState([]);

  async function getAllTasks() {
    const response = await axios.get("/tasks");
    const tasks = response.data;
    setTableData(tasks);
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="bg-gray-600 py-10 rounded-lg p-4">
      <h2 className="text-white text-lg font-medium title-font mb-5">
        List of Tasks
      </h2>

      <AppTable columns={TaskListColumns} data={tableData} />
    </div>
  );
};

export default Dashboard;
