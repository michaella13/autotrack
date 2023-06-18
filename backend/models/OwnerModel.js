const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    names:
    {
        type: String,
        required: true
    },
    nationalID:
    {
        type: Number,
        required: true
    },
    phoneNumber:
    {
        type: Number,
        required: true
    },
    address:
    {
        type: String,
        required: true
    }
});

// module.exports = ownerSchema;
const Owner=mongoose.model('Owner', ownerSchema)
module.exports=Owner