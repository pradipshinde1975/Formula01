document.addEventListener("DOMContentLoaded", () => {
    
    // --- Scroll Reveal Logic ---
    // This creates a smooth fade-up effect for the news cards as the user scrolls down
    
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class when the card enters the viewport
                entry.target.classList.add('visible');
                
                // Stop observing the element once it has been revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the news card is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});