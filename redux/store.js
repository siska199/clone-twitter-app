import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import userReducer from "./features/userSlice";
const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
