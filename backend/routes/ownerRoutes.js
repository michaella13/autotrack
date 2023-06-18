const express = require('express');
const router = express.Router();


const OwnerController=require('../controllers/OwnersController')

router.post('/owner',OwnerController.createOwner)
router.get('/',OwnerController.getOwners)
router.get('/:id',OwnerController.getOwnerById)
module.exports=router