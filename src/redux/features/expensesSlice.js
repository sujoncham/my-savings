import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "https://amar-savings-loan.onrender.com/api/expenses";

// Async Thunks

// Fetch all expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch expenses"
      );
    }
  }
);

// Add a new expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/expenses/addExpense`,
        expenseData
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add expense"
      );
    }
  }
);

// Update an existing expense
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, ...updateData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updateData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update expense"
      );
    }
  }
);

// Delete an expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      return id; // Return the ID of the deleted expense
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  }
);

// Expense Slice
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const updatedExpense = action.payload;
        state.expenses = state.expenses.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        );
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to use in the store
export default expensesSlice.reducer;
