import mongoose from "mongoose";

const {Schema,model} = mongoose

const userSchema = new Schema({
    name : {
        type:String,
        required:true,
        max:50
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
    },
    role:{
        type : String,
        default: "user"
    },
    image :{
        type:String,
        required : true
    },
    banner:{
        type:String
    },
    biodata :{
        type:String,
        max:160
    },
    location:{
        type :String,
        max:30
    },
    website:{
        type : String,
        max:100
    },
    birthDate:{
        type:String
    },
    createdAt :{
        type : Date,
        default:Date.now
    },
    updatedAt :{
        type : Date,
        default:Date.now
    }
})

export default model.users || model.model("users",userSchema)