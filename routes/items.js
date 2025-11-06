const express = require('express');
const router = express.Router();
const items = require('../controllers/itemsController');

router.get('/', items.index);
router.get('/new', items.newForm);
router.post('/', items.createItem);
router.get('/:id/edit', items.editForm);
router.put('/:id', items.updateItem);
router.delete('/:id', items.deleteItem);

module.exports = router;