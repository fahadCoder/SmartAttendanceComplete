import { configureStore } from "@reduxjs/toolkit";
import {DashboardSlice } from "./slice";


const store = configureStore({
  reducer: {
    dashboard: DashboardSlice.reducer,
   
  },
});

export default store;