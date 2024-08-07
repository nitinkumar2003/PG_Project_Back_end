const { propertyDetails } = require('../modals/basicDetailsModal');
const { questionAnswerSchema } = require('../modals/questionsModal')
const { Image } = require('../modals/imageModal')
const { address } = require('../modals/addressModal')
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware');
const propertySaved = async (req, res) => {
  const newProperty = new propertyDetails(req.body);
  const insertData = await newProperty.save();
  if (!insertData) {
    res.status(500).json({ message: "Error in saving data to database" })
  } else {
    res.status(200).json({ status: 200, message: 'Dava Saved Successfully', data: insertData })
  }

}

const getPropertyList = async (req, res) => {
  const propertyData = await propertyDetails.find({});
  const addressData = await address.find({});
  const imagesData = await Image.find({});

  let formattedData = propertyData.map(item => {
    const { ...itemWithoutId } = item.toObject();
    return itemWithoutId;
  });

  let data = formattedData;
  if (addressData || imagesData) {
    data = formattedData.map((item) => {
      const findAddress = addressData.find((i) => i.property_id == item._id);
      const findImage = imagesData.find((i) => i.property_id == item._id);
      return {
        ...item,
        "address": findAddress || null,
        "image": findImage || 'Image not found'
      };
    });

  }

  res.status(201).json({ message: 'Data Get successfully', data: data });
}
const postAns = async (req, res) => {
  const data = await questionAnswerSchema.insertMany(req.body)
  res.status(201).json({ message: 'Data Saved successfully', data });

}

module.exports = {
  basicDetails: tryCatchMiddleWare(propertySaved),
  ServicePostAns: tryCatchMiddleWare(postAns),
  getPropertyList: tryCatchMiddleWare(getPropertyList)
}