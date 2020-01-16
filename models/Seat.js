const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  code: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
  // isBooked = false --> ghe trong
  // isBooked = true --> ghe da booked
})
const Seat = mongoose.model('Seat', SeatSchema, 'Seat')

module.exports = {
  Seat, SeatSchema
}