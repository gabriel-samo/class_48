import { createSlice } from "@reduxjs/toolkit";

type themeState = {
  theme: "light" | "dark";
};

const initialState: themeState = JSON.parse(
  localStorage.getItem("gabriel-project3-theme") || '{ "theme": "light" }'
);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("gabriel-project3-theme", JSON.stringify(state));
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
