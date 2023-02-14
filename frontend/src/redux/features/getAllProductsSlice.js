import { createSlice } from "@reduxjs/toolkit";
import { fetchProudcts } from "../../actions/productActions";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const getAllProductsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProudcts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProudcts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.resPerPage = action.payload.resPerPage
      state.error = "";
    });
    builder.addCase(fetchProudcts.rejected, (state, action) => {
      state.loading = true;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default getAllProductsSlice.reducer;
