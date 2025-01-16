// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi scroll reveal
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Efek scroll untuk navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Tambahkan ke script.js
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// Fungsi untuk membuka lightbox
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const imgSrc = element.querySelector('img').src;
    
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Simpan referensi ke gallery item saat ini
    const galleryItems = document.querySelectorAll('.gallery-item');
    lightbox.dataset.currentIndex = Array.from(galleryItems).indexOf(element);
}

// Fungsi untuk menutup lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Fungsi untuk navigasi lightbox
function navigateLightbox(direction) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    
    currentIndex += direction;
    
    if (currentIndex >= galleryItems.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryItems.length - 1;
    
    const newImgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightboxImg.src = newImgSrc;
    lightbox.dataset.currentIndex = currentIndex;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateLightbox(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateLightbox(1);
        });
    }

    // Menutup lightbox saat klik di luar gambar
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Navigasi dengan keyboard
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('infoModal');
    const closeBtn = document.querySelector('.modal-close');
    const modalBtn = document.querySelector('.modal-btn');

    if (modal && closeBtn && modalBtn) {
        // Tampilkan modal setelah 2 detik halaman dimuat
        setTimeout(() => {
            modal.style.display = 'block';
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }, 2000);

        // Tutup modal saat tombol close diklik
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        // Tutup modal saat tombol "Jelajahi Sekarang" diklik
        modalBtn.onclick = () => {
            modal.style.display = 'none';
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };
    }
});

// Navbar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle menu when hamburger is clicked
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Ambil data form
            const formData = new FormData(contactForm);
            const nama = formData.get('nama');
            const email = formData.get('email');
            const pesan = formData.get('pesan');

            // Di sini Anda bisa menambahkan kode untuk mengirim data ke server
            console.log('Data yang akan dikirim:', { nama, email, pesan });

            // Reset form
            contactForm.reset();

            // Tampilkan toast notification
            toast.classList.add('show');

            // Hilangkan toast setelah 3 detik
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3400);
        });
    }
});