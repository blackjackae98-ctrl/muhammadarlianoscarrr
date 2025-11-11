// script.js

// 1. Smooth Scrolling untuk navigasi (agar perpindahan antar section mulus)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Efek Typing Text di Hero Section
const textElement = document.getElementById('typing-text');
const texts = [
    'NewBie Web Developer',
    'Junior Programing',
    'Calon PRO'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Hapus karakter
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Ketik karakter
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Tentukan kecepatan ketik dan hapus
    let typingSpeed = isDeleting ? 50 : 100;

    // Jika sudah selesai mengetik satu kalimat
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Jeda 2 detik
        isDeleting = true;
    } 
    // Jika sudah selesai menghapus
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Pindah ke kalimat berikutnya
        typingSpeed = 500; // Jeda sebelum mulai mengetik lagi
    }

    setTimeout(type, typingSpeed);
}

// Mulai efek saat halaman dimuat
document.addEventListener('DOMContentLoaded', type);