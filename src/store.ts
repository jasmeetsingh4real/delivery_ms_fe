import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
