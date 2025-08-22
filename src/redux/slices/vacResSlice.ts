import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IVacResSliceState {
  paymentPeriod: string;
  paymentType: string;
}

const initialState: IVacResSliceState = {
  paymentPeriod: "month",
  paymentType: "net",
};

const vacResSlice = createSlice({
  name: "vacRes",
  initialState,
  reducers: {
    setPaymentPeriod(state, action: PayloadAction<string>) {
      state.paymentPeriod = action.payload;
    },
    setPaymentType(state, action: PayloadAction<string>) {
      state.paymentType = action.payload;
    },
  },
});

export const vacResSelector = (state: RootState) => state.vacRes;

export const { setPaymentPeriod, setPaymentType } = vacResSlice.actions;

export default vacResSlice.reducer;
