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

// ========== Email Subscribe (Versi Fix Total) ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");
  const emailInput = document.getElementById("email");
  const popup = document.getElementById("success-popup");
  const toast = document.getElementById("toast");
  const errorMessage = document.getElementById("error-message");

  if (!form) {
    console.warn("Form subscribe tidak ditemukan di halaman.");
    return;
  }

  function showToast(message, type = "success") {
    if (!toast) return;
    toast.textContent = message;
    toast.style.borderColor = type === "error" ? "#ef4444" : "rgba(255,255,255,0.1)";
    toast.style.background =
      type === "error" ? "rgba(60, 20, 20, 0.9)" : "rgba(40, 44, 52, 0.9)";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      errorMessage.textContent = "Masukkan email yang valid!";
      showToast("Email tidak valid 😕", "error");
      return;
    }

    errorMessage.textContent = "";
    showToast("Menghubungkan...");

    // Simulasi kirim data ke server
    setTimeout(() => {
      form.reset();
      if (popup) popup.classList.add("show");
      showToast("Berhasil terhubung! 🎉");
      setTimeout(() => popup?.classList.remove("show"), 2000);
    }, 1200);
  });
});


/* ========== MAP ========== */

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  // Map gelap modern
  const map = L.map('map-container', { zoomControl: false })
    .setView([-6.465839, 110.725829], 15);


  // Tile gelap elegan dari CartoDB Dark
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

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
  // 1️⃣ Radius interaktif di sekitar marker utama
  const radius = L.circle([-6.465839, 110.725829], {
    radius: 300,
    color: '#00baff33',
    fillColor: '#00baff22',
    fillOpacity: 0.2,
    weight: 1
  }).addTo(map);

  // 2️⃣ Tooltip follow cursor
  map.on('mousemove', e => {
    radius.setLatLng(e.latlng);
  });

  // 3️⃣ Zoom smooth saat scroll
  window.addEventListener('scroll', () => {
    const mapRect = mapContainer.getBoundingClientRect();
    if (mapRect.top < window.innerHeight && mapRect.bottom > 0) {
      const zoom = 12 + ((window.innerHeight - mapRect.top) / window.innerHeight) * 4;
      map.setZoom(Math.min(zoom, 16), { animate: true });
    }
  });

  // 4️⃣ Efek partikel cahaya halus di marker utama
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

let ticking = false;
window.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      revealElements();
      ticking = false;
    });
    ticking = true;
  }
});

