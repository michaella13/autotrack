const express = require('express');
const router = express.Router();

const VehicleController=require('../controllers/VehicleController')

router.post('/vehicle',VehicleController.createVehicle)
router.get('/vehicles',VehicleController.getVehicles)
module.exports=router