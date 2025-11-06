const express = require('express');
const router = express.Router();
const reservations = require('../controllers/reservationsController');

router.get('/', reservations.index);
router.get('/new', reservations.newForm);
router.post('/', reservations.createReservation);
router.delete('/:id', reservations.deleteReservation);

module.exports = router;