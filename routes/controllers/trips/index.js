const express = require('express');
const tripController = require('./trips');

const router = express.Router();

router.post('/', tripController.createTrip)
router.get('/', tripController.getTrips)
// router.get('/:id', tripController.gettripById)
// router.put('/:id', tripController.updatetripById)
// router.delete('/:id', tripController.deletetripById)

module.exports = router;