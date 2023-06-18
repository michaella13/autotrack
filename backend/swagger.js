
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger.json'
const endpointsFiles = ['./routes/adminRoutes.js','./routes/ownerRoutes.js','./routes/vehicleRoutes.js']
const doc = {
    info: {
        version: "1.0.0",
        title: "AutoTrack",
        description: "Vehicle management system",
        contact: {
            name: "INEZA Ange Michaella",
            email: "michaellaineza13@gmail.com"
        }
    },
    host: "localhost:5000",
    schemes: ['http', 'https'],
    produces: ['application/json'],
    tags: [
        {
            "name": "USER OPERATIONS",
            "description": "User Operations"
        },
        {
            "name": "OWNER OPERATIONS",
            "description": "Owner Operations"
        },{
            "name": "VEHICLE OPERATIONS",
            "description": "Vehicle Operations"
        },
    ],
    definitions: {
        User:{
    
            "names":"Michaella",
            "email":"m@gmail.com",
            "phoneNumber":"078123454",
            "nationalID":"1234754363487373",
            "role":"admin",
            "password":"admin"
        },
        Owner:{
           "names":"Biziyaremye", 
           "nationalID":"1234754363487372", 
           "phoneNumber":"0780910224", 
           "address":"Kigali"
        },
        Vehicle:{
            "chasisNumber":"12345",
        "manufacturerCompany":"Toyota",
        "manufacturerYear":"2005",
        "price":"12",
        "plateNumber":"RAC234U",
        "modelName":"RAV4",
        "owner":"Biziyaremye"
        }
    }
}
swaggerAutogen(outputFile, endpointsFiles, doc)



// const swaggerJsdoc= require('swagger-jsdoc')
// const swaggerUi=require('swagger-ui-express')

// const options={
//     swaggerDefinition:{
//         info:{
//             title:'Auto Track APIs',
//             version:'1.0.0',
//             description:'AutoTrack api documentation using swagger'
//         },
//         servers:[
//             {
//                 url:'http://localhost:5000',
//                 description:'development server'
//             }
//         ]
//     },
//     apis:['routes/*.js'],
// }
// const specs=swaggerJsdoc(options)
// module.exports={specs,swaggerUi};