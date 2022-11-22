const db = require('../_helpers/db');

module.exports = {
    sendUpdate,
};

async function sendUpdate(params) {
    let id = params.track_id;
    console.log("UpdateData"+id);
    db.tracker.findOne({empid: id}, (err, foundObject) =>{
        if (err) {
            console.log(err);
            throw err
        } else {
            if (!foundObject) {
                console.log("No Value present"); 
            } else {
                if (params.engagementType) {
                    foundObject.engagementType = params.engagementType;
                    foundObject.setMeetingData = params.setMeetingData;
                }
                foundObject.save();
            }
        }
    });
}