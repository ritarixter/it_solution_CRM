import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getStepApi } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";
import { TStep } from "../../types/TStep";

interface stepState {
  step: Array<TStep>;
  isError: boolean;
  isLoading: boolean;
  count: number;
}

const initialState: stepState = {
  step: [],
  isError: false,
  isLoading: false,
  count: 0,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Array<TStep>>) {
      state.step = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setCountStep(state) {
      state.count = state.count + 1;
    },

    setNullCountStep(state) {
      state.count = 0;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setStep, setError, setLoading, setCountStep, setNullCountStep } =
  stepSlice.actions;

export const getStep: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getStepApi()
    .then((res) => {
      dispatch(setStep(res));
      setError(false);
    })
    .catch((err) => {
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
};
