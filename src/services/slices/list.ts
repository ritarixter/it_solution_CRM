import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";

import { AppDispatch, AppThunk } from "../store";
import { TList } from "../../types";
import {
  addListApi,
  deleteListApi,
  getListApi,
  updateListApi,
} from "../../utils/api";
import { TUpdateListByManager } from "../../types/TList";

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
  (name: string, customer: string, INNCompany: string, description?: string) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    addListApi(name, customer, INNCompany, description)
      .then((res) => {
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
  (list: TUpdateListByManager) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    updateListApi(
      list.id,
      list.name,
      list.customer,
      list.description,
      list.idCompany
    )
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

export const deleteList: AppThunk = (id: number) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  deleteListApi(id)
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
