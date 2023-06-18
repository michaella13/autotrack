const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
      names:{
        type:String,
        required:true
      } ,  
      email:{
        type:String,
        required:true
      } , 
      phoneNumber:{
        type:Number,
        required:true
      } , 
      nationalID:{
        type:Number,
        required:true,
        unique:true
      } , 
      role:{
        type:String,
        default:'user',
        enum:['admin','user']

      },
      password:{
        type:String,
        required:true
      }
})
const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin;