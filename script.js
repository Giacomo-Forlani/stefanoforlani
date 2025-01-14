// Tailwind configuration for custom colors
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1e40af',
                secondary: '#1e293b',
                accent: '#3b82f6'
            }
        }
    }
}

// Toggle mobile menu visibility
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Close mobile menu when clicking on a link or logo
document.querySelectorAll('#mobile-menu a, .logo').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Hide mobile menu on window resize if screen becomes large
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
        document.getElementById('mobile-menu').classList.add('hidden');
    }
});

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href="#"

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});