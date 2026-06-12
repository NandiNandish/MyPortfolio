# Professional Portfolio Website

A clean, responsive portfolio website built with PHP for professional presentation.

## Structure

- `index.html` – static portfolio homepage with project listings, testimonials, and client-side contact validation.
- `send_mail.php` – server endpoint that sends submitted messages to the configured email address (requires PHP mail support).
- `assets/css/style.css` – responsive styling and modern layout.
- `assets/js/script.js` – mobile navigation toggle and client-side contact validation.

## Running

1. If you want contact messages emailed to you, host the `portfolio` folder on a PHP-enabled web server (e.g. Apache, Nginx + PHP-FPM).
2. Edit `send_mail.php` and set `$recipient` to your email address.
3. Open `http://localhost/portfolio/` (or your server URL) in your browser.

## Customization

- Update profile details in `index.php` under the `$site` array.
- Add or edit projects in the `$projects` array.
- Change testimonials in the `$testimonials` array.
