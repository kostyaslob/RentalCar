import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/getAll",
  async ({ page, limit, filters }, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
        ...filters,
      };
        const response = await axios.get("/cars", { params });
      return {
        cars: response.data.cars,
        page: Number(response.data.page),
        totalCars: response.data.totalCars,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "cars/getBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/brands");
      return ["All cars", ...response.data];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
