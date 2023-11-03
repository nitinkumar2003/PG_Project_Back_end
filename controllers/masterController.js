const { homeType,livinType,shareType,priceType } = require('../modals/masterModal')
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware')

const homeGet = async (req, res) => {
    // const data1=await homeType.insertMany(req.body)
    const data = await homeType.find({}, { value: 1, label: 1, _id: 0 });
    res.status(201).json({ message: 'Data Get successfully', data });
}
const livingGet = async (req, res) => {
    // const data1=await livinType.insertMany(req.body)
    const data = await livinType.find({}, { value: 1, label: 1, _id: 0 });
    res.status(201).json({ message: 'Data Get successfully', data });
}
const shareGet = async (req, res) => {
    // const data1=await shareType.insertMany(req.body)
    const data = await shareType.find({}, { value: 1, label: 1, _id: 0 });
    res.status(201).json({ message: 'Data Get successfully', data });
}
const priceGet = async (req, res) => {
    // const data1=await priceType.insertMany(req.body)
    const data = await priceType.find({}, { value: 1, label: 1, _id: 0 });
    res.status(201).json({ message: 'Data Get successfully', data });
}

module.exports = {
    home: tryCatchMiddleWare(homeGet),
    living: tryCatchMiddleWare(livingGet),
    share: tryCatchMiddleWare(shareGet),
    price: tryCatchMiddleWare(priceGet),
}
