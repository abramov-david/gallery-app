import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import imgsReducer from "./slices/imgsSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    getImgs: imgsReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
