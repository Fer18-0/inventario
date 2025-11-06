const Reservation = require('../models/Reservation');
const Item = require('../models/Item');

module.exports.index = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('item').sort({ createdAt: -1 });
    res.render('reservations/index', { reservations });
  } catch (e) {
    req.flash('error', 'Error al obtener reservaciones');
    res.redirect('/items');
  }
};

module.exports.newForm = async (req, res) => {
  try {
    const items = await Item.find({ stock: { $gt: 0 } });
    res.render('reservations/new', { items });
  } catch (e) {
    req.flash('error', 'Error');
    res.redirect('/reservations');
  }
};

module.exports.createReservation = async (req, res) => {
  try {
    const { itemId, customerName, dateFrom, dateTo, quantity } = req.body;
    // business logic: check stock and date validity
    const item = await Item.findById(itemId);
    if (!item) {
      req.flash('error', 'Ítem no encontrado');
      return res.redirect('/reservations/new');
    }
    const qty = Number(quantity);
    if (qty <= 0) {
      req.flash('error', 'Cantidad inválida');
      return res.redirect('/reservations/new');
    }
    if (qty > item.stock) {
      req.flash('error', `No hay suficiente stock. Disponible: ${item.stock}`);
      return res.redirect('/reservations/new');
    }
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    if (isNaN(from) || isNaN(to) || from > to) {
      req.flash('error', 'Fechas inválidas');
      return res.redirect('/reservations/new');
    }
    const reservation = new Reservation({
      item: item._id,
      customerName,
      dateFrom: from,
      dateTo: to,
      quantity: qty
    });
    await reservation.save();
    // reduce stock
    item.stock = item.stock - qty;
    await item.save();
    req.flash('success', 'Reservación creada');
    res.redirect('/reservations');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Error al crear reservación');
    res.redirect('/reservations/new');
  }
};

module.exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      req.flash('error', 'Reservación no encontrada');
      return res.redirect('/reservations');
    }
    // return stock
    const item = await Item.findById(reservation.item);
    if (item) {
      item.stock = item.stock + reservation.quantity;
      await item.save();
    }
    await Reservation.findByIdAndDelete(id);
    req.flash('success', 'Reservación eliminada y stock devuelto');
    res.redirect('/reservations');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Error al eliminar reservación');
    res.redirect('/reservations');
  }
};