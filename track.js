document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Sector Tabs Logic ---
    const sectorBtns = document.querySelectorAll('.sector-btn');
    const sectorPanels = document.querySelectorAll('.sector-panel');

    sectorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            sectorBtns.forEach(b => b.classList.remove('active'));
            sectorPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find matching panel and show it
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 2. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve so it stays visible once scrolled into view
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});