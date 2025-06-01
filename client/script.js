// Toggle Dark/Light Mode
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  const icon = document.querySelector('#themeToggle i');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  document.getElementById('themeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
  localStorage.setItem('darkMode', isDark);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all nav links
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to clicked link
    this.classList.add('active');
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Set active nav link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Branch selection
let currentBranch = 1;
const branchButtons = document.querySelectorAll('.branch-btn');

branchButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    branchButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentBranch = parseInt(btn.dataset.branch);
  });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');
    const answer = question.nextElementSibling;
    
    if (question.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0';
    }
  });
});

// Form Validation and Submission
const reservationForm = document.getElementById('reservationForm');
const reservationSummary = document.getElementById('reservationSummary');
const statusNotification = document.getElementById('statusNotification');

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const people = document.getElementById('people').value;
  const table = document.getElementById('table').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Show summary
  document.getElementById('summaryName').textContent = name;
  document.getElementById('summaryPhone').textContent = phone;
  document.getElementById('summaryPeople').textContent = people;
  document.getElementById('summaryTable').textContent = table;
  document.getElementById('summaryDate').textContent = formattedDate;
  document.getElementById('summaryTime').textContent = time;
  
  reservationForm.style.display = 'none';
  reservationSummary.style.display = 'block';
  
  // Scroll to summary
  reservationSummary.scrollIntoView({ behavior: 'smooth' });
});

// Confirm Reservation
document.getElementById('confirmReservation').addEventListener('click', () => {
  // Simulate API call
  const isSuccess = Math.random() > 0.2; // 80% success rate for demo
  
  showStatusNotification(
    isSuccess ? 'success' : 'error',
    isSuccess ? 'Reservasi Berhasil!' : 'Reservasi Gagal',
    isSuccess ? 'Terima kasih! Reservasi Anda berhasil. Admin akan segera menghubungi Anda via WhatsApp untuk konfirmasi.' : 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.'
  );
  
  // Reset form if success
  if (isSuccess) {
    reservationForm.reset();
    reservationSummary.style.display = 'none';
    reservationForm.style.display = 'block';
  }
});

// Edit Reservation
document.getElementById('editReservation').addEventListener('click', () => {
  reservationSummary.style.display = 'none';
  reservationForm.style.display = 'block';
  reservationForm.scrollIntoView({ behavior: 'smooth' });
});

// Close Notification
document.getElementById('closeNotification').addEventListener('click', () => {
  statusNotification.style.display = 'none';
});

// Show Status Notification
function showStatusNotification(type, title, message) {
  const icon = document.getElementById('statusIcon');
  const statusTitle = document.getElementById('statusTitle');
  const statusMessage = document.getElementById('statusMessage');
  
  statusNotification.className = `status-notification ${type}`;
  icon.className = `fas ${
    type === 'success' ? 'fa-check-circle' : 
    type === 'waiting' ? 'fa-hourglass-half' : 'fa-times-circle'
  }`;
  statusTitle.textContent = title;
  statusMessage.textContent = message;
  
  statusNotification.style.display = 'flex';
}

// Initialize date picker with min date as today
const dateInput = document.getElementById('date');
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const minDate = `${yyyy}-${mm}-${dd}`;
dateInput.setAttribute('min', minDate);

// Load sample reservations (for demo)
function loadReservations() {
  // In a real app, this would fetch from your API
  console.log(`Loading reservations for branch ${currentBranch}`);
}

// Initialize
loadReservations();