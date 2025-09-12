import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

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
        limit: 12
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.page = 1;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                const { cars, page } = action.payload;
                if (page === 1) {
                    state.items = cars;
                } else {
                    state.items = [...state.items, ...cars];
                }
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setFilters, setPage } = slice.actions;
export default slice.reducer;