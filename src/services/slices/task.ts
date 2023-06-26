import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";

import { AppDispatch, AppThunk } from "../store";
import { TData } from "../../components/Task/Task";
import { getTasks } from "../../utils/api";

interface tasksState {
  tasks: Array<TData>;
  isError: boolean;
}

const initialState: tasksState = {
  tasks: [],
  isError: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Array<TData>>) {
      state.tasks = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { setTasks, setError } = taskSlice.actions;

export const getTask: AppThunk = () => (dispatch: AppDispatch) => {
  getTasks()
    .then((res) => {
      //  getBlacklist()
      //  .then(resBlack=>{
      //      const res = resWhite.concat(resBlack);
      dispatch(setTasks(res));
      //  })
      //  .catch((err) => {
      //      console.log(err);
      //   });
    })
    .catch((err) => {
      console.log(err);
    });
};
