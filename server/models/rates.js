const mongoose = require('mongoose');

const ratesSchema = mongoose.Schema({
    complete: { type: Boolean, required: true },
    volume: { type: Number, required: true },
    time: { type: String, required: true },
    bid: { type: Object, required: true }
})

module.exports = mongoose.model('Rates', ratesSchema);