import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";

import { AppDispatch, AppThunk } from "../store";
import { getTasksApi } from "../../utils/api";
import { TTask } from "../../types";

interface tasksState {
  tasks: Array<TTask>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: tasksState = {
  tasks: [],
  isError: false,
  isLoading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Array<TTask>>) {
      state.tasks = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setTasks, setError, setLoading } = taskSlice.actions;

export const getTask: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getTasksApi()
    .then((res) => {
      dispatch(setTasks(res));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
