/* ==========================================================================
   Lohakare Ganesh - Portfolio Core Animations
   Contains: Scroll Reveal, Custom Cursor Trail, Scroll Indicator, Stats Counters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Navbar Sticky & Scroll-Hide Behaviour
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        // Sticky class on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
        
        // Hide/Show navbar on scroll direction
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
        
        // Scroll Progress Bar Update
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // ==========================================
    // 3. Scroll Reveal Observer
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-scale, .reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Once animated, we don't need to observe it anymore unless we want repeat triggers
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.10,
        rootMargin: '0px 0px -40px 0px' // Trigger slightly before element enters view
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 4. Skills Section Progress Bar Animation
    // ==========================================
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                skillsObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => skillsObserver.observe(bar));

    // ==========================================
    // 5. Stat Counter Incrementing Logic
    // ==========================================
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const duration = 2000; // Counter takes 2 seconds to complete
                const stepTime = Math.max(Math.floor(duration / target), 30);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += Math.ceil(target / (duration / stepTime));
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = current + '+';
                    }
                }, stepTime);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Back to top button logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
