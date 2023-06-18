const swaggerJsdoc= require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')

const options={
    swaggerDefinition:{
        info:{
            title:'Auto Track APIs',
            version:'1.0.0',
            description:'AutoTracj api documentation using swagger'
        },
        servers:[
            {
                url:'http://localhost:5000',
                description:'development server'
            }
        ]
    },
    apis:['routes/*.js'],
}
const specs=swaggerJsdoc(options)
module.exports={specs,swaggerUi};