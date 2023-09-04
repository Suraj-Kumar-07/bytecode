import mongoose, { trusted } from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
    title:{
        type:String, 
        required: true
    },
    content:{
        type:String,
        required: true
    },
    difficulty:{
        type:String,
        require:true
    },
    testcaseinput:{
        type:String, 
        require:true
    },
    testcaseoutput:{
        type:String,
        require:true
    },
    relatedtopics:{
        type:Array, 
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ timestamps: true});

const question=mongoose.model('question',questionSchema);

export default question