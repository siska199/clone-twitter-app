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

let cancelToken;
const handleQueryUser = createAsyncThunk("user/query-users", async (query) => {
  try {
    if (cancelToken) cancelToken.cancel();

    cancelToken = axios.CancelToken.source();
    const res = await axios.get(`/api/users?q=${query}`, {
      cancelToken: cancelToken.token,
    });
    return {
      users: res.data,
    };
  } catch (error) {}
});

const handleGetProfile = createAsyncThunk("user/get-profile", async (id) => {
  try {
    console.log("id masok: ", id)
    const res = await fetch(`/api/users/${id}`).then((res) => res.json());
    console.log("res: ",res)
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
