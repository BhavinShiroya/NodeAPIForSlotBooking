module.exports = (app) => {
    const slots = require('../controllers/slot.controller.js');

    // Create a new Slot
    app.post('/slots', slots.create);

    // Retrieve all Slots
    app.get('/slots', slots.findAll);

    // Retrieve a single Slot with slotId
    app.get('/slots/:slotId', slots.findOne);

    // Update a Slots with slotId
    app.put('/slots/:slotId', slots.update);

    // Delete a Slots with slotId
    app.delete('/slots/:slotId', slots.delete);

    app.get('/slots/clear/all', slots.deleteAll);
}