const { propertyDetails } = require('../modals/basicDetailsModal');
const { questionAnswerSchema } = require('../modals/questionsModal')
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
    const data = await propertyDetails.find({});
    const formattedData = data.map(item => {
        const {...itemWithoutId } = item.toObject();
        return itemWithoutId;
    });
    res.status(201).json({ message: 'Data Get successfully', data:formattedData });
}
const postAns = async (req, res) => {
  const data = await questionAnswerSchema.insertMany(req.body)
  res.status(201).json({ message: 'Data Saved successfully', data });

}

module.exports = {
  basicDetails: tryCatchMiddleWare(propertySaved),
  ServicePostAns: tryCatchMiddleWare(postAns),
  getPropertyList:tryCatchMiddleWare(getPropertyList)
}