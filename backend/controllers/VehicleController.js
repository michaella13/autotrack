
const Vehicle=require('../models/VehicleModel')

const createVehicle= async (req,res)=>{
    try{
        const {chasisNumber,manufacturerCompany,manufacturerYear,price,plateNumber,modelName,ownerId}=await req.body;
        const vehicleExists=await Vehicle.findOne({plateNumber})
        if(vehicleExists){
            return res.json({message:"Vehicle already exists"}).status(409)
        }
    const vehicle=new Vehicle({
        chasisNumber,
        manufacturerCompany,
        manufacturerYear,
        price,
        plateNumber,
        modelName,
        ownerId
    })
    vehicle.save()
    return res.status(201).json({message:"Vehicle created successfully"});
    }

    catch(err){
        res.json({err:"Error creating vehicle"}).status(500);
    }
    
}
const getVehicles=async(req,res)=>{
    try{
        const vehicles=await Vehicle.find();
        res.json(vehicles).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports={getVehicles,createVehicle}
