import express from 'express';
const router = require('express').Router()
import UserController from "../controllers/UserController"

router.post('/register' , UserController.userRegister)

router.post('/login' , UserController.userLogin)

router.put('/update' , UserController.userUpdate)

router.put('/update/password' , UserController.userUpdatePassword)

router.delete('/delete' , UserController.userDelete)

router.post('/checkUser' , UserController.checkUser)

module.exports = router;