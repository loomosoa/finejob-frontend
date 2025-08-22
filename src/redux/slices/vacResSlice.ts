import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IVacResSliceState {
  paymentPeriod: string;
  paymentType: string;
  paymentCurrency: string;
}

const initialState: IVacResSliceState = {
  paymentPeriod: "month",
  paymentType: "net",
  paymentCurrency: "USD",
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
    setPaymentCurrency(state, action: PayloadAction<string>) {
      state.paymentCurrency = action.payload;
    },
  },
});

export const vacResSelector = (state: RootState) => state.vacRes;

export const { setPaymentPeriod, setPaymentType, setPaymentCurrency } =
  vacResSlice.actions;

export default vacResSlice.reducer;
