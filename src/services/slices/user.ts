import { AppDispatch, AppThunk } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookies";
import { TUser } from "../../types";

import { getDataUser, signIn, signUp } from "../../utils/api";

interface userState {
  user: TUser;
  isAuth: boolean;
  isError: boolean;
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
    logout: () => initialState,
  },
});

export const { setUser, setAuth, setError, logout } = userSlice.actions;

export const registerUser: AppThunk =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    signUp(username, password)
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        //setCookie('refreshToken', res.refreshToken);
       dispatch(setAuth(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };


export const loginUser: AppThunk =
  (username: string, password: string) => (dispatch: AppDispatch) => {
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
      });
  };


  
export const getUser: AppThunk =
() => (dispatch: AppDispatch) => {
  getDataUser()
    .then((res) => {
      dispatch(setUser(res)); 
    })
    .catch((err) => {
      console.log(err);
    });
};
