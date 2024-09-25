import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TaskSliceStateType } from "../../global/globalTypes";

const initialState: TaskSliceStateType = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk("taskSlice/fetchTasks", async () => {
  try {
    const response = await axios.get("/tasks");
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const getAllTasksFromStore = (state) => state.task.tasks;

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
