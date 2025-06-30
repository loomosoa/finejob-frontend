import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortEnum {
  POPULARITY_DESC = "-popularity",
  POPULARITY_ASC = "popularity",
  REVENUE_DESC = "-revenue",
  REVENUE_ASC = "revenue",
}

export type TSort = {
  name: string;
  type: SortEnum;
};

export const SortsList = [
  {
    name: "Сначала более популярные",
    type: SortEnum.POPULARITY_DESC,
  },
  {
    name: "Сначала менее популярные",
    type: SortEnum.POPULARITY_ASC,
  },
  {
    name: "Сначала доход выше",
    type: SortEnum.REVENUE_DESC,
  },
  {
    name: "Сначала доход ниже",
    type: SortEnum.REVENUE_ASC,
  },
];

export interface IFilterSliceState {
  sort: TSort;
  currentPage: number;
  totalPages: number;
}

const initialState: IFilterSliceState = {
  sort: {
    name: "Сначала более популярные",
    type: SortEnum.POPULARITY_DESC,
  },
  currentPage: 1,
  totalPages: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setSort, setCurrentPage, setTotalPages } = filterSlice.actions;

export default filterSlice.reducer;

//TODO: add
// enum GradeEnum {
//   JUNIOR = "junior",
//   MIDDLE = "middle",
//   SENIOR = "senior",
// }

// enum DeveloperTypeEnum {
//   FRONTEND = "frontend",
//   BACKEND = "backend",
//   FULLSTACK = "fullstack",
// }

// export type TOptions = {
//   grade: GradeEnum;
//   developerType: DeveloperTypeEnum;
// };
