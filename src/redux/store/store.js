// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import personList from "../features/personSlice";
import loanSlice from "../features/loanSlice";
import authSlice from "../features/authSlice";
import expensesSlice from "../features/expensesSlice";
import donationSlice from "../features/donationSlice";
import blogSlice from "../features/blogSlice";

const store = configureStore({
  reducer: {
    persons: personList,
    loans: loanSlice,
    auth: authSlice,
    expenses: expensesSlice,
    donations: donationSlice,
    blogs: blogSlice,
  },
});

export default store;
