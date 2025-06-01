const express = require('express');
const cors = require('cors');
const path = require('path');

// Inisialisasi server untuk Cabang 1
const appBranch1 = express();
const PORT1 = 3001;

// Inisialisasi server untuk Cabang 2
const appBranch2 = express();
const PORT2 = 3002;

// Middleware untuk kedua cabang
appBranch1.use(cors());
appBranch1.use(express.json());
appBranch1.use(express.static(path.join(__dirname, 'client'))); // Serve client files
appBranch1.use('/admin', express.static(path.join(__dirname, 'admin'))); // Serve admin files

appBranch2.use(cors());
appBranch2.use(express.json());
appBranch2.use(express.static(path.join(__dirname, 'client'))); // Serve client files
appBranch2.use('/admin', express.static(path.join(__dirname, 'admin'))); // Serve admin files

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
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    reservations.branch1.push(reservation);
    console.log('Reservasi Cabang 1:', reservation);

    res.status(201).json({
      status: 'success',
      message: 'Reservasi berhasil dicatat',
      data: reservation
    });
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

// Endpoint untuk Admin Cabang 1
appBranch1.get('/admin/reservations', (req, res) => {
  res.json(reservations.branch1);
});

appBranch1.put('/admin/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const reservationIndex = reservations.branch1.findIndex(r => r.id == id);
  
  if (reservationIndex === -1) {
    return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
  }
  
  reservations.branch1[reservationIndex].status = status;
  
  res.json({
    status: 'success',
    data: reservations.branch1[reservationIndex]
  });
});

// Endpoint untuk Cabang 2
appBranch2.post('/reservations', (req, res) => {
  try {
    const reservation = {
      ...req.body,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    reservations.branch2.push(reservation);
    console.log('Reservasi Cabang 2:', reservation);

    res.status(201).json({
      status: 'success',
      message: 'Reservasi berhasil dicatat',
      data: reservation
    });
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

// Endpoint untuk Admin Cabang 2
appBranch2.get('/admin/reservations', (req, res) => {
  res.json(reservations.branch2);
});

appBranch2.put('/admin/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const reservationIndex = reservations.branch2.findIndex(r => r.id == id);
  
  if (reservationIndex === -1) {
    return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
  }
  
  reservations.branch2[reservationIndex].status = status;
  
  res.json({
    status: 'success',
    data: reservations.branch2[reservationIndex]
  });
});

// Jalankan server untuk kedua cabang
appBranch1.listen(PORT1, () => {
  console.log(`Server Cabang 1 berjalan di http://localhost:${PORT1}`);
});

appBranch2.listen(PORT2, () => {
  console.log(`Server Cabang 2 berjalan di http://localhost:${PORT2}`);
});