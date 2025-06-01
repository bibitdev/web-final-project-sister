const express = require('express');
const cors = require('cors');

// Inisialisasi server untuk Cabang 1
const appBranch1 = express();
const PORT1 = 3001;

// Inisialisasi server untuk Cabang 2
const appBranch2 = express();
const PORT2 = 3002;

// Middleware untuk kedua cabang
appBranch1.use(cors());
appBranch1.use(express.json());

appBranch2.use(cors());
appBranch2.use(express.json());

// Simpan data reservasi sementara (dalam produksi gunakan database)
const reservations = {
  branch1: [],
  branch2: []
};

// Endpoint untuk Cabang 1
appBranch1.post('/reservations', (req, res) => {
  try {
    const reservation = {
      ...req.body,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    reservations.branch1.push(reservation);
    console.log('Reservasi Cabang 1:', reservation);

    // Simulasikan delay proses
    setTimeout(() => {
      res.status(201).json({
        status: 'success',
        message: 'Reservasi berhasil dicatat',
        data: reservation
      });
    }, 1000);
  } catch (error) {
    console.error('Error Cabang 1:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server'
    });
  }
});

appBranch1.get('/reservations', (req, res) => {
  res.json({
    status: 'success',
    data: reservations.branch1
  });
});

// Endpoint untuk Cabang 2
appBranch2.post('/reservations', (req, res) => {
  try {
    const reservation = {
      ...req.body,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    reservations.branch2.push(reservation);
    console.log('Reservasi Cabang 2:', reservation);

    // Simulasikan delay proses
    setTimeout(() => {
      res.status(201).json({
        status: 'success',
        message: 'Reservasi berhasil dicatat',
        data: reservation
      });
    }, 1000);
  } catch (error) {
    console.error('Error Cabang 2:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server'
    });
  }
});

appBranch2.get('/reservations', (req, res) => {
  res.json({
    status: 'success',
    data: reservations.branch2
  });
});

// Jalankan server untuk kedua cabang
appBranch1.listen(PORT1, () => {
  console.log(`Server Cabang 1 berjalan di http://localhost:${PORT1}`);
});

appBranch2.listen(PORT2, () => {
  console.log(`Server Cabang 2 berjalan di http://localhost:${PORT2}`);
});

// Endpoint root untuk testing
appBranch1.get('/', (req, res) => {
  res.send(`
    <h1>RESTO KUY - Cabang Pusat</h1>
    <p>Server berjalan dengan baik</p>
    <p>Endpoint API:</p>
    <ul>
      <li>POST /reservations - Untuk membuat reservasi</li>
      <li>GET /reservations - Untuk melihat daftar reservasi</li>
    </ul>
  `);
});

appBranch2.get('/', (req, res) => {
  res.send(`
    <h1>RESTO KUY - Cabang Timur</h1>
    <p>Server berjalan dengan baik</p>
    <p>Endpoint API:</p>
    <ul>
      <li>POST /reservations - Untuk membuat reservasi</li>
      <li>GET /reservations - Untuk melihat daftar reservasi</li>
    </ul>
  `);
});