const express = require('express');
const router = express.Router();
const getService = require('./getData.service');

// // routes
router.post('/', getById);

module.exports = router;

function getById(req, res, next) {
    getService.getById(req.body.emp_id)
        .then(track => track ? res.json(track) : res.sendStatus(404))
        .catch(next);
}