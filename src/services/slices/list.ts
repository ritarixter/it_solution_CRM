import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";

import { AppDispatch, AppThunk } from "../store";
import { TList } from "../../types";
import { getListApi } from "../../utils/api";

interface listState {
  list: Array<TList>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: listState = {
  list: [],
  isError: false,
  isLoading: false,
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
      state.isLoading = action.payload;
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
