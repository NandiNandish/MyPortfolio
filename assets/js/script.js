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
        themeToggle.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
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
