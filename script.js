document.addEventListener('mousemove', (e) => {
    const text = document.querySelector('.f1-text');
    if (!text) return;
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    
    // Apply a subtle movement to the text based on mouse position
    text.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// --- Hero Section 3D Tilt Effect --- //
document.addEventListener('mousemove', function(e) {
    const car = document.getElementById('dynamic-car');
    
    // Safety check
    if (!car) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calculate mouse position relative to the center of the screen
    const mouseX = (e.clientX / width) - 0.5;
    const mouseY = (e.clientY / height) - 0.5;
    
    // Limit the movement range
    const moveX = mouseX * 30;
    const moveY = mouseY * 30; 

    // Apply the transform
    car.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
});


// --- Bulletproof Scroll Zoom-Out Gallery Logic --- //
document.addEventListener("DOMContentLoaded", () => {
    
    const scrollSection = document.getElementById('gallery-section');
    const slides = document.querySelectorAll('.scroll-slide');
    
    if (!scrollSection || slides.length === 0) return;

    function handleGalleryScroll() {
        const rect = scrollSection.getBoundingClientRect();
        const maxScrollableDistance = rect.height - window.innerHeight;
        const scrolledDistance = -rect.top;
        
        let progress = scrolledDistance / maxScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));

        const totalSlides = slides.length;
        let activeIndex = Math.floor(progress * totalSlides);
        
        if (activeIndex >= totalSlides) {
            activeIndex = totalSlides - 1;
        }

        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'passed');
            
            if (index === activeIndex) {
                slide.classList.add('active'); 
            } else if (index < activeIndex) {
                slide.classList.add('passed'); 
            }
        });
    }

    window.addEventListener('scroll', handleGalleryScroll);
    handleGalleryScroll(); // Trigger immediately on load
});

// --- Mindset Section --- //
document.addEventListener("DOMContentLoaded", () => {
    
    const mindsetSection = document.getElementById('mindset-section');
    const mindsetText = document.getElementById('mindset-text');

    if (!mindsetSection || !mindsetText) return;

    // 1. Create the Wave Effect
    const textContent = mindsetText.innerText;
    mindsetText.innerHTML = ''; // Clear the raw text
    
    textContent.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.classList.add('wave-letter');
        
        if (char === ' ') {
            span.classList.add('space');
            span.innerHTML = '&nbsp;';
        }
        
        span.style.animationDelay = `${index * 0.1}s`;
        mindsetText.appendChild(span);
    });

    // 2. Advanced LERP Smooth Scroll
    let currentScrollVW = 50; 
    let targetScrollVW = 50;  

    function updateTargetScroll() {
        const rect = mindsetSection.getBoundingClientRect();
        const maxScrollableDistance = rect.height - window.innerHeight;
        const scrolledDistance = -rect.top;
        
        let progress = scrolledDistance / maxScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));

        targetScrollVW = 50 - (progress * 250); 
    }

    function renderGlide() {
        currentScrollVW += (targetScrollVW - currentScrollVW) * 0.05; 
        mindsetText.style.transform = `scaleY(1.2) translateX(${currentScrollVW}vw)`;
        requestAnimationFrame(renderGlide);
    }

    window.addEventListener('scroll', updateTargetScroll);
    updateTargetScroll(); 
    renderGlide(); 
});

// --- Corner-to-Corner Grid Scroll Logic --- //
document.addEventListener("DOMContentLoaded", () => {
    
    const gridSection = document.getElementById('corner-grid-section');
    const gridContainer = document.getElementById('grid-container');

    if (!gridSection || !gridContainer) return;

    let currentGridX = 120; 
    let targetGridX = 120;

    function updateGridScroll() {
        const rect = gridSection.getBoundingClientRect();
        const maxScrollableDistance = rect.height - window.innerHeight;
        const scrolledDistance = -rect.top;
        
        let progress = scrolledDistance / maxScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));

        targetGridX = 120 - (progress * 250); 
    }

    function renderGridGlide() {
        currentGridX += (targetGridX - currentGridX) * 0.06; 
        gridContainer.style.transform = `rotate(-15deg) translateX(${currentGridX}vw)`;
        requestAnimationFrame(renderGridGlide);
    }

    window.addEventListener('scroll', updateGridScroll);
    updateGridScroll();
    renderGridGlide(); 
});

// --- Waterwave Scroll Trigger Logic --- //
document.addEventListener("DOMContentLoaded", () => {
    
    const boxes = document.querySelectorAll('.wave-animate');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const waveObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-wave');
            } else {
                entry.target.classList.remove('show-wave');
            }
        });
    }, observerOptions);

    boxes.forEach(box => {
        waveObserver.observe(box);
    });
});

// --- 3D Video Carousel --- //
document.addEventListener("DOMContentLoaded", () => {
    
    const section = document.getElementById('video-section');
    const track = document.getElementById('slider-track');
    const cards = document.querySelectorAll('.video-card');
    
    if (!section || !track) return;

    let targetScroll = 0;
    let currentScroll = 0;

    function updateTarget() {
        const rect = section.getBoundingClientRect();
        const maxScrollY = rect.height - window.innerHeight;
        const scrolledY = -rect.top;
        
        let progress = scrolledY / maxScrollY;
        progress = Math.max(0, Math.min(1, progress)); 

        const trackWidth = track.scrollWidth;
        const maxSlideX = trackWidth - window.innerWidth + (window.innerWidth * 0.35); 
        
        targetScroll = progress * maxSlideX;
    }

    function render3DCarousel() {
        currentScroll += (targetScroll - currentScroll) * 0.08;
        
        track.style.transform = `translateX(${-currentScroll}px)`;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + (cardRect.width / 2);
            const windowCenter = window.innerWidth / 2;
            
            const distanceFromCenter = cardCenter - windowCenter;
            
            let rotateY = distanceFromCenter * 0.05; 
            rotateY = Math.max(-35, Math.min(35, rotateY)); 

            let scale = 1 - Math.abs(distanceFromCenter * 0.0005);
            scale = Math.max(0.85, scale); 

            card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`;
            
            if (Math.abs(distanceFromCenter) > 200) {
                card.style.opacity = '0.5';
            } else {
                card.style.opacity = '1';
            }
        });

        requestAnimationFrame(render3DCarousel);
    }

    window.addEventListener('scroll', updateTarget);
    window.addEventListener('resize', updateTarget); 
    
    updateTarget();
    render3DCarousel();
});

// --- PERFECTED CANVAS VIDEO SCRUBBING (480 Frames) --- //
document.addEventListener("DOMContentLoaded", () => {
    
    const canvas = document.getElementById("video-canvas");
    const section = document.getElementById("canvas-section"); // Ensure your HTML uses id="canvas-section"

    if (!canvas || !section) return;
    const context = canvas.getContext("2d");

    // Sync canvas internal resolution with screen size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderCanvas(); // Redraw on resize so it doesn't blank out
    }
    window.addEventListener('resize', resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- CONFIGURATION ---
    const frameCount = 480; // Updated to 480 frames
    
    const getFrameUrl = (index) => {
        let frameNumber = (index + 1).toString().padStart(4, '0');
        return `assets/frame_${frameNumber}.jpeg`; // Update path/extension if needed
    };

    const images = [];
    const sequenceInfo = { frame: 0 };
    let loadedImages = 0;

    // 1. PRELOAD IMAGES
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
            loadedImages++;
            // Draw the first frame immediately when it loads
            if (loadedImages === 1 && sequenceInfo.frame === 0) {
                renderCanvas();
            }
        };
        images.push(img);
    }

    // 2. RENDER FUNCTION (With "Object-Fit: Cover" Math)
    function renderCanvas() {
        const img = images[sequenceInfo.frame];
        
        // Safety check if image isn't fully loaded yet
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Calculate aspect ratio scale
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        
        // Calculate centered X and Y positions
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        // Clear and draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // 3. SCROLL LOGIC
    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        
        const maxScrollableDistance = rect.height - window.innerHeight;
        const scrolledDistance = -rect.top;
        
        let progress = scrolledDistance / maxScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));

        // Multiply by 479 (arrays are 0-indexed)
        const frameIndex = Math.floor(progress * (frameCount - 1));

        requestAnimationFrame(() => {
            sequenceInfo.frame = frameIndex;
            renderCanvas();
        });
    });
});

// --- Footer Elements --- //
document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const emailInput = newsletterForm.querySelector('input').value;
            
            if(emailInput) {
                alert(`Grazie! ${emailInput} has been added to the Scuderia Ferrari newsletter.`);
                newsletterForm.reset();
            }
        });
    }
});