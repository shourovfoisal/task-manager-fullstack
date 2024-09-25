import { createSlice } from "@reduxjs/toolkit";
import { FilterSliceStateType } from "../../global/globalTypes";

const initialState: FilterSliceStateType = {
  filter: {
    priority: null,
    dueDate: null,
    status: null,
  },
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setPriority: (state, action) => {
      state.filter.priority = action.payload;
    },
    setDueDate: (state, action) => {
      state.filter.dueDate = action.payload;
    },
    setStatus: (state, action) => {
      state.filter.status = action.payload;
    },
    setAll: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const getAllFilters = (state) => state.filter.filter;

export const { setPriority, setDueDate, setStatus, setAll } =
  filterSlice.actions;
export default filterSlice.reducer;
