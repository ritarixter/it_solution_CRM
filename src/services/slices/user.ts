import { AppDispatch, AppThunk } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";
import { TUser } from "../../types";
import Cookies from "js-cookie";

import {
  addUserApi,
  changeCountNotifyApi,
  editUserApi,
  getDataUser,
  getUsersApi,
  signIn,
  signUp,
} from "../../utils/api";
import { TUserUpdate } from "../../types/TUser";

interface userState {
  user: TUser;
  users: Array<TUser>;
  isAuth: boolean;
  isError: boolean;
  isLoadingUser: boolean;
}

const initialStateLogout: userState = {
  users: [],
  user: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    name: "",
    avatar: "",
    phone: "",
    access: "",
    username: "",
    password: "",
    notifications: []
  },
  isAuth: false,
  isError: false,
  isLoadingUser: false,
};

const initialState: userState = {
  users: [],
  user: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    name: "",
    avatar: "",
    phone: "",
    access: "",
    username: "",
    password: "",
    notifications: []
  },
  isAuth: !!Cookies.get("accessToken"),
  isError: false,
  isLoadingUser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    setUsers(state, action: PayloadAction<Array<TUser>>) {
      state.users = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },

    // setCountStep(state, action: PayloadAction<number>) {
    //   state.user.count = action.payload;
    // },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingUser = action.payload;
    },
    logout: () => initialStateLogout,
  },
});

export const {
  setUser,
  setAuth,
  setError,
  logout,
  setLoading,
  setUsers,
 // setCountStep,
} = userSlice.actions;

export const registerUser: AppThunk =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    signUp(username, password)
      .then((res) => {
        Cookies.set("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
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
        Cookies.set("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setError(false));
        dispatch(setAuth(true));
        dispatch(getUser());
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
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

export const getUsers: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  getUsersApi()
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const addUser: AppThunk =
  (
    name: string,
    username: string,
    password: string,
    access: string,
    phone: string,
    avatar: string
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    addUserApi(name, username, password, access, phone, avatar)
      .then((res) => {
        dispatch(getUsers());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const changeCountNotify: AppThunk =
  (idUser: number, count: number) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    changeCountNotifyApi(idUser, count)
      .then((res) => {
      
        dispatch(getUsers());
        dispatch(getUser());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  export const updateUser: AppThunk =
  (user: TUserUpdate) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    editUserApi(user)
      .then((res) => {
        dispatch(setError(false));
        dispatch(getUser());
        dispatch(getUsers());
      })
      .catch((err) => {
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

// export const deleteUser: AppThunk =
//   (id: number) => (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     deleteUsers(id)
//       .then((res) => {
//         dispatch(setError(false));
//         dispatch(getUser());
//       })
//       .catch((err) => {
//         dispatch(setError(true));
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//       });
//   };