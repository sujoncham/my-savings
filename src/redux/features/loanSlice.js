import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateLoan = createAsyncThunk(
  "loans/deductPayment",
  async ({ id, partialPayment, interestPayment }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://amar-savings-loan.onrender.com/api/loans/${id}/deduct-payment`,
        { partialPayment, interestPayment }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update savings
export const editLoans = createAsyncThunk(
  "loans/editLoans",
  async ({ id, totalLoan }) => {
    const response = await axios.put(
      `https://amar-savings-loan.onrender.com/api/loans/${id}/edit-loans`,
      {
        totalLoan,
      }
    );
    return response.data;
  }
);

// Thunk: Add Loan
export const addLoan = createAsyncThunk(
  "loans/addLoan",
  async ({ name, totalLoan, totalInterest }) => {
    const response = await axios.post(
      "https://amar-savings-loan.onrender.com/api/loans/addLoan",
      {
        name,
        totalLoan,
        totalInterest,
      }
    );
    return response.data;
  }
);

// Thunk: Fetch All Loans
export const fetchLoans = createAsyncThunk("loans/fetchLoans", async () => {
  const response = await axios.get(
    "https://amar-savings-loan.onrender.com/api/loans"
  );
  return response.data;
});

// Loan Slice
const loanSlice = createSlice({
  name: "loans",
  initialState: {
    loans: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoans(state, action) {
      state.data = action.payload; // Update loans array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        state.loans.push(action.payload);
      })

      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLoan = action.payload;
        const index = state.loans.findIndex(
          (loan) => loan._id === updatedLoan._id
        );
        if (index !== -1) {
          state.loans[index] = updatedLoan;
        }
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoans } = loanSlice.actions;
export default loanSlice.reducer;
