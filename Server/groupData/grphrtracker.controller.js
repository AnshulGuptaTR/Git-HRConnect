const express = require('express');
const router = express.Router();
const grptrackerService = require('./grphrtracker.service');


router.post('/', grptracker);

module.exports = router;

function grptracker(req, res, next) {
    grptrackerService.sendGrpTracker(req.body)
    .then(() => res.json({ message: 'Your data has been sent successfully' }))
    .catch(next);
}