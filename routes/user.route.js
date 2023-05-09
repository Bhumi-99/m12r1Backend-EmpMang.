const express = require('express');
const userRouter = express.Router();
const UserModel  = require('../model/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//signup
userRouter.post("/signin", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        if (password === confirmPassword) {
            bcrypt.hash(password, 5, async (err, hash) => {
                const userSignin = new UserModel({ email, password: hash, confirmPassword: hash })
                await userSignin.save();
                res.status(200).send({ "msg": "registerion has been done" })
                console.log(hash)
            });
        } else {
            res.status(200).send({ "msg": 'Password & Confirm Password do not match' });
            return;
        }
    }
    catch (err) {
        res.status(400).send({ "msg": err })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        console.log(user,"from user route page")
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    res.status(500).send({"msg":err.message});
                    return
                }
                if (result) {
                    res.status(201).send( {
                            "msg": "Login Successfully !",
                            "token" :jwt.sign({"employeeUserId":user._id},"mock12")
                    })
                } else {
                    res.status(400).send({ "msg": "Wrong Credentials" })
                }
            })
        }
    } catch (error) {

    }
})


module.exports = userRouter;