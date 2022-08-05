const mongoose = require('mongoose');

RepairSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: String,
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
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

module.exports = mongoose.model('Repair', RepairSchema);