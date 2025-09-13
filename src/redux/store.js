import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import carsReducer from "./slice";
import favoritesReducer from "./favoritesSlice";

const favoritesPersistConfig = {
  key: "favorites",
  storage,
}

const rootReducer = combineReducers({
  cars: carsReducer,
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);