import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IVacResSliceState {
  paymentPeriod: string;
}

const initialState: IVacResSliceState = {
  paymentPeriod: "month",
};

const vacResSlice = createSlice({
  name: "vacRes",
  initialState,
  reducers: {
    setPaymentPeriod(state, action: PayloadAction<string>) {
      state.paymentPeriod = action.payload;
    },
  },
});

export const vacResSelector = (state: RootState) => state.vacRes;

export const { setPaymentPeriod } = vacResSlice.actions;

export default vacResSlice.reducer;
