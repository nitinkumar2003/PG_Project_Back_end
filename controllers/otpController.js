const models = require('../modals/modal')
const userOtp = models.userOtp
const userRegister = models.userRegister
const nodemailer = require('nodemailer')
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware');
const sendOTPByEmail=require('../utilities/sentOtp')

const create = async (req, res) => {
    const { email } = req.body
    if (!email)  return res.status(400).json({ status: 400, error: 'Please provide an email address.' });
    const user = await userRegister.findOne({ email })
    if (!user) return res.status(400).json({ status: 400, error: 'No account found with this email address.' });

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("otp",otp)
    await sendOTPByEmail(email,otp)
    const newUser = new userOtp({ email, otp })
    const insertOtpData = await newUser.save()
    res.status(200).json({ status: 200, message: `We've sent an OTP to ${email}. Please enter it below to verify.`, email: email });

}

const verify = async (req, res) => {
    const { email, otp } = req.body
    const otpRecord = await userOtp.findOne({ email, otp });
    if (otpRecord) {
        await userRegister.updateOne({ email }, { isActive: true });
        await userOtp.deleteOne({ email, otp });
        res.json({ status: 200, message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ status: 400, message: 'Invalid OTP' });
    }
}

module.exports = {
    create: tryCatchMiddleWare(create),
    verify: tryCatchMiddleWare(verify)
}