const express=require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router =new express.Router();

//Create Task

router.post('/tasks',auth,async(req,res)=>{
    const task = new Task({
        title: req.title,
        description : req.description,
        completed: req.completed,
        dueDate : req.dueDate,
        owner: req.user._id
      });

      try {
        await task.save();
        res.status(201).send(task);
      } catch (e) {
        res.status(400).send(e);
      }
});

//Get all tasks
router.get('/taks',auth,async(req,res)=>{
    try{
        const tasks = await Task.find({owner:req.user._id});
        res.send(tasks);
    } catch(e){
        res.status(500).send(e);
    }
});

//get a task by id
router.get('/tasks/:id',auth, async(req,res)=>{
    const _id = req.params.id;

    try {
      const task = await Task.findOne({ _id, owner: req.user._id });

      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
});

// Update a task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

      if (!task) {
        return res.status(404).send();
      }

      updates.forEach((update) => task[update] = req.body[update]);
      await task.save();
      res.send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });

   // Delete a task by id
   router.delete('/tasks/:id', auth, async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  module.exports = router;