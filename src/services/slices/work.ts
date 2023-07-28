import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TWork } from "../../types";
import { getWorkApi } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";

interface workState {
  works: Array<TWork>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: workState = {
  works: [],
  isError: false,
  isLoading: false,
};

export const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setWork(state, action: PayloadAction<Array<TWork>>) {
      state.works = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setWork, setError, setLoading } = workSlice.actions;

export const getWork: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getWorkApi()
    .then((res) => {
      dispatch(setWork(res));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
