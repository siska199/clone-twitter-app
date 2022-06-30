import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modalSignUp: false,
    modalSignIn: false,
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleModalSignUp: (state, action) => {
      state.value.modalSignUp = action.payload;
    },
    handleModalSignIn: (state, action) => {
      state.value.modalSignIn = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { handleModalSignUp, handleModalSignIn } = userSlice.actions;
