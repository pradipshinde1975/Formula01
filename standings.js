document.addEventListener("DOMContentLoaded", () => {
    
    // --- Tab Switching Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.standings-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked button
            btn.classList.add('active');

            // Find the target content ID and make it active
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Re-trigger reveal animations for newly visible tab
            triggerReveals();
        });
    });

    // --- Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // We keep observing so if users switch tabs, the animation works
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    function triggerReveals() {
        revealElements.forEach((el, index) => {
            // Adds a slight staggered delay to each row loading in
            el.style.transitionDelay = `${index * 0.05}s`; 
            revealObserver.observe(el);
            
            // If already on screen, force visibility
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                setTimeout(() => el.classList.add('visible'), 50);
            }
        });
    }

    // Trigger on initial load
    triggerReveals();

});