import express from "express";
import submission from "../Models/Submission.js";
import filter from "../Middleware/getUser.js";

const router = express.Router();

router.post('/createsubmission', filter, async (req, res)=>{
    try{
        const { verdict, time, memory, question, iscorrect, language } = req.body;
        console.log(req.body);
        console.log(req.user.id);
        const r = await submission.create({verdict, time, memory, question, iscorrect, language, user:req.user.id});
        res.json({
            submission:r
        })
        console.log('bye'); 
    }catch(error){ 
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})

router.post('/:quesitonid', filter, async(req, res) =>{
    try{
        const r = await submission.find({question:req.params.quesitonid, user:req.user.id})
        res.json(r)
    }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

router.post('/api/getcorrect', filter, async(req, res)=>{
    try{
        console.log('hey')
        const r = await submission.find({ user:req.user.id,iscorrect:true})
        console.log(r)
        res.json(r)
    }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
} )

export default router