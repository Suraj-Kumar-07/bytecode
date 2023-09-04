import express from "express";
import article from "../Models/article.js";
import filter from "../Middleware/getUser.js";

const router = express.Router();

router.post('/createblog', filter, async (req, res)=>{
    try{
        const { heading, subheading, content, author } = req.body;
        const art = await article.create({heading, subheading, content, author, user:req.user.id});
        res.json({
            blog:art
        })
        console.log('bye');
    }catch(error){ 
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})

router.get('/allblog', async(req, res)=>{
    try{
        const allBlogs = await article.find();
        res.json(allBlogs);
    }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

router.get('/:id', async(req, res) =>{
    try{
        const blog = await article.findById(req.params.id)
        res.json(blog)
    }catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

export default router