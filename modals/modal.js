const mongoose = require('mongoose')


const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userRegisterSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true,
        message: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        message: 'password is required'
    },
    isActive: {
        type: Boolean,
        default: false
    }
})
const userOtpSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    otp: {
        required: true,
        type: Number
    },
    createdAt: {
        type: Date,
        expires: 60,
        default: Date.now
    }

});

const userRegister = mongoose.model("userRegister", userRegisterSchema)
const userOtp = mongoose.model("userOtp", userOtpSchema)
exports.userRegister = userRegister
exports.userOtp = userOtp