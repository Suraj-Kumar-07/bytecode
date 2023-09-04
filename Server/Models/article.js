import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
    heading:{
        type:String, 
        required:true
    },
    author:{
        type:String,
        required:true
    },
    subheading:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{ timestamps: true});

const article=mongoose.model('article',articleSchema);

export default article