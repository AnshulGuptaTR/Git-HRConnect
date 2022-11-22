const express = require('express');
const router = express.Router();
const updateNHService = require('./updatenewhire.service');

// // routes
router.post('/', updateNHData);

module.exports = router;

function updateNHData(req, res, next) {
    // console.log("req.body",req.body)
    updateNHService.sendUpdate(req.body)
    .then(() => res.json({ message: 'Updated successfully' }))
    .catch(next);
}