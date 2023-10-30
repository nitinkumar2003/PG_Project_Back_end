
const tryCatchMiddleWare = require('./tryCatchMiddleware')
const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ status: 401, message: 'Access denied. No token provided.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_VALUE);
    req.user = decoded;
    next();

};

module.exports = tryCatchMiddleWare(authVerify);
