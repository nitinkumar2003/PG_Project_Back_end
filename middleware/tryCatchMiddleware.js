const tryCatchMiddleWare = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.log('Error:', error);
          return  res.status(500).json({ message: 'Internal server error' });
        }
    };
};

module.exports = tryCatchMiddleWare;
