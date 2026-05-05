// MENU TOGGLE
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// ACTIVE NAV LINK ON SCROLL
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let scrollTop = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (scrollTop >= offset && scrollTop < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', scrollTop > 100);

    // Remove toggle icon and navbar when scrolling
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// SCROLL REVEAL
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .certificates-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// TYPED JS
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer.', 'Algorithmic Problem Solver.'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

// PROJECT SLIDER
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.projects-slider').forEach(slider => {
        const slides = slider.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const dotsContainer = slider.querySelector('.dots');
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        let autoSlideInterval;

        // Create dots
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
                resetAutoSlide();
            });
        });

        const dots = dotsContainer.querySelectorAll('button');

        function updateSlider() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Touch/swipe support
        slides.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        });

        slides.addEventListener('touchmove', e => {
            if (!isDragging) return;
            let diffX = e.touches[0].clientX - startX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                isDragging = false;
                resetAutoSlide();
            }
        });

        slides.addEventListener('touchend', () => {
            isDragging = false;
            startAutoSlide();
        });

        // Mouse drag support
        slides.addEventListener('mousedown', e => {
            startX = e.clientX;
            isDragging = true;
            stopAutoSlide();
            e.preventDefault();
        });

        slides.addEventListener('mousemove', e => {
            if (!isDragging) return;
            let diffX = e.clientX - startX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                isDragging = false;
                resetAutoSlide();
            }
        });

        slides.addEventListener('mouseup', () => {
            isDragging = false;
            startAutoSlide();
        });

        slides.addEventListener('mouseleave', () => {
            isDragging = false;
            startAutoSlide();
        });

        // Initialize
        updateSlider();
        startAutoSlide();
    });
});
