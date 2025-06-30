import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import filter from "./slices/filterSlice";
import skills from "./slices/skillsSlice";

export const store = configureStore({
  reducer: {
    filter,
    skills,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
