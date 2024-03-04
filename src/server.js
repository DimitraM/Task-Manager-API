require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

//Connect to mongo db
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindModify:false
}).then(()=>{
    console.log('Connected to MongoDB Successfully');
}).catch(error=>{
    console.log(error);
});

//Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.get('/',(req,res)=>{
    res.send('Task Manager API');
});

//Start the server
app.listen(port,()=>{
    console.log('Server running at https://localhost:${port}')
})