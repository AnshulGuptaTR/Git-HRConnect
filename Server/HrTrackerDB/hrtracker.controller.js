const express = require('express');
const router = express.Router();
const trackerService = require('./hrtracker.service');


router.post('/', tracker);

module.exports = router;

function tracker(req, res, next) {
    trackerService.sendTracker(req.body)
    .then(() => res.json({ message: 'Your data has been sent successfully' }))
    .catch(next);
}