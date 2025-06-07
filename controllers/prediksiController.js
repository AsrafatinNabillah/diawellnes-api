const db = require('../config/db');

exports.buatPrediksi = (req, res) => {
  const { user_id, gender, umur, riwayat_merokok, bmi, hba1c_level, blood_glucose_level } = req.body;
  const sql = `INSERT INTO prediksi_diabetes (user_id, gender, umur, riwayat_merokok, bmi, hba1c_level, blood_glucose_level)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [user_id, gender, umur, riwayat_merokok, bmi, hba1c_level, blood_glucose_level], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Prediksi berhasil disimpan' });
  });
};

exports.getPrediksiUser = (req, res) => {
  const { user_id } = req.params;
  db.query('SELECT * FROM prediksi_diabetes WHERE user_id = ?', [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};