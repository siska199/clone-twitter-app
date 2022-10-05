import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: {
    modalSignUp: false,
    modalSignIn: false,
    users: [],
    profile: null,
  },
};

let controller;
const handleQueryUser = createAsyncThunk("user/query-users", async (query) => {
  try {
    if (controller) controller.abort();

    controller = new AbortController();
    const { signal } = controller;
    const res = await fetch(`/api/users?q=${query}`, {
      signal,
    }).then((res) => res.json());

    return {
      users: res,
    };
  } catch (error) {}
});

const handleGetProfile = createAsyncThunk("user/get-profile", async (id) => {
  try {
    const res = await fetch(`/api/users/${id}`).then((res) => res.json());
    return {
      profile: res,
    };
  } catch (error) {
    return error;
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

    [handleGetProfile.pending]: (state) => {},
    [handleGetProfile.fulfilled]: (state, action) => {
      state.value.profile = action.payload.profile;
    },
    [handleGetProfile.rejected]: (state) => {},
  },
});

export default userSlice.reducer;
export const { handleModalSignUp, handleModalSignIn } = userSlice.actions;
export { handleQueryUser, handleGetProfile };
