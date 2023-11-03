const {propertyDetails} = require('../modals/basicDetailsModal');
const tryCatchMiddleWare = require('../middleware/tryCatchMiddleware');
const propertySaved=async(req,res)=>{
  const josnObj= {
        "name": "Property Name",
        "location": "Property Location",
        "propertyOwner": {
          "name": "Property Owner Name",
          "email": "owner@example.com"
        },
        "caretaker": {
          "name": "Caretaker Name",
          "email": "caretaker@example.com",
          "mobile": "1234567890"
        }
      }
      const newProperty=new propertyDetails(josnObj)
      const insertData=await newProperty.save()
      if(!insertData){
        res.status(500).json({message:"Error in saving data to database"})
      }else{
        res.status(200).json({status:200,message:'Dava Saved Successfully',data:insertData})
      }
      
}

module.exports={
    basicDetails:tryCatchMiddleWare(propertySaved)
}