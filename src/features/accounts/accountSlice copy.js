import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
  error: "",
};

export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ depositAmount, currency }) => {
    console.log(depositAmount, currency);
    if (currency === "USD") return depositAmount;
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${depositAmount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedAmount = data.rates.USD;
    return convertedAmount;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // deposit(state, action) {
    //   state.balance += action.payload;
    //   state.isLoading = false;
    // },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    // convertingCurrency(state) {
    //   state.isLoading = false;
    // },
    extraReducers: (builder) => {
      builder.addCase(deposit.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(deposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance += action.payload;
      });
      builder.addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;



export default accountSlice.reducer;

