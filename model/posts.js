import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
    userId :{
        type:objectId
    },
    image:{
        type:String
    },
    tweet :{
        type:String
    },
    comment:[],
    like:[]
});

export default model.posts || model("posts", postSchema);
