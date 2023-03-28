import express from 'express';
const router = require('express').Router()
import AdminController from "../controllers/AdminController"




router.post('/createGame' , AdminController.createGame)