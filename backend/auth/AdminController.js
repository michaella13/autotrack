require('dotenv').config()

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Admin=require('../models/AdminModel')

const signup = async(req,res)=>{
    try{
         const {names,email, phoneNumber, nationalID,role,password}= await req.body;
    const existingAdmin=await Admin.findOne({nationalID});
    console.log(existingAdmin)

    if(existingAdmin){
        
        return res.json({message:"Admin already exists"})
    }
    else{
        console.log("Admin doesn't exist")
    }
    
    const hashedPassword= await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const admin=new Admin({
        names:names,
        email:email,
        phoneNumber:phoneNumber,
        nationalID:nationalID,
        role:role,
        password:hashedPassword,
        
    })
    
    
        await admin.save()
        return res.status(201).json({message:"Admin created successfully"})
    }
    catch(err){
        res.status(500).json(err);
    }
    
}
const login=async (req,res)=>{
    try{
        const {email, password}=req.body
        const admin=await Admin.findOne({email})
        
        if(!admin){
            return res.json({message:"Invalid credentials"})
        }
        const comparePassword=await bcrypt.compare(password,admin.password)
        if(!comparePassword){
            return res.json({ message: 'Invalid credentials' });
        }
        const token=jwt.sign({role:admin.role},process.env.JWT_SECRET_KEY,{
            expiresIn:'1h'
        })
        const role=admin.role;
        res.header('Authorization', `Bearer ${token}`).json({message:"Login Successful",token: `Bearer ${token}`}).status(200)
    }
    catch(err){
        res.status(500).json({err: 'An error occured'})
        
    }
}
module.exports={signup,login}
