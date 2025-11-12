// --- 1. SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- 2. EFEK TYPING TEXT ---
const textElement = document.getElementById('typing-text');
const texts = [
    'NewBie Web Developer',
    'Junior Programming', // Typo sudah diperbaiki
    'Calon PRO'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!textElement) return; // Hentikan jika elemen tidak ditemukan
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// --- DITAMBAHKAN: 3. FUNGSI MENU HAMBURGER ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#main-nav a');

if (hamburgerBtn && mainNav) {
    // 1. Toggle menu saat tombol hamburger di-klik
    hamburgerBtn.addEventListener('click', () => {
        mainNav.classList.toggle('is-active');
        
        const isActive = mainNav.classList.contains('is-active');
        hamburgerBtn.setAttribute('aria-expanded', isActive);
        
        if (isActive) {
            hamburgerBtn.innerHTML = '<i class="fas fa-times"></i>'; // Ikon 'X'
        } else {
            hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>'; // Ikon 'Bars'
        }
    });

    // 2. Tutup menu saat link di-klik (untuk navigasi di halaman yg sama)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-active')) {
                mainNav.classList.remove('is-active');
                hamburgerBtn.setAttribute('aria-expanded', false);
                hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// --- DITAMBAHKAN: 4. ANIMASI "WOW" EFFECT SAAT SCROLL ---
const fadeInElements = document.querySelectorAll('.fade-in');

if (fadeInElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Opsional: Hentikan observasi setelah animasi berjalan
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Animasi terpicu saat 15% elemen terlihat
    });

    fadeInElements.forEach((el) => observer.observe(el));
}


// --- INISIALISASI ---
// Mulai semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    type(); // Mulai efek mengetik
});