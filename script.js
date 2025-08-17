// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Check if targetId is not just '#'
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.project-card, .certificate-card, .skill-box');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Dynamic particle generation
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#00ffff' : '#8A2BE2';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        particle.style.animation = `floatUp ${Math.random() * 10 + 15}s linear infinite`;
        particle.style.pointerEvents = 'none';
        
        const particlesContainer = document.querySelector('.floating-particles');
        if (particlesContainer) {
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        }
    }

    // Add CSS for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createFloatingParticle, 3000);

    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const stars = document.querySelector('.stars');
        const stars2 = document.querySelector('.stars2');
        const stars3 = document.querySelector('.stars3');
        
        if (stars) stars.style.transform = `translateY(${rate}px)`;
        if (stars2) stars2.style.transform = `translateY(${rate * 0.8}px)`;
        if (stars3) stars3.style.transform = `translateY(${rate * 0.6}px)`;
    });

    // Add hover effect to navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add cycling typing effect to hero title
    function typeWriterCycle(element, texts, speed = 100, pauseDuration = 2000) {
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[currentTextIndex];
            
            if (!isDeleting) {
                // Typing
                element.innerHTML = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentText.length) {
                    // Finished typing, pause then start deleting
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, pauseDuration);
                    return;
                }
            } else {
                // Deleting
                element.innerHTML = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    // Finished deleting, move to next text
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                }
            }
            
            setTimeout(type, isDeleting ? speed / 2 : speed);
        }
        
        type();
    }

    // Apply cycling typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const titleTexts = [
            'Software Engineer',
            'Machine Learning Expert', 
            'Deep Learning Specialist'
        ];
        
        heroTitle.style.opacity = '1';
        setTimeout(() => {
            typeWriterCycle(heroTitle, titleTexts, 80, 2000);
        }, 1000);
    }

    // Add glow effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Create temporary glow effect
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.left = mouseX + 'px';
        glow.style.top = mouseY + 'px';
        glow.style.width = '20px';
        glow.style.height = '20px';
        glow.style.background = 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)';
        glow.style.borderRadius = '50%';
        glow.style.pointerEvents = 'none';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.zIndex = '9999';
        glow.style.animation = 'fadeOut 0.5s ease-out forwards';
        
        document.body.appendChild(glow);
        
        // Remove glow after animation
        setTimeout(() => {
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 500);
    });

    // Add fadeOut animation for mouse glow
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(glowStyle);

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
});

// Add loading animation
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a1a;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.style.cssText = `
        color: #00ffff;
        font-size: 2rem;
        font-weight: bold;
        animation: pulse 2s infinite;
    `;
    loadingText.textContent = 'Sumeet Khatri Portfolio';
    
    loadingScreen.appendChild(loadingText);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after a short delay
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }, 800);
});
