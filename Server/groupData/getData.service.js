const db = require('../_helpers/dbGrp');

module.exports = {
    getById
};

async function getById(name) {
    console.log('id = ', name);
    const crawlData = await db.hrbpdatasheet.findOne({username: name});
    if (!crawlData) throw 'Account not found';
    return crawlData;
}