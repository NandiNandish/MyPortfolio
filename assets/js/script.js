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

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields before sending your message.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Send to server endpoint
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        showFormMessage('Sending message...', '');

        fetch('send_mail.php', {
            method: 'POST',
            body: formData,
        })
        .then(r => r.json())
        .then(data => {
            if (data && data.success) {
                showFormMessage(data.message || 'Message sent successfully.', 'success');
                contactForm.reset();
            } else {
                showFormMessage(data.message || 'Failed to send message.', 'error');
            }
        })
        .catch(() => {
            showFormMessage('Failed to send message. Server error or CORS issue.', 'error');
        });
    });
}

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-alert ${type}`;
    formMessage.style.display = 'block';
}
