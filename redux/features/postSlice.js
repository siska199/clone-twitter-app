import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseURL =
  "https://clone-twitter199.vercel.app/" || "http://localhost:3000";

const initialState = {
  value: {
    modalComment: false,
    loading: false,
    posts: [],
    comments: [],
    loadingAddComment: false,
    renderPosts: false,
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
    const addPost = await fetch(`${baseURL}/api/posts`, {
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
const handleAddComment = createAsyncThunk(
  "posts/addComment",
  async ({ idPost, formComment: form }) => {
    try {
      const addComment = await fetch(
        `${baseURL}/api/posts/${idPost}/comments`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      ).then((r) => r.json());
      return addComment;
    } catch (error) {
      return error;
    }
  }
);
const handleGetPosts = createAsyncThunk("posts/GetPosts", async () => {
  try {
    const posts = await fetch("http://localhost:3000/api/posts").then((data) =>
      data.json()
    );
    return posts;
  } catch (error) {
    return error;
  }
});
const handleGetComments = createAsyncThunk(
  "/posts/getComments",
  async (idPost) => {
    try {
      const comments = await fetch(
        `${baseURL}/api/posts/${idPost}/comments`
      ).then((r) => r.json());
      return comments;
    } catch (error) {
      return error;
    }
  }
);

const handleLike = createAsyncThunk("post/addRemoveLike", async (data) => {
  try {
    if (data.idLove) {
      await fetch(
        `${baseURL}/api/posts/${data.idPost}/loves/${data.idLove}`,
        {
          method: "DELETE",
        }
      );
    } else {
      await fetch(`${baseURL}/api/posts/${data.idPost}/loves`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.form),
      }).then((r) => r.json());
    }
  } catch (error) {
    return error;
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    handleModalComment: (state, action) => {
      state.value.modalComment = action.payload;
    },
    handleRenderPosts: (state, action) => {
      state.value.renderPosts = !state.value.renderPosts;
    },
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
    [handleLike.fulfilled]: (state, action) => {
      state.value.comments = action.payload;
    },
    [handleLike.rejected]: (state) => {},

    [handleGetComments.pending]: (state) => {},
    [handleGetComments.fulfilled]: (state, action) => {
      state.value.comments = action.payload;
    },
    [handleGetComments.rejected]: (state) => {},

    [handleAddComment.pending]: (state) => {
      state.value.loadingAddComment = true;
    },
    [handleAddComment.fulfilled]: (state, action) => {
      state.value.loadingAddComment = false;
    },
    [handleAddComment.rejected]: (state) => {
      state.value.loadingAddComment = false;
    },
  },
});

export const { handleModalComment, handleLoading, handleRenderPosts } =
  postSlice.actions;
export {
  handleAddPost,
  handleGetPosts,
  handleLike,
  handleGetComments,
  handleAddComment,
};
export default postSlice.reducer;
