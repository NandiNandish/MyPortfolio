const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const themeToggle = document.getElementById('themeToggle');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        siteNav.classList.toggle('active');
    });
}

const links = document.querySelectorAll('.site-nav a');
links.forEach(link => {
    link.addEventListener('click', () => {
        siteNav.classList.remove('active');
    });
});

function applyTheme(theme) {
    document.body.classList.toggle('light', theme === 'light');
    if (themeToggle) {
        const icon = theme === 'light' ? '🌙' : '☀️';
        const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
        themeToggle.innerHTML = `<span id="themeIcon">${icon}</span>`;
        themeToggle.setAttribute('aria-label', label);
    }
    localStorage.setItem('portfolioTheme', theme);
}

function loadTheme() {
    const storedTheme = localStorage.getItem('portfolioTheme');
    if (storedTheme) {
        applyTheme(storedTheme);
        return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
}

loadTheme();

// Entrance animations: reveal elements on scroll with IntersectionObserver
(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // avoid motion for users who prefer reduced motion

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.revealable').forEach(el => {
        observer.observe(el);
    });
})();

// Counter management
const STORAGE_KEYS = {
    views: 'portfolioViews',
    likes: 'portfolioLikes'
};

function initCounters() {
    const viewCount = document.getElementById('viewCount');
    const likeCount = document.getElementById('likeCount');
    const likeButton = document.getElementById('likeButton');

    if (!viewCount || !likeCount || !likeButton) return;

    // Load stored values or initialize to 0
    let views = parseInt(localStorage.getItem(STORAGE_KEYS.views) || '0');
    let likes = parseInt(localStorage.getItem(STORAGE_KEYS.likes) || '0');

    // Increment views on page load
    views++;
    localStorage.setItem(STORAGE_KEYS.views, views);
    viewCount.textContent = views;
    likeCount.textContent = likes;

    // Like button handler
    likeButton.addEventListener('click', () => {
        likes++;
        localStorage.setItem(STORAGE_KEYS.likes, likes);
        likeCount.textContent = likes;
        
        // Visual feedback
        likeButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            likeButton.style.transform = 'scale(1)';
        }, 200);
    });
}

initCounters();
