import { configureStore } from "@reduxjs/toolkit";
import watchListSlice from "./watchListSlice";
export const store = configureStore({
  reducer: {
    watchList: watchListSlice,
  },
});
