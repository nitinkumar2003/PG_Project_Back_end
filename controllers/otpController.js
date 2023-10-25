
const models = require('../modals/modal')
const userOtp = models.userOtp
const userRegister = models.userRegister
const nodemailer = require('nodemailer')

const create = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({status:400, error: 'Please enter value email'});
       }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secureConnection: false,
            auth: {
                user: process.env.EMAIL_USER_NAME,
                pass: process.env.EMAI_GENERATE_PASSWORD
            }
        });
        const otp =  Math.floor(1000 + Math.random() * 9000);
        var mailOptions = {
            from: process.env.JWT_SECRET_KEY_VALUE,
            to: email,
            subject: 'Otp',
            text: `your otp ${otp}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('infoinfoinfoinfo', info)
        const newUser = new userOtp({ email, otp })
        const insertOtpData = await newUser.save()
        res.status(200).json({ status: 200, message: `We've sent an OTP to ${email}. Please enter it below to verify.`, email: email });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const verify = async (req, res) => {
    const { email, otp } = req.body
    try {
        const otpRecord = await userOtp.findOne({ email, otp });
        if (otpRecord) {
            await userRegister.updateOne({ email }, { isActive: true });
            await userOtp.deleteOne({ email, otp });
            res.json({ status: 200, message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ status: 400, message: 'Invalid OTP' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { create,verify }