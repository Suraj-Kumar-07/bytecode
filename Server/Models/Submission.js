import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const UserSubmission = new Schema({
    verdict:{
        type:String,
        required:true
    },
    iscorrect:{
        type:Boolean,
    },
    time:{
        type:String,
        default:0.00
    }, 
    language:{
        type:String,
        required:true
    },
    memory:{
        type:String,
        default:0.00
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

const submission=mongoose.model('submission',UserSubmission);

export default submission