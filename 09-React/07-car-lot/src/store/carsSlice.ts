import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../model/Car";

type carsState = {
  cars: Car[];
};

const initialState: carsState = {
  cars: JSON.parse(localStorage.getItem("cars") || "[]") || [],
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar(state, action: PayloadAction<Car>) {
      const carsIndex = state.cars.findIndex(
        (item) => item.mispar_rechev === action.payload.mispar_rechev
      );

      if (carsIndex < 0) {
        state.cars.push(action.payload);
      }
      localStorage.setItem("cars", JSON.stringify(state.cars));
    },
    removeCar(state, action: PayloadAction<number>) {
      const carsIndex = state.cars.findIndex(
        (item) => item.mispar_rechev === action.payload
      );
      if (carsIndex >= 0) {
        state.cars.splice(carsIndex, 1);
      }
      localStorage.setItem("cars", JSON.stringify(state.cars));
    },
  },
});

export const { addCar, removeCar } = carsSlice.actions;
