const Item = require('../models/Item');

module.exports.index = async (req, res) => {
  try {
    const q = req.query.q || '';
    const filter = q ? { name: new RegExp(q, 'i') } : {};
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.render('items/index', { items, q });
  } catch (e) {
    req.flash('error', 'Error al obtener items');
    res.redirect('/');
  }
};

module.exports.newForm = (req, res) => {
  res.render('items/new');
};

module.exports.createItem = async (req, res) => {
  try {
    const { name, category, description, pricePerDay, stock } = req.body;
    const item = new Item({ name, category, description, pricePerDay: Number(pricePerDay), stock: Number(stock) });
    await item.save();
    req.flash('success', 'Item creado correctamente');
    res.redirect('/items');
  } catch (e) {
    req.flash('error', 'Error al crear item');
    res.redirect('/items');
  }
};

module.exports.editForm = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      req.flash('error', 'Item no encontrado');
      return res.redirect('/items');
    }
    res.render('items/edit', { item });
  } catch (e) {
    req.flash('error', 'Error');
    res.redirect('/items');
  }
};

module.exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, pricePerDay, stock } = req.body;
    await Item.findByIdAndUpdate(id, { name, category, description, pricePerDay: Number(pricePerDay), stock: Number(stock) });
    req.flash('success', 'Item actualizado');
    res.redirect('/items');
  } catch (e) {
    req.flash('error', 'Error al actualizar');
    res.redirect('/items');
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    req.flash('success', 'Item eliminado');
    res.redirect('/items');
  } catch (e) {
    req.flash('error', 'Error al eliminar');
    res.redirect('/items');
  }
};