const nodemailer = require('nodemailer');
const fs = require('fs');
const hogan = require('hogan.js');

const template = fs.readFileSync('services/email/bookingTicketEmailTemplate.hjs', 'utf-8')
const compiledTemplate = hogan.compile(template);

const keys = require('../../config/index');

module.exports.sendBookingTicketEmail = (ticket, trip, user) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTSL: true,
    requireSSL: true,
    auth: {
      user: keys.email,
      pass: keys.password
    }
  }

  const transporter = nodemailer.createTransport(transport)
  const mailOptions = {
    from: keys.email,
    to: user.email,
    subject: 'Mail xac nhan mua ve thanh cong',
    html: compiledTemplate.render({
      email: user.email,
      fromStation: `${trip.fromStation.name}, ${trip.fromStation.province}`,
      toStation: `${trip.toStation.name}, ${trip.toStation.province}`,
      price: trip.price,
      amount: ticket.seats.length,
      seats: ticket.seats.map(e => e.code).toString(),
      total: ticket.seats.length * trip.price,
    })
  }

  transporter.sendMail(mailOptions, err => {
    //
    if (err) return console.log(err.message)
    console.log("success")
  })
}