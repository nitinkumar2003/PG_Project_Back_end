const { Image } = require('../modals/imageModal')
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware')
const cloudinary = require('cloudinary').v2;


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });
cloudinary.config({
    cloud_name: 'dpj8njp9v',
    api_key: '154211585583963',
    api_secret: 'lcoWrDyfThKQc6npiExMc0q6rKQ'
});

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
        userId: "55555",
        property_id: '555555'
    });
    const postImage = new Image(newImage)
    const isertData = await postImage.save();

    res.status(201).json({ status: 201, message: 'Image uploaded successfully', imageUrl: result.secure_url, data: isertData });
}


module.exports = {
    imageUpload: tryCatchMiddleWare(uploadImage)
};

