import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TaskFormType } from "../../global/formSchemas";
import { getAllFilters } from "../../redux/slices/filterSlice";
import { fetchTasks, getAllTasksFromStore } from "../../redux/slices/taskSlice";
import {
  priorityLabelMapper,
  statusLabelMapper,
} from "../../staticData/staticData";
import AppTable from "../base/AppTable";

const columnHelper = createColumnHelper();

function TaskListColumnAction(cell) {
  const dispatch = useDispatch();

  async function handleTaskDelete(taskId: number) {
    const response = await axios.delete(`/tasks/${taskId}`);
    if (response.status === 200) {
      dispatch(fetchTasks());
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
  const dispatch = useDispatch();
  const filter = useSelector(getAllFilters);
  const tasks = useSelector(getAllTasksFromStore);
  console.log("🚀 ~ Dashboard ~ tasks:", tasks);

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
      cell: (cell) => TaskListColumnAction(cell),
    }),
  ];

  const [tableData, setTableData] = useState<TaskFormType[]>([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  useEffect(() => {
    if (tasks?.length > 0) {
      let filteredTasks: TaskFormType[] = tasks;

      // Filtering based on the global preferences
      if (filter?.dueDate) {
        filteredTasks = filteredTasks?.filter(
          (eachTask) => eachTask?.dueDate === filter?.dueDate
        );
      }
      if (filter?.priority) {
        filteredTasks = filteredTasks?.filter(
          (eachTask) => eachTask?.priority === filter?.priority
        );
      }
      if (filter?.status) {
        filteredTasks = filteredTasks?.filter(
          (eachTask) => eachTask?.status === filter?.status
        );
      }
      setTableData(filteredTasks);
    }
  }, [tasks]);

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
