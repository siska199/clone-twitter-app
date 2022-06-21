import { Schema, model, models, SchemaTypes } from "mongoose";
import users from "./users";
const likeSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: users,
    required: true,
  },
  like: {
    type: Boolean,
    required: true,
  },
});
const commentSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: users,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const postSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: users,
    required: true,
  },
  image: {
    type: String,
  },
  tweet: {
    type: String,
    required: true,
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
