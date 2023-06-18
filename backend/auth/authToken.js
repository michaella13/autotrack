require('dotenv').config()
const jwt=require('jsonwebtoken')

async function authenticateToken(req,res,next){
    const {headers}=await req
    const authHeader=headers.authorization;
    const token=authHeader && authHeader.split(' ')[1];

    if(token==null){
        return res.status(401).json({message:"Authentication required"})
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if (err) {
            res.redirect('/login');
            console.log("Invalid token", err)
            return res.status(403).json({ message: 'Invalid token' });
          }
          next();
    })
    
    
}
module.exports=authenticateToken
