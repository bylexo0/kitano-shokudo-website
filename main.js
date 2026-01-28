document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.75rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.padding = '1.25rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });

    // Language Switching Logic
    const langFrBtn = document.getElementById('lang-fr');
    const langEnBtn = document.getElementById('lang-en');
    const translatableElements = document.querySelectorAll('[data-fr]');

    const setLanguage = (lang) => {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);

        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update button states
        if (lang === 'fr') {
            langFrBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langEnBtn.classList.add('active');
            langFrBtn.classList.remove('active');
        }

        localStorage.setItem('kitano-lang', lang);
    };

    langFrBtn.addEventListener('click', () => setLanguage('fr'));
    langEnBtn.addEventListener('click', () => setLanguage('en'));

    // Init language
    const savedLang = localStorage.getItem('kitano-lang') || 'fr';
    setLanguage(savedLang);

    // Menu Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn-v2');
    const tabPanes = document.querySelectorAll('.tab-pane-v2');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) pane.classList.add('active');
            });
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('open');
        });
    });

    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal, .reveal-delay');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
