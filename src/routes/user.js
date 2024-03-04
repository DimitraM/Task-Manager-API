//endpoint
//create user, logging in and logging out

const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

//https://hojaleaks.com/how-to-build-a-task-manager-api-with-nodejs#heading-requirements