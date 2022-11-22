const db = require('../_helpers/dbGrp');

module.exports = {
    sendUpdate,
};

async function sendUpdate(params) {
    let name = params.username;
    
    db.hrbpdatasheet.findOne({username: name}, (err, foundObject) =>{
        if (err) {
            console.log(err);
            throw err
        } else {
            if (!foundObject) {
                console.log("No Value present"); 
            } else {
                if (params.group) {
                    foundObject.group = params.group;
                    foundObject.targetachieved = params.targetachieved;
                }
                foundObject.save();
            }
        }
    });
}