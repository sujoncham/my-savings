import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/donations";

// Async Actions
export const fetchOthers = createAsyncThunk(
  "others/fetchOthers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addCollection = createAsyncThunk(
  "others/addCollection",
  async ({ title, amount, note }) => {
    const response = await axios.post(`${API_BASE_URL}/addCollection`, {
      amount,
      title,
      note,
    });
    return response.data.data;
  }
);

export const deductOther = createAsyncThunk(
  "others/deductOther",
  async ({ title, amount, note }) => {
    const response = await axios.post(`${API_BASE_URL}/deductDonation`, {
      title,
      amount,
      note,
    });
    return response.data.data;
  }
);

export const editDonated = createAsyncThunk(
  "others/editDonated",
  async ({ id, title, amount, note }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/updateDonated/${id}`, {
        title,
        amount,
        note,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit donation");
    }
  }
);
export const editCollection = createAsyncThunk(
  "others/editCollection",
  async ({ id, title, amount, note }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateCollection/${id}`,
        {
          title,
          amount,
          note,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit donation");
    }
  }
);

export const deleteDonated = createAsyncThunk(
  "others/deleteDonated",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteDonated/${id}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete donation"
      );
    }
  }
);
export const deleteCollection = createAsyncThunk(
  "others/deleteCollection",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteCollection/${id}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete donation"
      );
    }
  }
);

const donationSlice = createSlice({
  name: "others",
  initialState: {
    totalCollectionAmount: 0,
    totalDonatedAmount: 0,
    donationHistory: [],
    collectionHistory: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOthers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOthers.fulfilled, (state, action) => {
        const {
          totalCollection,
          donationHistory,
          totalDonated,
          collectionHistory,
        } = action.payload || {};
        state.totalCollectionAmount = totalCollection || 0;
        state.totalDonatedAmount = totalDonated || 0;
        state.donationHistory = donationHistory || [];
        state.collectionHistory = collectionHistory || [];
        state.loading = false;
      })
      .addCase(fetchOthers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch donation data.";
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        const payload = action.payload || {};
        // console.log("addCollection payload:", payload); // Debug log
        state.totalCollectionAmount =
          payload.totalCollection || state.totalCollectionAmount;
        state.collectionHistory =
          payload.collectionHistory || state.collectionHistory;
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.error = action.payload || "Failed to add collection.";
      })
      .addCase(deductOther.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.totalCollectionAmount =
          payload.totalCollection || state.totalCollectionAmount;
        state.totalDonatedAmount =
          payload.totalDonated || state.totalDonatedAmount;
        state.donationHistory =
          payload.donationHistory || state.donationHistory;
      })

      .addCase(deductOther.rejected, (state, action) => {
        state.error = action.payload || "Failed to deduct donation.";
      })
      .addCase(editDonated.fulfilled, (state, action) => {
        state.totalDonatedAmount = action.payload.totalDonated;
        state.donationHistory = action.payload.donationHistory;
      })
      .addCase(deleteDonated.fulfilled, (state, action) => {
        state.totalDonatedAmount = action.payload.totalDonated;
        state.donationHistory = action.payload.donationHistory;
      })
      .addCase(editCollection.fulfilled, (state, action) => {
        state.totalCollectionAmount = action.payload.totalCollection;
        state.collectionHistory = action.payload.collectionHistory;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.totalCollectionAmount = action.payload.totalCollection;
        state.collectionHistory = action.payload.collectionHistory;
      });
  },
});

export default donationSlice.reducer;
