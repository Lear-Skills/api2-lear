import express from 'express';
const router = express.Router();
const UserController = require('../controllers/UserController')

router.get('/' , UserController.showHome);

router.get('/login' , UserController.userLogin)