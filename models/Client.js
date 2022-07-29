const mongoose = require('mongoose');

ClientSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    repairs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repair'
    }],
});

module.exports = mongoose.model('Client', ClientSchema);