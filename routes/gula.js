const express = require('express');
const router = express.Router();
const gulaController = require('../controllers/gulaController');

router.post('/', gulaController.tambahGula);
router.get('/:user_id', gulaController.getGulaByUser);
router.delete('/:id', gulaController.hapusGula);

module.exports = router;
