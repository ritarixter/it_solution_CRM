import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getStockApi } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";

export type TStock = {
  id: string;
  name: string;
  count: number;
};

interface stockState {
  stocks: Array<TStock>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: stockState = {
  stocks: [],
  isError: false,
  isLoading: false,
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStock(state, action: PayloadAction<Array<TStock>>) {
      state.stocks = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setStock, setError, setLoading } = stockSlice.actions;

export const getStock: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getStockApi()
    .then((res) => {
      dispatch(setStock(res));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
