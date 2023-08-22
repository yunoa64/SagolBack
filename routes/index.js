const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.status(201).send("test1");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;