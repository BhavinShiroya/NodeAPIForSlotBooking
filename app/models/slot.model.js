const mongoose = require('mongoose');

const SlotSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    mobile: String,
    sloat_time: String,
    isBook: Boolean
}, {
        timestamps: true
});

module.exports = mongoose.model('Slot', SlotSchema);