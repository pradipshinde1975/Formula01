document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Session Toggle Logic (Race vs Quali) ---
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const sessionContents = document.querySelectorAll('.session-content');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            toggleBtns.forEach(b => b.classList.remove('active'));
            sessionContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find matching content section and show it
            const targetId = `${btn.getAttribute('data-session')}-results`;
            document.getElementById(targetId).classList.add('active');
            
            // Re-fire animations for the newly visible section
            triggerReveals();
        });
    });

    // --- 2. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    function triggerReveals() {
        revealElements.forEach((el, index) => {
            // Reset opacity to ensure animation runs when toggling tabs
            if (!el.classList.contains('podium-step')) {
                el.style.transitionDelay = `${(index % 5) * 0.05}s`; 
            } else {
                // Slower reveal for the podium
                el.style.transitionDelay = `${index * 0.2}s`;
            }
            
            revealObserver.observe(el);

            // Force visibility if already in viewport (solves tab switching visual bugs)
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                setTimeout(() => el.classList.add('visible'), 50);
            }
        });
    }

    // Run on initial page load
    triggerReveals();

});