import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CategoryState = {
    categories: string[];
}

const initialState: CategoryState = {
    categories: JSON.parse(localStorage.getItem('cat') || '[]') || [],
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory(state, action: PayloadAction<string>) {
            const categoryIndex = state.categories.findIndex(item => item === action.payload);
            if (categoryIndex < 0) {
                state.categories.push(action.payload);
            }
            localStorage.setItem('cat', JSON.stringify(state.categories));
        },
        removeCategory(state, action: PayloadAction<string>) {
            const categoryIndex = state.categories.findIndex(item => item === action.payload);
            if (categoryIndex >= 0) {
                state.categories.splice(categoryIndex, 1);
            }
            localStorage.setItem('cat', JSON.stringify(state.categories));
        },
        searchCategory() { },
    }
})

export const { addCategory, removeCategory } = categorySlice.actions