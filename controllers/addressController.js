const { address } = require('../modals/addressModal')
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware');

const postAddress = async (req, res) => {
    const newAddress = new address(req.body)
    const insertData = await newAddress.save()
    if (!insertData) {
        res.status(500).json({ message: "Error in saving data to database" })
    } else {
        res.status(200).json({ status: 200, message: 'Dava Saved Successfully', data: insertData })
    }
}

module.exports={
    postAddress : tryCatchMiddleWare(postAddress),
}