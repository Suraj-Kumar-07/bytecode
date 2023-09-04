import express from 'express'
import disscussion from '../Models/Discussion.js'
import filter from '../Middleware/getUser.js'

const router = express.Router();

router.post('/creatediscussion', filter, async (req, res)=>{
    try{
        const { content,name, question } = req.body;
        const r = await disscussion.create({content, name, question, user:req.user.id});
        res.json({
            discussion:r
        })
        console.log('bye');
    }catch(error){ 
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})

router.get('/:questionid', async(req, res)=>{
    try{
        const r = await disscussion.find({question:req.params.questionid});
        res.json(r)
    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

export default router