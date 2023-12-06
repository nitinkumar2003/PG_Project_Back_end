const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const addressSchema = new Schema({
    property_id:{
        type:String,
        required:true
    },
    addressLineOne: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    country:{
        type:Number,
    }
});

const addressDetails = mongoose.model('address', addressSchema)
exports.address = addressDetails
