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
    getByStatus: async (req, res) => {
        try {
            const repairs = await Repair.find({ status: req.params.status }).populate('client');
            res.json(repairs);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    create: async (req, res) => {
        try {
            const client = await Client.findById(req.body.client);
            if (client == null) {
                res.statusMessage = "Client not found";
                res.status(404).send();
            } else {
                if (req.body.name == null || req.body.name === "") {
                    res.statusMessage = "Name is required";
                    res.status(400).send();
                } else {
                    if (req.body.price == null || req.body.price === "") {
                        res.statusMessage = "Price is required";
                        res.status(400).send();
                    } else {
                        if (typeof req.body.price !== "string") {
                            res.statusMessage = "Price must be a number";
                            res.status(400).send();
                        } else {
                            if (!isNaN(req.body.price) && !isNaN(parseFloat(req.body.price))) {
                                const repair = new Repair({
                                    name: req.body.name,
                                    description: req.body.description,
                                    price: req.body.price,
                                    client: req.body.client,
                                });

                                const savedRepair = await repair.save();
                                client.repairs.push(savedRepair._id);
                                client.save();
                                res.json(savedRepair);
                            } else {
                                res.statusMessage = "Price must be a number";
                                res.status(400).send();
                            }
                        }
                    }
                }
            }
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