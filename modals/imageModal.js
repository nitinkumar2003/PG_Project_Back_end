const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    property_id: {
        type: String,
        required: true,
    },
});

const Image = mongoose.model('Image', imageSchema);

exports.Image = Image;