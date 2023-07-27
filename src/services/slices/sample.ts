import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";

import { AppDispatch, AppThunk } from "../store";
import { TSample } from "../../types";
import { getListApi, getSampleApi } from "../../utils/api";

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

// export const addSample: AppThunk =
//   (title: string, works: string, users?: string, description?: string) =>
//   (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     addSampleApi(title, works, users, description)
//       .then((res) => {
//         dispatch(setSample());
//       })
//       .catch((err) => {
//         dispatch(setError(true));
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//       });
//   };
