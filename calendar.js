document.addEventListener("DOMContentLoaded", () => {
    
    // Select all the race cards we want to animate
    const cards = document.querySelectorAll('.reveal-card');

    // Create an Intersection Observer to watch the user's scroll position
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            // When the card enters the bottom 15% of the screen...
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS animation
                entry.target.classList.add('visible');
                
                // Stop observing it so the animation only happens once per page load
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    });

    // To make it look incredibly slick when the page first loads, 
    // we add a staggered delay so the first few cards don't pop in all at once.
    cards.forEach((card, index) => {
        // Apply a slight delay based on the card's order in the HTML
        card.style.transitionDelay = `${(index % 3) * 0.1}s`; 
        
        // Tell the observer to start watching this card
        observer.observe(card);
    });

});