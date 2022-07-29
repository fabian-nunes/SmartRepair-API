const express = require('express');
const router = express.Router();
const Repair = require('../models/Repair');

//Get all repairs
router.get('/', async (req, res) => {
    try {
        const repairs = await Repair.find();
        res.json(repairs);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Get repair by id
router.get('/:id', async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.id);
        res.json(repair);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Create a new repair
router.post('/', async (req, res) => {
    const repair = new Repair({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });

    try {
        const savedRepair = await repair.save();
        res.send(savedRepair);
    } catch (err) {
        res.status(500).send(err);
    }

});

//Delete a repair
router.delete('/:id', async (req, res) => {
    try {
        const deletedRepair = await Repair.remove({ _id: req.params.id });
        res.send(deletedRepair);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Update a repair
router.patch('/:id', async (req, res) => {
    try {
        const updatedRepair = await Repair.updateOne({ _id: req.params.id }, { $set: req.body });
        res.send(updatedRepair);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;