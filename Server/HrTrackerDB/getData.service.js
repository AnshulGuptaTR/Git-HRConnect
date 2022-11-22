const db = require('../_helpers/db');

module.exports = {
    getById
};

async function getById(id) {
    console.log('id = ', id);
    const trackerData = await db.tracker.findOne({empid: id});
    if (!trackerData) throw 'Account not found';
    return trackerData;
}