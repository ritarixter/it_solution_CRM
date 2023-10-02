import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface SocketState {
  isConnected: boolean;
  message: string | null;
  isError:boolean;
}

const initialState: SocketState = {
  isConnected: false,
  message: null,
  isError:false
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
        state.isError = action.payload;
      },
  },
});

export const { setConnected, setMessage, setError } = socketSlice.actions;

export const selectIsConnected = (state: RootState) => state.socket.isConnected;
export const selectMessage = (state: RootState) => state.socket.message;
