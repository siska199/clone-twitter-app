import { Schema, model, models, SchemaTypes } from "mongoose";

const likeSchema = new Schema({
  idUser: {
    type: SchemaTypes.ObjectId,
  },
  like: {
    type: Boolean,
  },
});
const commentSchema = new Schema({
  idUser: {
    type: SchemaTypes.ObjectId,
  },
  comment: {
    type: String,
  },
});

const postSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
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
    default: () => Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now,
  },
});
export default models.posts || model("posts", postSchema)

