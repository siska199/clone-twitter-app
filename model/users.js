import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password:{
    type:String,
    
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
  },
  biodata: {
    type: String,
    max: 160,
  },
  location: {
    type: String,
    max: 30,
  },
  website: {
    type: String,
    max: 100,
  },
  birthDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now,
  },
});

export default models.users || model("users", userSchema);
