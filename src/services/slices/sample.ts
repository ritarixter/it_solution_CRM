import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, AppThunk } from "../store";
import { TFile, TSample } from "../../types";
import {
  addSampleApi,
  deleteSampleApi,
  getSampleApi,
  updateSampleApi,
} from "../../utils/api";
import { TSampleUpdate } from "../../types/TSample";

interface sampleState {
  samples: Array<TSample>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: sampleState = {
  samples: [],
  isError: false,
  isLoading: false,
};

export const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    setSample(state, action: PayloadAction<Array<TSample>>) {
      state.samples = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setSample, setError, setLoading } = sampleSlice.actions;

export const getSample: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getSampleApi()
    .then((res) => {
      dispatch(setSample(res));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const addSample: AppThunk =
  (
    title: string,
    works: number[],
    users?: number[],
    description?: string,
    files?: Array<TFile>
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    addSampleApi(title, works, users, description, files)
      .then((res) => {
        dispatch(getSample());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const updateSample: AppThunk =
  (sample: TSampleUpdate) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    updateSampleApi(sample)
      .then((res) => {
        dispatch(setError(false));
        dispatch(getSample());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const deleteSample: AppThunk =
  (id: number) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    deleteSampleApi(id)
      .then((res) => {
        dispatch(setError(false));
        dispatch(getSample());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
