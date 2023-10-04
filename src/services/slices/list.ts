import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, AppThunk } from "../store";
import { TFile, TList, TUser } from "../../types";
import {
  addCommentApi,
  addListApi,
  addNotifyApi,
  deleteCommentApi,
  deleteListApi,
  getListApi,
  updateListApi,
  updateStepApi,
} from "../../utils/api";
import { TUpdateList } from "../../types/TList";
import { deleteStep, getStep } from "./step";
import { message } from "../../utils/constants";

interface listState {
  list: Array<TList>;
  isError: boolean;
  isLoadingList: boolean;
}

const initialState: listState = {
  list: [],
  isError: false,
  isLoadingList: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Array<TList>>) {
      state.list = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingList = action.payload;
    },
  },
});

export const { setList, setError, setLoading } = listSlice.actions;

export const getList: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getListApi()
    .then((res) => {
      dispatch(setList(res));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const addList: AppThunk =
  (
    user: TUser,
    address: string,
    customer: string,
    INNCompany: string,
    description?: string,
    files?: Array<TFile>
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    addListApi(address, customer, INNCompany, files)
      .then((res) => {
        if (description) {
          addCommentApi(res.id, user.id, description);
        }
        updateStepApi(res.step.id, 1);
        console.log(res)
        addNotifyApi(res.id, [res.users[0].id], message[1]);
        dispatch(getStep());
        dispatch(getList());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const updateList: AppThunk =
  (list: TUpdateList) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    updateListApi(list)
      .then((res) => {
        dispatch(setError(false));
        dispatch(getList());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const deleteList: AppThunk =
  (list: TList) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    if (list.comments) {
      list.comments.forEach((comment) => {
        deleteCommentApi(comment.id);
      });
    }
    deleteListApi(list.id)
      .then((res) => {
        dispatch(deleteStep(list.step.id));
        dispatch(setError(false));

        dispatch(getList());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
