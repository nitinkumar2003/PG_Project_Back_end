const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const _writeConcern = require('../utilities/utilities')

const caretakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    mobile: {
        type: String, // Assuming mobile is a string
        trim: true,
    }
},_writeConcern);

const propertyType = new Schema({
    homeType: [{
        value: String,
        label: String
    }],
    livinType: [{
        value: String,
        label: String
    }],
    shareType: [{
        value: String,
        label: String
    }],
    priceType: [{
        value: String,
        label: String
    }]
},_writeConcern);
const propertySchema = new Schema({
    
    userId: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    propertyOwner: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true
        }
    },
    caretaker: {
        type: caretakerSchema,
        required: true
    },
    propertyType: {
        type: propertyType
    }
},_writeConcern);


const propertyDetail = mongoose.model('propertyDetails', propertySchema);
exports.propertyDetails = propertyDetail
