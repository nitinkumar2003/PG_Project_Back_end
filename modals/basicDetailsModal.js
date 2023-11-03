const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const caretakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
});

const propertySchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    propertyOwner: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    caretaker: {
        type: caretakerSchema,
        required: true
    }
});
const propertyDetails = mongoose.model('PropertyDetails', propertySchema);
exports.propertyDetails=propertyDetails
