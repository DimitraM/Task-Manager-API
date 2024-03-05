//endpoint
//create user, logging in and logging out

const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();


//create new user 
router.post('/users',async(req,res)=>{
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch(e){
        res.status(400).send(e);
    }
});
//https://hojaleaks.com/how-to-build-a-task-manager-api-with-nodejs#heading-requirements


//Login User

router.post('/users/login',async(req,res)=>{
    try{
    const user = await User.findCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user,token});
    } catch(e){
        res.status(400).send(e);
    }
});

//Logout user
router.post('user/logout',auth, async(req,res)=>{
    try{
        req.user.token = req.user.tokens.filter((token)=>{
            return token.token !==req.token;
        });
        await req.user.save();
        res.send();
    } catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;