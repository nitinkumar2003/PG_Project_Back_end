const nodemailer = require('nodemailer');

const sendOTPByEmail = async (email,otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secureConnection: false,
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAI_GENERATE_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.JWT_SECRET_KEY_VALUE,
        to: email,
        subject: 'Otp',
        text: `your otp ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTPByEmail
