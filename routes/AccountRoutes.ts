import express from 'express';
const router = require('express').Router()
import AccountController from "../controllers/AccountController"




router.post('/deposit' , AccountController.deposit)

router.post('/withdraw' , AccountController.withdraw)

router.post('/black_list' , AccountController.black_list)

router.post('/give_loan' , AccountController.give_loan)

router.post('/pay_loan' , AccountController.pay_loan)

router.post('/add_int_rate' , AccountController.add_int_rate)

router.post('/gold_invest' , AccountController.gold_invest)



module.exports = router;