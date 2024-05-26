// npm install @reduxjs/toolkit react-redux

import { configureStore } from "@reduxjs/toolkit";
import { carsSlice } from "./carsSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    cars: carsSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
