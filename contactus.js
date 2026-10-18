document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight stagger to the reveal based on element order
                entry.target.style.transitionDelay = `${index * 0.15}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 2. Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const submitBtn = document.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the page from refreshing
            
            // Visual feedback on the button
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.style.opacity = '0.8';

            // Simulate a network request (e.g., sending an email)
            setTimeout(() => {
                // Reset button
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = '1';

                // Show success message
                successMessage.classList.add('show');

                // Clear the form fields
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);

            }, 1500); // 1.5 second simulated delay
        });
    }

});