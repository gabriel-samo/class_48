import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type userState = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

const initialState: userState = JSON.parse(
  localStorage.getItem("gabriel-project3-current-user") || "{}"
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<userState>) {
      state = { ...action.payload };
      localStorage.setItem(
        "gabriel-project3-current-user",
        JSON.stringify(state)
      );
      return state;
    },
    logoutUser(state) {
      state = {} as userState;
      localStorage.removeItem("gabriel-project3-current-user");
      return state;
    }
  }
});

export const { loginUser, logoutUser } = userSlice.actions;
