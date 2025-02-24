import { ExpenseStatistic, Transaction, UserDetails } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactions: Transaction[];
  activities: string[];
  expenseStats: ExpenseStatistic[];
  balanceHistory: string[];
  beneficiaries: UserDetails[];
}

const initialState: TransactionState = {
  transactions: [],
  activities: [],
  expenseStats: [],
  balanceHistory: [],
  beneficiaries: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the entire user state
    setTransactionState: (
      state,
      action: PayloadAction<Partial<TransactionState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTransactionState } = userSlice.actions;
export default userSlice.reducer;
