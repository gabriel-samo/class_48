import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LoggedUser } from "../model/LoggedUser";

type userState = {
  loggedUser?: {
    userName: string;
    userEmail: string;
    userRole: string;
    userToken: string;
  };
};

const initialState: userState = {
  loggedUser: JSON.parse(localStorage.getItem("user") || "{}") || {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<LoggedUser>) {
      const userToken = action.payload.userToken;
      if (userToken.length > 10) {
        state.loggedUser = action.payload;
        localStorage.setItem("user", JSON.stringify(state.loggedUser));
      }
    },
    addNewToken(state, action: PayloadAction<string>) {
      if (action.payload.length > 10) {
        state.loggedUser!.userToken = action.payload;
        localStorage.setItem("user", JSON.stringify(state.loggedUser));
      }
    },
    logoutUser(state, action: PayloadAction<string>) {
      if (state.loggedUser?.userName === action.payload) {
        delete state.loggedUser;
      }
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, addNewToken, logoutUser } = userSlice.actions;
