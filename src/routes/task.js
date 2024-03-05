const express('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router =new express.Router();

//Create Task

router.post('/tasks',auth,async(req,res)=>{
    
});