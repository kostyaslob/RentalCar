import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});