import { AppDispatch, AppThunk } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookies";
import { TUser } from "../../types";

import { getDataUser, signIn, signUp } from "../../utils/api";

interface userState {
  user: TUser;
  isAuth: boolean;
  isError: boolean;
  isLoadingUser: boolean;
}

const initialState: userState = {
  user: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
    avatar: '',
    access: '',
    username: "",
    password: "",
  },
  isAuth: !!getCookie("accessToken"),
  isError: false,
  isLoadingUser: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
  setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    }, 
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingUser = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setUser, setAuth, setError, logout, setLoading } = userSlice.actions;

export const registerUser: AppThunk =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    signUp(username, password)
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        //setCookie('refreshToken', res.refreshToken);
       dispatch(setAuth(true));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };


export const loginUser: AppThunk =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    signIn(username, password)
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        //setCookie('refreshToken', res.refreshToken);
        dispatch(setError(false));
        dispatch(setAuth(true));
        dispatch(getUser())
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const getUser: AppThunk =
() => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  getDataUser()
    .then((res) => {
      dispatch(setUser(res)); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
