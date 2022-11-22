const db = require('../_helpers/dbGrp');

module.exports = {
  sendGrpTracker
};

async function sendGrpTracker(params) {
  const grptracker = new db.hrbpdatasheet(params);
  console.log(grptracker.count);

    await grptracker.save();
}