const db = require('../config/db');

exports.tambahGula = (req, res) => {
  const { user_id, tanggal, jam, kadar_gula, catatan } = req.body;

  const query = `
    INSERT INTO kadar_gula (user_id, tanggal, jam, kadar_gula, catatan)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, tanggal, jam, kadar_gula, catatan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Data kadar gula berhasil ditambahkan', id: result.insertId });
  });
};

exports.getGulaByUser = (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT * FROM kadar_gula WHERE user_id = ? ORDER BY tanggal DESC, jam DESC';

  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.hapusGula = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM kadar_gula WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Data kadar gula berhasil dihapus' });
  });
};
