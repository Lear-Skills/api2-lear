import express from 'express';
import User from '../models/UserModel';
const router = express.Router();
const UserController = require('../controllers/UserController')


router.post('/login' , UserController.userLogin)

router.post('/register' , UserController.userRegister)