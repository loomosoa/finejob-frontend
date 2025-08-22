import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import filter from "./slices/filterSlice";
import skills from "./slices/skillsSlice";
import vacRes from "./slices/vacResSlice";

export const store = configureStore({
  reducer: {
    filter,
    skills,
    vacRes,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
