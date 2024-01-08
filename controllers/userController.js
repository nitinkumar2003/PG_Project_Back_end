const models = require('../modals/modal');
const userRegister = models.userRegister;
const userOtp = models.userOtp
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Constant = require('../utilities/Constant');
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware');
const sendOTPByEmail = require('../utilities/sentOtp')


const register = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = uuidv4();
    const existingUser = await userRegister.findOne({ $or: [{ email }] });
    if (existingUser) {
        return res.status(400).json({ status: 400, error: 'Username or email already exists' });
    }

    const newUser = new userRegister({ userId, name, email, password });
    console.log('newUser', newUser);
    const insertUserData = await newUser.save();
    console.log('insertUserDatainsertUserData', insertUserData);
    delete insertUserData.password;
    const token = jwt.sign({ userId: insertUserData.userId }, 'secret_key');
    res.status(200).json({ status: 200, message: 'Account Created Successfully.', user: insertUserData });
};

const login = async (req, res) => {
    const { email, password } = req.body
    console.log('emailemail', email, password)
    let user = await userRegister.findOne({ email }, { _id: 0, __v: 0 });
    if (!user) return res.status(400).json({ status: 400, error: 'Invalid credentials' });
    if(user.isActive==false) return  res.status(400).json({ status: 400, error: 'Activate your account' });
    if (password !== user.password) return res.status(400).json({ status: 400, error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY_VALUE, { expiresIn: '1h' });
    
    let newuser = user.toObject()
    delete newuser.password
    res.status(200).json({ status: 200, token, user: newuser });
}

const forgotPassword = async (req, res) => {
    const { email, password } = req.body
    if (!email) return res.status(400).json({ status: 400, error: 'Please provide an email address.' });
    await userRegister.updateOne({ email }, { password });
    res.status(200).json({ status: 200, message: `Password updated successfully.`, email: email });
}

module.exports = {
    register: tryCatchMiddleWare(register),
    login: tryCatchMiddleWare(login),
    forgotPassword: tryCatchMiddleWare(forgotPassword)
}
