const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const ClientController = require('../controllers/ClientController');

//Get all repairs
router.get('/', ClientController.all);

//Get repair by id
router.get('/:id', ClientController.find);

//Create a new repair
router.post('/', ClientController.create);

//Delete a repair
router.delete('/:id', ClientController.delete);

//Update a repair
router.patch('/:id', ClientController.update);

module.exports = router;