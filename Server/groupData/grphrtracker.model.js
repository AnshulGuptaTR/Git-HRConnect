const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username:{ type: String, required: true },
    userstatus:{ type: Number, required: false },
    reportingtosuperuser:{ type: String, required: false },
    superuserstatus:{ type: Number, required: false },
    reportingtosupersuperuser:{ type: String, required: false },
    supersuperuserstatus:{ type: Number, required: false },
    admin:{ type: Number, required: false },
    targetachieved:{ type: Array, required: false },
    oneonone: { type: Array, required: false },
    group: { type: Array, required: false },
});

module.exports = mongoose.model('hrbpdatasheet', schema);