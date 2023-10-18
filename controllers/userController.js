
const models =require('../modals/modal')
const userRegister = models.userRegister
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Constant=require('../utilities/Constant')
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userId = uuidv4();
        const existingUser = await userRegister.findOne({ $or: [{ email }] });
        if (existingUser) {
             return res.status(400).json({status:400, error: 'Username or email already exists' });
        }

        const newUser = new userRegister({userId, name, email, password })
        console.log('newUser',newUser)
        // return;
        const insertUserData = await newUser.save()
        console.log('insertUserDatainsertUserData',insertUserData)
        delete insertUserData.password
        const token = jwt.sign({ userId: insertUserData.userId }, 'secret_key');
        res.status(201).json({ token, user: insertUserData });
        // res.status(201).send(insertUserData)
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {register};