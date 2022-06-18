import { Schema, model, models, SchemaTypes } from "mongoose";
import users from "./users";
const likeSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: users,
  },
  like: {
    type: Boolean,
  },
});
const commentSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: users,
  },
  comment: {
    type: String,
  },
});

const postSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: users,
  },
  image: {
    type: String,
  },
  tweet: {
    type: String,
  },
  comments: [commentSchema],
  likes: [likeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export default models.posts || model("posts", postSchema);
