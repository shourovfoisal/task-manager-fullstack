import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import taskReducer from "./slices/taskSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    task: taskReducer,
  },
});
