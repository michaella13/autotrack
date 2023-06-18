require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const auth=require('./routes/adminRoutes')
const vehicles=require('./routes/vehicleRoutes')
const owners=require('./routes/ownerRoutes')
const connection=require('./utils/db')
const {specs,swaggerUi}=require('./swagger')
const authenticateToken=require('./auth/authToken')

connection()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())



app.use('/',auth)
app.use('/api',authenticateToken,vehicles)
app.use('/owners',authenticateToken,owners)
app.use('/documentation',swaggerUi.serve,swaggerUi.setup(specs))




const port=process.env.PORT
app.listen(port,()=>console.log(`Listening on port ${port}`))