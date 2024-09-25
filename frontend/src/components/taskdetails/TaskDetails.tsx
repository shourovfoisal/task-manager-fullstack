import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { taskFormSchema, TaskFormType } from "../../global/formSchemas";
import { priorityDropdown, statusDropdown } from "../../staticData/staticData";
import { Button } from "../base";
import {
  AppDateInput,
  AppInput,
  AppSelect,
} from "../base/reactHookFormComponents";

const TaskDetails = () => {
  const navigate = useNavigate();
  const { state: taskForUpdate } = useLocation();

  const { control, handleSubmit } = useForm({
    mode: "all",
    resolver: yupResolver(taskFormSchema),
    defaultValues: {
      title: taskForUpdate?.title ?? "",
      description: taskForUpdate?.description ?? "",
      dueDate: taskForUpdate?.dueDate ?? "",
      priority: taskForUpdate?.priority ?? ("" as const),
      status: taskForUpdate?.status ?? ("" as const),
    },
  });

  async function createTask(data: TaskFormType) {
    const response = await axios.post("/tasks", data);
    if (response.status === 201) {
      navigate("/dashboard");
    }
  }

  async function updateTask(data: TaskFormType) {
    const response = await axios.put(`/tasks/${taskForUpdate?.id}`, data);
    if (response.status === 200) {
      navigate("/dashboard");
    }
  }

  function onSubmit(formData: TaskFormType) {
    if (taskForUpdate) {
      updateTask(formData);
    } else {
      createTask(formData);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            {taskForUpdate ? "Update" : "Create"} Task
          </h2>
          <AppInput
            control={control}
            label="Title"
            name="title"
            placeholder="Enter title"
          />
          <AppInput
            control={control}
            label="Description"
            name="description"
            placeholder="Enter description"
          />
          <AppDateInput control={control} label="Due Date" name="dueDate" />
          <AppSelect
            control={control}
            label="Priority"
            name="priority"
            options={priorityDropdown}
          />
          <AppSelect
            control={control}
            label="Status"
            name="status"
            options={statusDropdown}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
