const { Trip } = require('../../../models/Trip');
const { Seat } = require('../../../models/Seat');

const seatCodes = [
  'A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'A12',
  'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12'
]

module.exports.createTrip = (req, res, next) => {
  const { fromStation, toStation, startTime, price } = req.body;
  const newTrip = new Trip({
    fromStation, toStation, startTime, price
  })

  seatCodes.forEach(code => {
    const newSeat = new Seat({ code })
    newTrip.seats.push(newSeat)
  })

  newTrip.save()
    .then(trip => res.status(201).json(trip))
    .catch(err => res.status(500).json(err))
}

module.exports.getTrips = (req, res, next) => {
  Trip.find()
    .then(trips => res.status(200).json(trips))
    .catch(err => res.status(500).json(err))
}