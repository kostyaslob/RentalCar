import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchBrands } from "./operations";

const slice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    },
    page: 1,
    limit: 12,
    totalCars: 0,
    totalPage: 0,
    brands: [],
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        const { cars, page, totalCars, totalPages } = action.payload;
        state.totalCars = totalCars;
        state.totalPages = totalPages;
        if (page === 1) {
          state.items = cars;
        } else {
          state.items = [...state.items, ...cars];
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage } = slice.actions;
export default slice.reducer;
