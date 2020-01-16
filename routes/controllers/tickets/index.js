const express = require('express');
const ticketController = require('./tickets');
const { authenticate } = require('../../../middlewares/auth');

const router = express.Router();

router.post(
  '/booking',
  authenticate,
  ticketController.createTicket
)

module.exports = router;