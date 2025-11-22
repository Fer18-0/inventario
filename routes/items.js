const express = require('express');
const router = express.Router();
const items = require('../controllers/itemsController');
const { protegerRuta, soloAdmin } = require('../middleware/auth');

// Ver items (todos los usuarios logueados)
router.get('/', protegerRuta, items.index);

// Crear item (solo admin)
router.get('/new', protegerRuta, soloAdmin, items.newForm);
router.post('/', protegerRuta, soloAdmin, items.createItem);

// Editar item (solo admin)
router.get('/:id/edit', protegerRuta, soloAdmin, items.editForm);
router.put('/:id', protegerRuta, soloAdmin, items.updateItem);

// Eliminar item (solo admin)
router.delete('/:id', protegerRuta, soloAdmin, items.deleteItem);

module.exports = router;
