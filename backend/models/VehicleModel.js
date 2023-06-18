const mongoose=require('mongoose')
// const owner=require('../models/OwnerModel')
const vehicleSchema=mongoose.Schema({
    chasisNumber:{
        type:Number,
        required:true
    },
    manufacturerCompany:{
        type:String,
        required:true,
    },
    manufacturerYear:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    plateNumber:{
        type:String,
        required:true,
        unique:true
    },
    modelName:{
        type:String,
        required:true,
    },
    ownerId:{
        type:String,
        required:true
    }
})
const Vehicle=mongoose.model("Vehicle", vehicleSchema)
module.exports=Vehicle

