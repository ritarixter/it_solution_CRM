import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, AppThunk } from "../store";
import {
  addTaskUserApi,
  deleteTaskUserApi,
  getTaskByDateApi,
  getTasksUserApi,
  updateTaskUserApi,
} from "../../utils/api";
import { TTask } from "../../types";
import { TUpdateTask } from "../../types/TTask";

interface tasksState {
  tasks: Array<TTask>;
  tasksByDay: Array<TTask>;
  selectedDay: Date;
  isError: boolean;
  isLoadingTask: boolean;
}

const initialState: tasksState = {
  tasks: [],                // все таски
  tasksByDay: [],           // стор для выбранной даты
  selectedDay: new Date(),  // выбранная дата
  isError: false,
  isLoadingTask: true,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Array<TTask>>) {
      state.tasks = action.payload;
    },

    setTask(state, action: PayloadAction<Array<TTask>>) {
      state.tasksByDay = action.payload;
    },

    setSelectedDay(state, action: PayloadAction<Date>) {
      state.selectedDay = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingTask = action.payload;
    },
  },
});

export const { setTasks, setTask, setSelectedDay, setError, setLoading } = taskSlice.actions;
export const getTask: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  getTasksUserApi()
    .then((res) => {
      dispatch(setTasks(res));
    })
    .catch((err) => {
      dispatch(setError(true));
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getTaskByDate: AppThunk =
  (date: Date) => (dispatch: AppDispatch) => {
    dispatch(setSelectedDay(date))
    dispatch(setLoading(true));
    getTaskByDateApi(date)
      .then((res) => {
        dispatch(setTask(res));
      })
      .catch((err) => {
        dispatch(setError(true));
        // dispatch(getTask()); 

        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const deleteTask: AppThunk = (id: number, date: Date) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  deleteTaskUserApi(id)
    .then((res) => {
      dispatch(getTask());
      dispatch(getTaskByDate(date));
    })
    .catch((err) => {
      dispatch(setError(true));
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};


export const updateTask: AppThunk =
  (task: TUpdateTask) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    updateTaskUserApi(task)
      .then((res) => {
        dispatch(getTask());
        dispatch(getTaskByDate(task.endDate));
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const addTask: AppThunk =
  (
    done: boolean,
    status: string /*Срочно|Не срочно */,
    endDate: Date,
    title: string,
    description: string
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    addTaskUserApi(title, status, endDate, done, description)
      .then((res) => {
        dispatch(getTask());
        dispatch(getTaskByDate(endDate));
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
