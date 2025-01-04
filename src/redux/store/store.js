// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import personList from "../features/personSlice";
import loanSlice from "../features/loanSlice";
import authSlice from "../features/authSlice";

const store = configureStore({
  reducer: {
    persons: personList,
    loans: loanSlice,
    auth: authSlice,
  },
});

export default store;
