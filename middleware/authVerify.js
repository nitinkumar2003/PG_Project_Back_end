
const tryCatchMiddleWare = require('./tryCatchMiddleware')
const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('tokentokentokentoken', token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    const validToken = token.split(' ')
    jwt.verify(validToken[1], process.env.JWT_SECRET_KEY_VALUE, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        req.user = decoded;
        next();
    });

};

module.exports = tryCatchMiddleWare(authVerify);
