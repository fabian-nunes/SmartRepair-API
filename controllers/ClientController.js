const Client = require('../models/Client');

const ClientController = {
    all: async (req, res) => {
        try {
            const clients = await Client.find().populate('repairs');
            res.json(clients);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    find: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id);
            res.json(client);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    create: async (req, res) => {
        const client = new Client({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });

        try {
            const savedClient = await client.save();
            res.json(savedClient);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const deletedClient = await Client.remove({ _id: req.params.id });
            res.json(deletedClient);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            const updatedClient = await Client.updateOne({ _id: req.params.id }, { $set: req.body });
            res.json(updatedClient);
        } catch (err) {
            res.status(500).send(err);
        }
    },
}

module.exports = ClientController;