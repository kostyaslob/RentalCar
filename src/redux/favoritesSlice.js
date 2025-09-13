import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [],
    },
    reducers: {
        toggleFavorites: (state, action) => {
            const carId = action.payload;
            if (state.items.includes(carId)) {
                state.items = state.items.filter((id) => id !== carId);
            } else {
                state.items.push(carId)
            }
        },
        clearFavorites: (state) => {
            state.items = [];
        },
    },
});

export const { toggleFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;