import express from "express";
import { connectToMongo } from "./db.js";
import auth from './Routes/auth.js'
import cors from 'cors'
import articles from "./Routes/articles.js";
import question from "./Routes/Question.js";
import submission from "./Routes/Submission.js";
import discussion from './Routes/Discussion.js'



const PORT = process.env.PORT || 5000
const app = express();


app.use(cors())
app.use(express.json())


// Connecting mongoDB
connectToMongo()


app.use('/auth', auth)
app.use('/blog', articles)
app.use('/problem', question)
app.use('/submission', submission)
app.use('/discussion', discussion)

app.listen(PORT, ()=>{
    console.log(`server starting at port http://localhost:${PORT}`);
})