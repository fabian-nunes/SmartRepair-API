const mongoose = require('mongoose');

RepairSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateStart: {
        type: Date,
        default: Date.now
    },
    dateEnd: Date,
    status: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Repair', RepairSchema);