const express = require('express');
const router = express.Router();
const prediksiController = require('../controllers/prediksiController');

router.post('/', prediksiController.buatPrediksi);
router.get('/:user_id', prediksiController.getPrediksiUser);

module.exports = router;