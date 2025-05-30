// const express = require('express');
// const cors = require('cors');

// // Simulasi 2 Server (Cabang 1 dan 2)
// const app1 = express();
// const app2 = express();
// app1.use(cors());
// app2.use(cors());
// app1.use(express.json());
// app2.use(express.json());

// // Database Sederhana (In-Memory)
// const db1 = { reservations: [] };
// const db2 = { reservations: [] };

// // API Endpoint untuk Cabang 1 (Port 3001)
// app1.get('/reservations', (req, res) => {
//   res.json(db1.reservations);
// });

// app1.post('/reservations', (req, res) => {
//   db1.reservations.push(req.body);
//   res.json({ success: true });
// });

// // API Endpoint untuk Cabang 2 (Port 3002)
// app2.get('/reservations', (req, res) => {
//   res.json(db2.reservations);
// });

// app2.post('/reservations', (req, res) => {
//   db2.reservations.push(req.body);
//   res.json({ success: true });
// });

// // Jalankan 2 Server
// app1.listen(3001, () => console.log('Cabang 1 running on port 3001'));
// app2.listen(3002, () => console.log('Cabang 2 running on port 3002')); 



// ========================================

const express = require('express');
const cors = require('cors');

// Simulasi 2 Server (Cabang 1 dan 2)
const app1 = express();
const app2 = express();
app1.use(cors());
app2.use(cors());
app1.use(express.json());
app2.use(express.json());

// Database Sederhana (In-Memory)
const db = {
  cabang1: { reservations: [] },
  cabang2: { reservations: [] },
};

// API Endpoint untuk Cabang 1 (Port 3001)
app1.get('/reservations', (req, res) => {
  res.json(db.cabang1.reservations);
});

app1.post('/reservations', (req, res) => {
  db.cabang1.reservations.push(req.body);
  res.json({ success: true });
});

// API Endpoint untuk Cabang 2 (Port 3002)
app2.get('/reservations', (req, res) => {
  res.json(db.cabang2.reservations);
});

app2.post('/reservations', (req, res) => {
  db.cabang2.reservations.push(req.body);
  res.json({ success: true });
});

// Jalankan 2 Server
app1.listen(3001, () => console.log('Cabang 1 running on port 3001'));
app2.listen(3002, () => console.log('Cabang 2 running on port 3002'));
