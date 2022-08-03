const Client = require('../models/Client');

const ClientController = {
    all: async (req, res) => {
        try {
            //console.log(await Client.findOne({email: 'binogamer12@gmail.com'}));
            const clients = await Client.find().populate('repairs');
           // console.log(clients[0].repairs.length);
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
        try {
            const email = await Client.findOne({email: req.body.email});

            if(email != null){
                res.statusMessage = "Email already exists associated with a client";
                res.status(409).send();
            } else {

                const phone = await Client.findOne({phone: req.body.phone});

                if(phone != null){
                    res.statusMessage = "Phone number already exists associated with a client";
                    res.status(409).send();
                } else {

                    if (isNaN(req.body.phone)) {
                        res.statusMessage = "Phone number must be a number";
                        res.status(400).send();
                    } else {
                        if (req.body.phone.length !== 9) {
                            res.statusMessage = "Phone number must be 9 digits";
                            res.status(400).send();
                        } else {
                            const client = new Client({
                                name: req.body.name,
                                phone: req.body.phone,
                                email: req.body.email,
                            });

                            const savedClient = await client.save();
                            res.json(savedClient);
                        }
                    }

                }

            }
        } catch (err) {
            res.statusMessage = "Error creating client";
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