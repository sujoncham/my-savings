// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import personList from "../features/personSlice";
import loanSlice from "../features/loanSlice";
import authSlice from "../features/authSlice";
import expensesSlice from "../features/expensesSlice";

const store = configureStore({
  reducer: {
    persons: personList,
    loans: loanSlice,
    auth: authSlice,
    expenses: expensesSlice,
  },
});

export default store;
