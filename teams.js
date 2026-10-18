document.addEventListener("DOMContentLoaded", () => {
    
    // --- Smooth Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // Create an observer that watches for elements entering the screen
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the team card is 15% visible on the screen...
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS transition
                entry.target.classList.add('visible');
                
                // Stop observing it so the animation doesn't repeat backwards
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    });

    // Attach the observer to every team card on the page
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});