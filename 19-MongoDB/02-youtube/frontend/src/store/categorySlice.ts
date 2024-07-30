import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CategoryState = {
  categories: string[];
};

const initialState: CategoryState = {
  categories: []
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      const categoryIndex = state.categories.findIndex(
        (item) => item === action.payload
      );
      if (categoryIndex < 0) {
        state.categories.push(action.payload);
      }
      return state;
    },
    removeCategory(state, action: PayloadAction<string>) {
      const categoryIndex = state.categories.findIndex(
        (item) => item === action.payload
      );
      if (categoryIndex >= 0) {
        state.categories.splice(categoryIndex, 1);
      }
      return state;
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      return state;
    }
  }
});

export const { addCategory, removeCategory, setCategories } =
  categorySlice.actions;
