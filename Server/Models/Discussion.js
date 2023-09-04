import mongoose from "mongoose";
const { Schema } = mongoose;

const UserDisscussion = new Schema({
    content:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    question:{
        type :  mongoose.Schema.Types.ObjectId,
        ref:'question'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
},{ timestamps: true});

const disscussion=mongoose.model('disscussion',UserDisscussion);

export default disscussion