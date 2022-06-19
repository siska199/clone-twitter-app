import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modalComment: false,
    loading: false,
    posts: [],
  },
};
const handleAddPost = createAsyncThunk("post/AddPost", async (form) => {
  try {
    const formImage = new FormData();
    formImage.append("file", form.image);
    formImage.append("upload_preset", "my-uploads");

    const dataImage = await fetch(
      "https://api.cloudinary.com/v1_1/university-state-of-malang-city/image/upload",
      {
        method: "POST",
        body: formImage,
      }
    ).then((r) => r.json());

    const addPost = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        image: dataImage.secure_url,
      }),
    });
    return addPost;
  } catch (error) {
    return error;
  }
});

const handleGetPosts = createAsyncThunk("posts/GetPosts", async (userId) => {
  try {
    const posts = await fetch("http://localhost:3000/api/posts").then((data) =>
      data.json()
    );
    return posts;
  } catch (error) {
    return error;
  }
});

const handleLike = createAsyncThunk("post/addRemoveLike", async (data) => {
  console.log("data: ", data.idPost);
  try {
    const resLike = await fetch(
      `http://localhost:3000/api/like/${data.idPost}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.form),
      }
    ).then((r) => r.json());
    console.log("resLike: ", resLike);
  } catch (error) {
    return error;
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    handleModalComment: (state, action) => {},
  },
  extraReducers: {
    [handleAddPost.pending]: (state) => {
      state.value.loading = true;
    },
    [handleAddPost.fulfilled]: (state, action) => {
      state.value.loading = false;
    },
    [handleAddPost.rejected]: (state) => {
      state.value.loading = false;
    },

    [handleGetPosts.pending]: (state) => {
      state.value.loading = true;
    },
    [handleGetPosts.fulfilled]: (state, action) => {
      state.value.loading = false;
      state.value.posts = action.payload;
    },
    [handleGetPosts.rejected]: (state) => {
      state.value.loading = false;
    },

    [handleLike.pending]: (state) => {},
    [handleLike.fulfilled]: (state, action) => {},
    [handleLike.rejected]: (state) => {},
  },
});

export const { handleModalComment, handleLoading } = postSlice.actions;
export { handleAddPost, handleGetPosts, handleLike };
export default postSlice.reducer;
