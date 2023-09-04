import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String, 
    },
    email:{
        type:String,
        required:true
    },
    solvedquestion:{
        type:Array,
        default:[]
    },
    submissions:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
},{ timestamps: true});

const User=mongoose.model('user',UserSchema);

export default User