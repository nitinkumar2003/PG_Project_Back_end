const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    value: {
        type: Number,  // Change type to Number
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true,
        unique: true
    }
});

const homeType = mongoose.model('homeType', homeSchema);
const livinType = mongoose.model('livinType', homeSchema);
const shareType = mongoose.model('shareType', homeSchema);
const priceType = mongoose.model('priceType', homeSchema);

exports.homeType = homeType
exports.livinType = livinType
exports.shareType = shareType
exports.priceType = priceType