const express = require('express');
const expresss = require('express');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = expresss.Router();

router.get('/', auth, async (req, res) => {
    console.log(`Transactions route init`);
    try {
        const transaction = await Transaction.find({ user: req.user.id }).sort({
            date: -1
        });
        res.json(transaction);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

router.post(
    '/', 
    [auth, 
    check('lasttransaction', 'Please enter the spent amount').not().isEmpty()], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ message: `Cannot procees without entering lasttransaction amount` });
    }
    const { lasttransaction, comment } = req.body;
    try {
        const transaction = new Transaction({
            user: req.user.id,
            lasttransaction,
            comment
        });
        const completed = await transaction.save();
        res.json(completed);
    } catch(errors) {
        console.log(errors.message);
        return res.status(500),json({ message: `Server error` });
    }
});

module.exports = router;