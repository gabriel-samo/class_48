import { configureStore } from "@reduxjs/toolkit";
import { songsSlice } from "./songsSlice";
import { categorySlice } from "./categorySlice";

export const store = configureStore({
    reducer: {
        songs: songsSlice.reducer,
        categories: categorySlice.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({ serializableCheck: false })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>