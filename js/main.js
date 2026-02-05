// ============================================
// MAIN UTILITIES
// General site functionality
// ============================================

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.header__mobile-toggle');
        this.nav = document.querySelector('.header__nav');
        this.init();
    }

    init() {
        if (!this.toggle || !this.nav) return;

        this.toggle.addEventListener('click', () => {
            this.nav.classList.toggle('active');
            const isOpen = this.nav.classList.contains('active');
            this.toggle.textContent = isOpen ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header__nav') && !e.target.closest('.header__mobile-toggle')) {
                this.nav.classList.remove('active');
                this.toggle.textContent = '☰';
            }
        });

        // Close menu when clicking on a link
        const navLinks = this.nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.nav.classList.remove('active');
                this.toggle.textContent = '☰';
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// External Links - Add noopener noreferrer
function initExternalLinks() {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Initialize all utilities
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    initSmoothScroll();
    initLazyLoading();
    initExternalLinks();
});
