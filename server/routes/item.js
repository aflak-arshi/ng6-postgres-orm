const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, ItemController.item_get_all_item);

router.post('/', checkAuth, ItemController.item_create_item);

router.put('/:itemId', checkAuth, ItemController.item_update_item);

router.delete('/:itemId', checkAuth, ItemController.item_delete_item);

module.exports = router;