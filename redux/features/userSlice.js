import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: {
    modalSignUp: false,
    modalSignIn: false,
    users: [],
  },
};

let cancelToken;
const handleQueryUser = createAsyncThunk("users/query-users", async (query) => {
  try {
    if (cancelToken) cancelToken.cancel();

    cancelToken = axios.CancelToken.source();
    const res = await axios.get(`/api/users?q=${query}`, {
      cancelToken: cancelToken.token,
    });
    return {
      users: res.data,
    };
  } catch (error) {
  }
});

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
  extraReducers: {
    [handleQueryUser.pending]: (state) => {},
    [handleQueryUser.fulfilled]: (state, action) => {
      state.value.users = action.payload ? action.payload.users : [];
    },
    [handleQueryUser.rejected]: (state) => {},
  },
});

export default userSlice.reducer;
export const { handleModalSignUp, handleModalSignIn } = userSlice.actions;
export { handleQueryUser };
