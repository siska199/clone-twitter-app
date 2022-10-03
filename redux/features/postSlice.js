import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    modalComment: false,
    loading: false,

    posts: [],
    hasMore: true,
    page: 1,

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
    const page = 1;
    const addPost = await fetch(`/api/posts?page=${page}`, {
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
      const addComment = await fetch(`/api/posts/${idPost}/comments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((r) => r.json());
      return addComment;
    } catch (error) {
      return error;
    }
  }
);
const handleGetPosts = createAsyncThunk(
  "posts/GetPosts",
  async (skip = true, { getState }) => {
    try {
      const page = getState().post.value.page;
      const posts = await fetch(`/api/posts?page=${page}&&skip=${skip}`).then(
        (data) => data.json()
      );
      console.log("posts: ", posts);
      return posts;
    } catch (error) {
      console.log("error :", error);
      return error;
    }
  }
);
const handleGetComments = createAsyncThunk(
  "/posts/getComments",
  async (idPost) => {
    try {
      const comments = await fetch(`/api/posts/${idPost}/comments`).then((r) =>
        r.json()
      );
      return comments;
    } catch (error) {
      return error;
    }
  }
);

const handleLike = createAsyncThunk("post/addRemoveLike", async (data) => {
  try {
    if (data.idLove) {
      await fetch(`/api/posts/${data.idPost}/loves/${data.idLove}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`/api/posts/${data.idPost}/loves`, {
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
    handleClearComments: (state, action) => {
      state.value.comments = [];
    },
    handleResetPosts: (state, action) => {
      state.value.posts = [];
      state.value.page = 1;
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
      state.value.posts =
        action.payload.page == 2
          ? action.payload.data
          : [...state.value.posts, ...action.payload.data];
      state.value.hasMore = action.payload.hasMore;
      state.value.page = action.payload.page;
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

export const {
  handleModalComment,
  handleLoading,
  handleRenderPosts,
  handleClearComments,
  handleResetPosts,
} = postSlice.actions;
export {
  handleAddPost,
  handleGetPosts,
  handleLike,
  handleGetComments,
  handleAddComment,
};
export default postSlice.reducer;
