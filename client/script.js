// Toggle Dark/Light Mode
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('themeToggle').textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Simulasi 2 Node (Cabang Restoran)
let currentBranch = 1;
const branchButtons = document.querySelectorAll('.branch-btn');

branchButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    branchButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentBranch = parseInt(btn.dataset.branch);
    loadReservations();
  });
});

// Load Reservasi dari Server
async function loadReservations() {
  const response = await fetch(`http://localhost:300${currentBranch}/reservations`);
  const reservations = await response.json();
  
  const list = document.getElementById('reservations');
  list.innerHTML = reservations.map(r => `
    <li>
      <strong>${r.name}</strong> - ${r.date} ${r.time}
    </li>
  `).join('');
}

// Submit Reservasi
document.getElementById('reservationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const reservation = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };
  
  await fetch(`http://localhost:300${currentBranch}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation)
  });
  
  loadReservations();
  e.target.reset();
});

// Init
loadReservations();