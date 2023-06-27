import express from 'express';
const router = require('express').Router()
import UserController from "../controllers/UserController"

router.post('/register' , UserController.userRegister)

router.post('/login' , UserController.userLogin)

router.post('/update' , UserController.userUpdate)

router.post('/updatePassword' , UserController.userUpdatePassword)

router.post('/delete' , UserController.userDelete)

router.post('/checkUser' , UserController.checkUser)

module.exports = router;