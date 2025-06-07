const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { nama, umur, gender, email, no_telepon, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (nama, umur, gender, email, no_telepon, password) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nama, umur, gender, email, no_telepon, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email sudah terdaftar' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User berhasil terdaftar' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    res.json({ message: 'Login berhasil', user: { id: user.id, nama: user.nama, email: user.email } });
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, nama, umur, gender, email, no_telepon FROM users WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nama, umur, gender, email, no_telepon } = req.body;
  const query = `
    UPDATE users SET nama = ?, umur = ?, gender = ?, email = ?, no_telepon = ?
    WHERE id = ?
  `;

  db.query(query, [nama, umur, gender, email, no_telepon, id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email sudah digunakan user lain' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Profil berhasil diperbarui' });
  });
};