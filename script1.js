// ========== Scroll Reveal & Navbar Change ==========
window.addEventListener('scroll', () => {
  const reveals = document.querySelectorAll('.reveal');
  const hero = document.querySelector('.hero');
  const navbar = document.querySelector('.navbar');

  let scrollY = window.scrollY;

  // Hero gallery parallax & scroll effect
  if (hero && scrollY > 100) {
    hero.classList.add('scrolled');
  } else {
    hero.classList.remove('scrolled');
  }

  // Navbar blur when scrolling
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll reveal
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 100;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
});



// ========== Optional: Floating Particles ==========
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const particleContainer = document.createElement('div');
  particleContainer.classList.add('particles');
  for (let i = 0; i < 12; i++) {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + "%";
    span.style.top = Math.random() * 100 + "%";
    span.style.animationDelay = (Math.random() * 5) + "s";
    particleContainer.appendChild(span);
  }
  hero.appendChild(particleContainer);
});

// ======== SCROLL HORIZONTAL UNTUK BEBERAPA SECTION (versi aman) ========
(function () {
  const sections = ['Keahlian', 'Prestasi', 'Hobbi', 'bakat', 'Pendidikan'];

  function initScrollForSection(sectionId) {
    // ambil parent dulu (lebih aman)
    const parent = document.getElementById(sectionId);
    if (!parent) return;

    const grid = parent.querySelector('.card-grid');
    if (!grid) return;
    if (grid._scrollButtonsInitialized) return;

    // Buat tombol
    const leftBtn = document.createElement('button');
    const rightBtn = document.createElement('button');
    leftBtn.className = 'scroll-btn left';
    rightBtn.className = 'scroll-btn right';
    leftBtn.innerHTML = '&#10094;'; // ‹
    rightBtn.innerHTML = '&#10095;'; // ›

    parent.appendChild(leftBtn);
    parent.appendChild(rightBtn);

    function getScrollAmount() {
      const firstCard = grid.querySelector('.card');
      if (firstCard) {
        const gap = parseFloat(getComputedStyle(grid).gap) || 16;
        return Math.round(firstCard.getBoundingClientRect().width + gap);
      }
      return 320;
    }

    leftBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      grid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    function updateButtonsVisibility() {
      const hasOverflow = grid.scrollWidth > grid.clientWidth + 1;
      leftBtn.style.display = hasOverflow ? 'inline-flex' : 'none';
      rightBtn.style.display = hasOverflow ? 'inline-flex' : 'none';
    }

    function updateButtonDisabledState() {
      leftBtn.disabled = grid.scrollLeft <= 0;
      rightBtn.disabled = (grid.scrollLeft + grid.clientWidth) >= (grid.scrollWidth - 1);
      leftBtn.style.opacity = leftBtn.disabled ? '0.45' : '0.95';
      rightBtn.style.opacity = rightBtn.disabled ? '0.45' : '0.95';
    }

    window.addEventListener('resize', () => {
      updateButtonsVisibility();
      updateButtonDisabledState();
    });

    grid.addEventListener('scroll', updateButtonDisabledState);

    updateButtonsVisibility();
    updateButtonDisabledState();
    grid._scrollButtonsInitialized = true;
  }

  function init() {
    sections.forEach(id => initScrollForSection(id));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ========== Kritik & Saran (Gabung EmailJS + Validasi + Popup) ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("kritik-form");
  const namaInput = document.getElementById("nama");
  const emailInput = document.getElementById("email");
  const pesanInput = document.getElementById("pesan");
  const toast = document.getElementById("toast");
  const popup = document.getElementById("success-popup");

  // Inisialisasi EmailJS
  emailjs.init("nFt3MqZwAFNWB935J"); // Ganti dengan Public Key kamu

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const pesan = pesanInput.value.trim();

    if (!nama || !email || !pesan) {
      showToast("⚠️ Isi semua kolom dulu!");
      return;
    }

    if (!validateEmail(email)) {
      showToast("😕 Email tidak valid!");
      return;
    }

    // Kirim ke EmailJS
    emailjs.sendForm("service_ubqq3un", "template_tzfz41c", form)
      .then(() => {
        popup.classList.add("show");
        showToast("🎉 Pesan berhasil dikirim!");
        form.reset();
        setTimeout(() => popup.classList.remove("show"), 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showToast("❌ Gagal mengirim pesan. Coba lagi nanti.");
      });
  });
});



/* ========== MAP ========== */

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  // Map gelap modern
  const map = L.map('map-container', { zoomControl: false })
    .setView([-6.465839, 110.725829], 15);

  // Marker custom dengan ikon gelap & aksen biru
  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: var(--accent); 
      width: 18px; height: 18px; 
      border-radius: 50%; 
      border: 2px solid #000;
      box-shadow: 0 0 12px rgba(0,186,255,0.7);
      "></div>`,
    iconSize: [20, 20]
  });

  L.marker([-6.465839, 110.725829], { icon }).addTo(map)
    .bindPopup('<strong>Lokasi Saya</strong><br>Bondo, Jepara, Indonesia')
    .openPopup();


    // ===== Efek Interaktif Peta =====

  //  Radius interaktif di sekitar marker utama
  const radius = L.circle([-6.465839, 110.725829], {
    radius: 300,
    color: '#9cc7dced',
    fillColor: '#f2f7f8f0',
    fillOpacity: 0.2,
    weight: 1
  }).addTo(map);

  //  Tooltip follow cursor
  map.on('mousemove', e => {
    radius.setLatLng(e.latlng);
  });

  //  Zoom smooth saat scroll
  window.addEventListener('scroll', () => {
    const mapRect = mapContainer.getBoundingClientRect();
    if (mapRect.top < window.innerHeight && mapRect.bottom > 0) {
      const zoom = 12 + ((window.innerHeight - mapRect.top) / window.innerHeight) * 4;
      map.setZoom(Math.min(zoom, 16), { animate: true });
    }
  });

  //  Efek partikel cahaya halus di marker utama
  const mapParticles = L.circleMarker([-6.465839, 110.725829], {
    radius: 5,
    color: 'var(--accent)',
    fillOpacity: 0.3
  }).addTo(map);

  let pulse = 0;
  setInterval(() => {
    pulse = (pulse + 0.05) % 2;
    mapParticles.setStyle({ radius: 5 + 3 * Math.abs(Math.sin(pulse)) });
  }, 50);
});

// Highlight navbar active link saat scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  let scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const sectionHeight = sec.offsetHeight;
    const sectionTop = sec.offsetTop - 70;
    const sectionId = sec.getAttribute('id');

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${sectionId}`){
          link.classList.add('active');
        }
      });
    }
  });
});

// Highlight navbar-modern active link saat scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-modern nav a');

  let scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const sectionHeight = sec.offsetHeight;
    const sectionTop = sec.offsetTop - 70;
    const sectionId = sec.getAttribute('id');

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.navbar-modern nav a[href="#${sectionId}"]`);
      if(activeLink) activeLink.classList.add('active');
    }
  });
});

