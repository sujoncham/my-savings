import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://amar-savings-loan.onrender.com/api/persons";

// Async Thunks
export const fetchPersons = createAsyncThunk(
  "person/fetchPersons",
  async () => {
    const response = await axios.get(
      "https://amar-savings-loan.onrender.com/api/persons"
    );
    return response.data.data; // List of persons
  }
);

export const addMoney = createAsyncThunk(
  "person/addMoney",
  async ({ id, amount }) => {
    const response = await axios.put(
      `https://amar-savings-loan.onrender.com/api/persons/${id}/add-money`,
      { amount }
    );
    return response.data.data; // Updated person
  }
);

// Update savings
export const updateSavings = createAsyncThunk(
  "persons/updateSavings",
  async ({ id, savings }) => {
    const response = await axios.put(`${API_URL}/${id}/edit-savings`, {
      savings,
    });
    return response.data.data;
  }
);

const personSlice = createSlice({
  name: "person",
  initialState: {
    persons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.persons = action.payload;
      })
      .addCase(fetchPersons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMoney.fulfilled, (state, action) => {
        const updatedPerson = action.payload;
        const index = state.persons.findIndex(
          (p) => p.id === updatedPerson._id
        );
        if (index !== -1) {
          state.persons[index] = updatedPerson;
        }
      });
  },
});

export default personSlice.reducer;
