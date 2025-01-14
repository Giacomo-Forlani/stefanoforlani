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

// Timeline data structure
const timelineData = [
    {
        title: "Chirurgo libero professionista",
        startYear: 1990,
        endYear: null  // null indicates "present"
    },
    {
        title: "Gestione ambulatorio Ovada",
        startYear: 1996,
        endYear: 2013
    },
    {
        title: "Dirigente dermatologia plastica oncologica",
        startYear: 2011,
        endYear: 2017
    },
    {
        title: "Dirigente chirurgia della cute e degli annessi",
        startYear: 2000,
        endYear: 2010
    },
    {
        title: "Gestione Ambulatoria Acqui",
        startYear: 1996,
        endYear: 2017
    },
    {
        title: "Assistente di Chirurgia Generale",
        startYear: 1990,
        endYear: 1995
    },
    {
        title: "Servizio di volontariato civile in Kenya",
        startYear: 1986,
        endYear: 1989
    },
    {
        title: "Specializzando",
        startYear: 1980,
        endYear: 1985
    }
];

// Calculate percentages for timeline bars
function calculateTimelinePercentages() {
    const startYear = 1980;  // First year in timeline
    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - startYear;

    const timelineBars = document.querySelectorAll('.timeline-bar');
    
    timelineData.forEach((item, index) => {
        const endYear = item.endYear || currentYear;  // Use current year if endYear is null
        
        // Calculate percentages
        const leftPosition = ((item.startYear - startYear) / totalYears) * 100;
        const width = ((endYear - item.startYear) / totalYears) * 100;
        
        // Update the corresponding timeline bar
        if (timelineBars[index]) {
            timelineBars[index].style.left = `${leftPosition}%`;
            timelineBars[index].style.width = `${width}%`;
        }
    });

    // Update year labels
    const yearLabels = document.querySelectorAll('.year-label');
    const years = [];
    for (let year = startYear; year <= currentYear; year += 5) {
        years.push(year);
    }
    if (years[years.length - 1] !== currentYear) {
        years.push(currentYear);
    }

    yearLabels.forEach((label, index) => {
        if (years[index] !== undefined) {
            label.textContent = years[index];
        }
    });
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    calculateTimelinePercentages();
});

// Update on window resize for responsiveness
window.addEventListener('resize', () => {
    calculateTimelinePercentages();
});