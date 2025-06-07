const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');

router.post('/', obatController.tambahObat);
router.get('/:user_id', obatController.getObatByUser);
router.delete('/:id', obatController.hapusObat);

module.exports = router;
