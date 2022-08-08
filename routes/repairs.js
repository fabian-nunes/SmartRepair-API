const express = require('express');
const router = express.Router();
require('../models/Repair');
const RepairController = require('../controllers/RepairController');

const verify = require('../routes/verifyToken');

//Get all repairs
router.get('/', verify, RepairController.all);

//Get repair by id
router.get('/:id', verify, RepairController.find);

router.get('/status/:status', verify, RepairController.getByStatus);

//Create a new repair
router.post('/', verify, RepairController.create);

//Delete a repair
router.delete('/:id', verify, RepairController.delete);

//Update a repair
router.patch('/:id', verify, RepairController.update);

router.patch('/status/:id', verify, RepairController.updateStatus);

module.exports = router;