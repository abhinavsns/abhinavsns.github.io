document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const yearEl = document.getElementById('currentYear');
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const applyTheme = (theme, { persist = true } = {}) => {
        const normalized = theme === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-theme', normalized);
        if (themeToggle) {
            themeToggle.dataset.theme = normalized;
            themeToggle.textContent = normalized === 'dark' ? '☀︎' : '☾';
            themeToggle.setAttribute('aria-label', normalized === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
        if (persist) {
            localStorage.setItem('theme', normalized);
        }
    };

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyTheme(storedTheme);
    } else {
        applyTheme(prefersDark.matches ? 'dark' : 'light', { persist: false });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    prefersDark.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light', { persist: false });
        }
    });
});
