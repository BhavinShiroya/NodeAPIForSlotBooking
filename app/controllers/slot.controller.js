const Slot = require('../models/slot.model.js');

// Create and Save a new Slot
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
        return res.status(400).send({
            message: "first name can not be empty"
        });
    }
    // Validate request
    if (!req.body.last_name) {
        return res.status(400).send({
            message: "last name can not be empty"
        });
    }
    // Validate request
    if (!req.body.mobile) {
        return res.status(400).send({
            message: "mobile can not be empty"
        });
    }

    // Create a Slot
    const slot = new Slot({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        sloat_time: req.body.sloat_time,
        isBook: req.body.isBook
    });

    // Save Slot in the database
    slot.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Slot."
        });
    });
};

// Retrieve and return all Sloats from the database.
exports.findAll = (req, res) => {
    Slot.find().then(slots => {
        res.send(slots);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving slots."
        });
    });
};

// Find a single sloat with a sloatId
exports.findOne = (req, res) => {
    Slot.findById(req.params.slotId)
        .then(slot => {
            if (!slot) {
                return res.status(404).send({
                    message: "Slot not found with id " + req.params.slotId
                });
            }
            res.send(slot);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Slot not found with id " + req.params.slotId
                });
            }
            return res.status(500).send({
                message: "Error retrieving slot with id " + req.params.slotId
            });
        });
};

// Update a sloat identified by the slotId in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
        return res.status(400).send({
            message: "first name can not be empty"
        });
    }
    // Validate request
    if (!req.body.last_name) {
        return res.status(400).send({
            message: "last name can not be empty"
        });
    }
    // Validate request
    if (!req.body.mobile) {
        return res.status(400).send({
            message: "mobile can not be empty"
        });
    }

    // Find slot and update it with the request body
    Slot.findByIdAndUpdate(req.params.slotId, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        sloat_time: req.body.sloat_time,
        isBook: req.body.isBook
    }, { new: true })
        .then(slot => {
            if (!slot) {
                return res.status(404).send({
                    message: "Slot not found with id " + req.params.slotId
                });
            }
            res.send(slot);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Slot not found with id " + req.params.slotId
                });
            }
            return res.status(500).send({
                message: "Error updating slot with id " + req.params.slotId
            });
        });
};

// Delete a slot with the specified slotId in the request
exports.delete = (req, res) => {
    Slot.findByIdAndRemove(req.params.slotId)
        .then(slot => {
            if (!slot) {
                return res.status(404).send({
                    message: "Slot not found with id " + req.params.slotId
                });
            }
            res.send({ message: "Slot deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Slot not found with id " + req.params.slotId
                });
            }
            return res.status(500).send({
                message: "Could not delete slot with id " + req.params.slotId
            });
        });

};

exports.deleteAll = (req, res) => {
    Slot.collection.drop();
    return res.status(200).send({
        message: "All Data Deleted.."
    });
}