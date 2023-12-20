const { Image } = require('../modals/imageModal')
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware')
const cloudinary = require('cloudinary').v2;




const uploadImage = async (req, res) => {
    // console.log('req', req);
    console.log('reqfiles', req.files);
    console.log('req.body.id', req.body.id)
    const file = req.files.image

    const options = {
        folder: 'HomeImage',
        unique_filename: false,
        use_filename: true,
    };
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("response", result.secure_url)

    const newImage = new Image({
        url: result.secure_url,
        fileName: result.original_filename,
        userId: req?.body?.userId,
        property_id: req?.body?.property_id
    });
    const postImage = new Image(newImage)
    const isertData = await postImage.save();

    res.status(201).json({ status: 201, message: 'Image uploaded successfully', imageUrl: result.secure_url, data: isertData });
}


module.exports = {
    imageUpload: tryCatchMiddleWare(uploadImage)
};

