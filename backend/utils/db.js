require('dotenv').config()

const mongoose=require('mongoose')

const connection=async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Connected to database...')
    }
    catch(err){
        console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with an error
    }
    
}
module.exports= connection