const { Ticket } = require('../../../models/Ticket');
const { User } = require('../../../models/User')
const { Trip } = require('../../../models/Trip')
const { sendBookingTicketEmail } = require('../../../services/email/sendBookingTicket');

// create ticket = book ticket
// VD: ['A01', 'A02']
// {code: 'A01', isBooked: false}
module.exports.createTicket = (req, res, next) => {
  // totalPrice = price * so ghe
  const { tripId, seatCodes } = req.body;
  // const userId = req.user.id // token

  Trip
    .findById(tripId)
    .populate("fromStation")
    .populate("toStation")
    .then(trip => {
      if (!trip) return Promise.reject({ status: 404, message: "Trip not found" }) // validation

      const availableSeatCodes = trip.seats
        .filter(s => !s.isBooked)
        .map(s => s.code)

      let errorSeatCodes = []

      seatCodes.forEach(code => {
        if (availableSeatCodes.indexOf(code) === -1) errorSeatCodes.push(code);
      });

      if (errorSeatCodes.length > 0) return Promise.reject({
        status: 400,
        message: "Seats are not available",
        notAvailableSeats: errorSeatCodes
      })

      const newTicket = new Ticket({
        tripId,
        userId: "5db2ff5bcd87f91f44886205",
        seats: seatCodes.map(s => ({
          isBooked: true,
          code: s
        })),
        totalPrice: trip.price * seatCodes.length
      })

      trip.seats = trip.seats.map(s => {
        if (seatCodes.indexOf(s.code) > -1) {
          s.isBooked = true
        }
        return s;
      })

      return Promise.all([newTicket.save(), trip.save()])
    })
    .then(result => {
      sendBookingTicketEmail(result[0], result[1], req.user);
      res.status(200).json(result[0])
    }) // res[0] = ticket
    .catch(err => res.json(err))
}