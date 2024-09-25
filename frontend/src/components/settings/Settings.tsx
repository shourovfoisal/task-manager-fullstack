import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { settingsFormSchema, SettingsFormType } from "../../global/formSchemas";
import { FilterSliceStateType } from "../../global/globalTypes";
import { setAll } from "../../redux/slices/filterSlice";
import { priorityDropdown, statusDropdown } from "../../staticData/staticData";
import { Button } from "../base";
import { AppDateInput, AppSelect } from "../base/reactHookFormComponents";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filter } = useSelector<FilterSliceStateType>((state) => state.filter);
  console.log("🚀 ~ Settings ~ filter:", filter);

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: "all",
    resolver: yupResolver(settingsFormSchema),
    defaultValues: {
      dueDate: "",
      priority: "" as const,
      status: "" as const,
    },
  });

  function onSubmit(formData: SettingsFormType) {
    dispatch(setAll(formData));
    navigate("/dashboard");
  }

  useEffect(() => {
    setValue("dueDate", filter?.dueDate);
    setValue("priority", filter?.priority);
    setValue("status", filter?.status);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5 flex items-center justify-between">
            User Filter Preferences
            <span
              className="text-red-600 cursor-pointer text-base"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </span>
          </h2>
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

export default Settings;
