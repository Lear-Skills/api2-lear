import express from 'express';
const router = require('express').Router()
import AccountController from "../controllers/AccountController"




router.post('/deposit' , AccountController.deposit)


module.exports = router;