import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch blogs based on type (home or blog page)
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ page = 1, type = "blog" }) => {
    const response = await axios.get(
      `http://localhost:5000/api/blogs?page=${page}&limit=${
        type === "home" ? 6 : 9
      }&type=${type}`
    );
    return {
      data: response.data.data,
      type,
      totalPages: response.data.totalPages,
    };
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    homeBlogs: [],
    paginatedBlogs: [],
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.type === "home") {
          state.homeBlogs = action.payload.data; // Store only 6 blogs for home
        } else {
          state.paginatedBlogs = action.payload.data; // Store paginated blogs for blog page
          state.totalPages = action.payload.totalPages;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
