const db = require('../config/db');

exports.tambahObat = (req, res) => {
  const { user_id, nama_obat, dosis, waktu_konsumsi, catatan } = req.body;

  const query = `
    INSERT INTO obat (user_id, nama_obat, dosis, waktu_konsumsi, catatan)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, nama_obat, dosis, waktu_konsumsi, catatan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Obat berhasil ditambahkan', obatId: result.insertId });
  });
};

exports.getObatByUser = (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT * FROM obat WHERE user_id = ?';

  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.hapusObat = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM obat WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Obat berhasil dihapus' });
  });
};
