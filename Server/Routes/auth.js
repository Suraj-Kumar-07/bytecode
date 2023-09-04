import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import User from '../Models/auth.js'
import getUser from '../Middleware/getUser.js'

const JWT_SECRET = "ACHASAKUCHHONACHAHIYE"

const router = express.Router()

router.post('/createuser', async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ status: "user with this email already exists", mark: true })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
        })
        console.log(user);
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        res.json({ status: "User added to database", authToken: authToken })
    } catch (error) {
        console.log(error);
        res.send('Internal Server Error');
    }
})


router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ status: "Login With Corrrect Credentials" });
        }
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ status: "User loggedin", authToken: authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})


// Get the user information, used a middleware to verify the user(decrypt the authtoken)
router.post('/getuser', getUser, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id);
        if ( !user ){
            return res.status(404).send('User not found');
        }
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

export default router


