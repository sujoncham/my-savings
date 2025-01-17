import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/donations";

// Thunks for async actions
export const fetchDonations = createAsyncThunk(
  "donations/fetchDonations",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/`);
    console.log("first response", response.data.data);
    return response.data.data;
  }
);

export const addDonation = createAsyncThunk(
  "donations/addDonation",
  async (amount) => {
    const response = await axios.post(
      `http://localhost:5000/api/donations/addDonation`,
      {
        amount,
      }
    );
    return response.data.data;
  }
);

export const deductDonation = createAsyncThunk(
  "donations/deductDonation",
  async ({ title, amount }) => {
    const response = await axios.post(
      `http://localhost:5000/api/donations/deductDonation`,
      {
        title,
        amount,
      }
    );
    return response.data.data;
  }
);

// Redux slice
const donationSlice = createSlice({
  name: "donations",
  initialState: {
    totalCollectionAmount: 0,
    totalDonatedAmount: 0,
    donationHistory: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        console.log("Action Payload:", action.payload); // Debug log
        const { totalCollection, donationHistory, totalDonated } =
          action.payload || {};
        state.totalCollectionAmount = totalCollection || 0;
        state.donationHistory = donationHistory || [];
        state.totalDonatedAmount = totalDonated || 0;
        state.loading = false;
      })

      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDonation.fulfilled, (state, action) => {
        const { totalCollection, donationHistory } = action.payload;
        state.totalCollectionAmount =
          totalCollection || state.totalCollectionAmount;
        state.donationHistory = donationHistory || state.donationHistory;
      })
      .addCase(deductDonation.fulfilled, (state, action) => {
        console.log("Action Payload:", action.payload); // Debug log
        const { totalCollection, totalDonated, donationHistory } =
          action.payload;
        state.totalCollectionAmount =
          totalCollection || state.totalCollectionAmount;
        state.totalDonatedAmount = totalDonated || state.totalDonatedAmount;
        state.donationHistory = donationHistory || state.donationHistory;
      });
  },
});

export default donationSlice.reducer;
