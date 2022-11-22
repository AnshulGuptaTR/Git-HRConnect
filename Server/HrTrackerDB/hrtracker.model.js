const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    empid:{ type: String, required: true },
    empname:{ type: String, required: true },
    grade:{ type: String, required: true },
    title:{ type: String, required: true },
    moric:{ type: String, required: true },
    dateofjoining:{ type: String, required: false },
    hrpartner:{ type: String, required: true },
    bu:{ type: String, required: true },
    gender:{ type: String, required: true },
    recentrating:{ type: String, required: true },
    manager: {type: String, required: true},
    engagementType:{ type: Array, required: true },
    feedbackComments:{ type: String, required: false },
    setMeetingData: { type: Array, required: false },
    newHireStatus: { type: Number, required: false },
});

module.exports = mongoose.model('tracker', schema);

// const schema = new Schema({
//     username:{ type: String, required: true },
//     userstatus:{ type: Number, required: false },
//     reportingtosuperuser:{ type: String, required: false },
//     superuserstatus:{ type: Number, required: false },
//     reportingtosupersuperuser:{ type: String, required: false },
//     supersuperuserstatus:{ type: Number, required: false },
//     admin:{ type: Number, required: false },
//     targetQ1:{ type: Number, required: false },
//     targetQ2:{ type: Number, required: false },
//     targetQ3:{ type: Number, required: false },
//     targetQ4: {type: Number, required: false},
//     achievedQ1:{ type: Number, required: false },
//     achievedQ2:{ type: Number, required: false },
//     achievedQ3: { type: Number, required: false },
//     achievedQ4: { type: Number, required: false },
//     oneonone: { type: Array, required: false },
//     group: { type: Array, required: false },
// });

// module.exports = mongoose.model('hrbpdatasheet', schema);