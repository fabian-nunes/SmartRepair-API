const express = require('express');
const router = express.Router();
const Repair = require('../models/Repair');
const RepairController = require('../controllers/RepairController');

//Get all repairs
router.get('/', RepairController.all);

//Get repair by id
router.get('/:id', RepairController.find);

router.get('/status/:status', RepairController.getByStatus);

//Create a new repair
router.post('/', RepairController.create);

//Delete a repair
router.delete('/:id', RepairController.delete);

//Update a repair
router.patch('/:id', RepairController.update);

module.exports = router;