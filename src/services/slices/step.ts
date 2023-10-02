import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteStepApi, getStepApi } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";
import { TStep } from "../../types/TStep";

interface stepState {
  step: Array<TStep>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: stepState = {
  step: [],
  isError: false,
  isLoading: false,
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

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setStep, setError, setLoading } =
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

export const deleteStep: AppThunk = (id: number) => (dispatch: AppDispatch) => {
  setLoading(true);
  deleteStepApi(id)
    .then((res) => {
      dispatch(getStep());
      setError(false);
    })
    .catch((err) => {
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
};

