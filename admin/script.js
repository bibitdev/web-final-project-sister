document.addEventListener('DOMContentLoaded', () => {
  const reservationsBody = document.getElementById('reservationsBody');
  const statusFilter = document.getElementById('statusFilter');
  const dateFilter = document.getElementById('dateFilter');

  function renderReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const selectedStatus = statusFilter.value;
    const selectedDate = dateFilter.value;

    reservationsBody.innerHTML = '';

    const filteredReservations = reservations.filter((rsv) => {
      const matchStatus = selectedStatus === 'all' || rsv.status === selectedStatus;
      const matchDate = !selectedDate || rsv.date === selectedDate;
      return matchStatus && matchDate;
    });

    if (filteredReservations.length === 0) {
      reservationsBody.innerHTML = '<tr><td colspan="8">Tidak ada reservasi yang sesuai.</td></tr>';
      return;
    }

    filteredReservations.forEach((rsv, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${rsv.name}</td>
        <td>${rsv.phone}</td>
        <td>${rsv.date}</td>
        <td>${rsv.time}</td>
        <td>${rsv.table}</td>
        <td><span class="status-badge status-${rsv.status}">${rsv.status}</span></td>
        <td>
          <button onclick="updateStatus(${rsv.id}, 'confirmed')">Konfirmasi</button>
          <button onclick="updateStatus(${rsv.id}, 'cancelled')">Batalkan</button>
        </td>
      `;
      reservationsBody.appendChild(row);
    });
  }

  // Fungsi untuk memperbarui status
  window.updateStatus = function(id, newStatus) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const index = reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      reservations[index].status = newStatus;
      localStorage.setItem('reservations', JSON.stringify(reservations));
      renderReservations();
    }
  };

  // Event listener untuk filter
  statusFilter.addEventListener('change', renderReservations);
  dateFilter.addEventListener('change', renderReservations);

  // Tampilkan data awal
  renderReservations();
});
