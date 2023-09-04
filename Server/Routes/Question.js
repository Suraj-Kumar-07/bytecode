import express from "express";
import question from "../Models/Question.js";

const router = express.Router();

router.get('/allquestion', async(req, res)=>{
    try{
        const r = await question.find();
        res.json(r);
    }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})


router.get('/:id', async(req, res) =>{
    try{
        const que = await question.findById(req.params.id)
        res.json(que)
    }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

router.post('/createproblem', async (req, res)=>{
    try{
        const data = req.body;
        console.log(data);
        const q = await question.create(data);
        res.json({
            question: q
        })
        console.log('bye');
    }catch(error){ 
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})

export default router