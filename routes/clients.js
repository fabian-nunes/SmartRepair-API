const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

const verify = require('../routes/verifyToken');

//Get all repairs
router.get('/', verify, ClientController.all);

//Get repair by id
router.get('/:id', verify, ClientController.find);

//Create a new repair
router.post('/', verify, ClientController.create);

//Delete a repair
router.delete('/:id', verify, ClientController.delete);

//Update a repair
router.patch('/:id', verify, ClientController.update);

module.exports = router;