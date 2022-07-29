const Repair = require('../models/Repair');
const Client = require("../models/Client");

const RepairController = {
    all: async (req, res) => {
        try {
            const repairs = await Repair.find().populate('client');
            res.json(repairs);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    find: async (req, res) => {
        try {
            const repair = await Repair.findById(req.params.id);
            res.json(repair);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    create: async (req, res) => {
        const repair = new Repair({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            client: req.body.client,
        });

        try {
            const savedRepair = await repair.save();
            const client = await Client.findById(req.body.client);
            client.repairs.push(savedRepair._id);
            client.save();
            res.json(savedRepair);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const deletedRepair = await Repair.remove({ _id: req.params.id });
            res.json(deletedRepair);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            const updatedRepair = await Repair.updateOne({ _id: req.params.id }, { $set: req.body });
            res.json(updatedRepair);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = RepairController;