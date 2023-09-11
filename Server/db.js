import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectToMongo = async ()=>{
    // const mongoURI="mongodb://127.0.0.1:27017/leetcode"
    const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hzsmvjc.mongodb.net/?retryWrites=true&w=majority`
    try {
        mongoose.connect(mongoURI).then(()=>{
            console.log("Connection Sucessfully");
        })
    } catch (error){
        console.log("Error while Connecting");
    }
}


