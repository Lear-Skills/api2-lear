import express from 'express';
//import User from '../models/UserModel';
const router = require('express').Router()
import UserController from "../controllers/UserController"


//router.post('/login' , UserController.userLogin)

router.post('/register' , UserController.userRegister)

router.post('/login' , UserController.userLogin)


module.exports = router;
