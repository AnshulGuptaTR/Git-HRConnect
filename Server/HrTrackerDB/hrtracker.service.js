const db = require('../_helpers/db');

module.exports = {
  sendTracker
};

async function sendTracker(params) {
  const tracker = new db.tracker(params);
  console.log(tracker.count);

    await tracker.save();
}