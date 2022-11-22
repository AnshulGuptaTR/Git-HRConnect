const express = require('express');
const router = express.Router();
const updateService = require('./adminUpdateTar.service');

// // routes
router.post('/', updateData);

module.exports = router;

function updateData(req, res, next) {
    // console.log("req.body",req.body)
    updateService.sendUpdate(req.body)
    .then(() => res.json({ message: 'Updated successfully' }))
    .catch(next);
}