const express = require('express');
const router = express.Router();
const getService = require('./getData.service');

// // routes
router.post('/', getById);

module.exports = router;

function getById(req, res, next) {
    console.log(req.body.username);
    getService.getById(req.body.username)
    .then(track => track ? res.json(track) : res.sendStatus(404))
        .catch(next);
}