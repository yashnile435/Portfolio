// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Background slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Auto slide every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a, a.btn:not([download])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                // Skip if it's just #
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Resume download button
    const resumeBtn = document.querySelector('a.btn[download]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            // Show a message that the resume is downloading
            const notification = document.createElement('div');
            notification.textContent = 'Yash Nile resume is downloading...';
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = '#55880F';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            notification.style.zIndex = '9999';
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission (in a real application, this would send data to a server)
            alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    // Add active class styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        nav a.active {
            color: #55880F;
        }
        nav a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Call on scroll
    window.addEventListener('scroll', highlightNav);
    
    // Call once on load
    highlightNav();
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .project-card, .skill-category, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.visible, .skill-category.visible, .about-content.visible, .contact-content.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card:nth-child(2), .skill-category:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3), .skill-category:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Call on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Call once on load
    checkScroll();
    
    // Add current year to footer copyright
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
    }
}); 