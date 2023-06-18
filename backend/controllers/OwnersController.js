
const Owner=require('../models/OwnerModel')

const createOwner= async (req,res)=>{
    try{
        const {names, nationalID, phoneNumber, address}=await req.body;
        const ownerExists= await Owner.findOne({nationalID})
        console.log(ownerExists)
        
        if(ownerExists){
            return res.json({message:"Owner already exists"}).status(409)
        }
        console.log("ownerId"+nationalID)
    const owner=new Owner({
        names, 
        nationalID, 
        phoneNumber,
         address
    })
    owner.save()
    return res.status(201).json({message:"Owner created successfully"});
    }

    catch(err){
        res.json({err:"Error creating owner"}).status(500);
    }
    
}
const getOwners=async(req,res)=>{
    try{
        const owners=await Owner.find();
        res.json(owners).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}
const getOwnerById=async (req,res)=>{
    try{
        const {id}= req.params;
        const owner= await Owner.findById(id);
        res.json(owner).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports={getOwners,createOwner, getOwnerById}
