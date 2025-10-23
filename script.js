// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .platform, .dev-feature, .pricing-column');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Platform cards hover effect
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Phone mockup animation
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        let isAnimating = false;
        
        const animatePhone = () => {
            if (isAnimating) return;
            isAnimating = true;
            
            phoneMockup.style.transform = 'translateY(-20px) rotate(5deg)';
            phoneMockup.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                phoneMockup.style.transform = 'translateY(0) rotate(0deg)';
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }, 200);
        };

        // Animate phone on scroll
        window.addEventListener('scroll', function() {
            const heroSection = document.querySelector('.hero');
            const rect = heroSection.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animatePhone();
            }
        });
    }

    // Pricing section highlight effect
    const pricingColumn = document.querySelector('.pricing-column');
    if (pricingColumn) {
        pricingColumn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        pricingColumn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
    // Create mobile menu button only on desktop
    if (window.innerWidth > 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #333;
                    cursor: pointer;
                }
                .nav-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    display: none;
                }
                .nav-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                    display: flex;
                }
            }
        `;
        document.head.appendChild(style);
        
        navContainer.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    };

    // Initialize mobile menu
    createMobileMenu();

    // Download button email collection with beautiful modal
    // Configure this with your Google Apps Script Web App URL
    const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby-L1fvh74dGGA57mxLjdGt68vLqkHIHC2GhL0k2JEQtNTXhrvFN3FrSQjpA_g4kv-X/exec';
    // Scope to hero buttons only and use data-platform for reliable detection
    const downloadButtons = document.querySelectorAll('.hero .btn.btn-primary');
    const modal = document.getElementById('emailModal');
    // platformName element was removed from modal copy; keep logic independent of it
    const emailInput = document.getElementById('emailInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const closeBtn = document.querySelector('.close');
    
    let currentPlatform = '';
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dataPlatform = this.getAttribute('data-platform');
            const buttonText = this.textContent.trim();
            currentPlatform = dataPlatform || (
                buttonText.includes('Windows') ? 'Windows' :
                buttonText.includes('Mac') ? 'Mac' :
                buttonText.includes('Web') || buttonText.includes('browser') ? 'Web' : 'Unknown'
            );
            
            // Send Google Analytics event for Windows download
            if (currentPlatform === 'Windows') {
                // Check if gtag is available (Google Analytics 4)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_windows', {
                        'event_category': 'download',
                        'event_label': 'Windows Download Button Clicked'
                    });
                    console.log('Google Analytics event sent: download_windows');
                }
            }

            if (currentPlatform === 'Mac') {
                // Check if gtag is available (Google Analytics 4)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_mac', {
                        'event_category': 'download',
                        'event_label': 'Mac Download Button Clicked'
                    });
                    console.log('Google Analytics event sent: download_mac');
                }
            }

            if (currentPlatform === 'Web') {
                // Check if gtag is available (Google Analytics 4)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_web', {
                        'event_category': 'download',
                        'event_label': 'Web Download Button Clicked'
                    });
                    console.log('Google Analytics event sent: download_web');
                }
            }
            // Update modal content (no platform label in modal body anymore)
            emailInput.value = '';
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus on email input
            setTimeout(() => {
                emailInput.focus();
            }, 100);
        });
    });
    
    // Handle download button in modal
    downloadBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailInput.style.borderColor = '#ef4444';
            emailInput.focus();
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            // Send to Google Sheets (fire-and-forget)
            if (SHEETS_WEB_APP_URL) {
                try {
                    fetch(SHEETS_WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email,
                            platform: currentPlatform,
                            timestamp: new Date().toISOString(),
                        }),
                    });
                } catch (err) {
                    console.error('Sheets submit failed (ignored):', err);
                }
            }

            // Success - close modal and show success message
            closeModal();
            showSuccessMessage(email, currentPlatform);
            console.log(`Email collected: ${email} (beta notify) for ${currentPlatform}`);
        } else {
            emailInput.style.borderColor = '#ef4444';
            emailInput.focus();
        }
    });
    
    // Handle cancel button
    cancelBtn.addEventListener('click', closeModal);
    
    // Handle close button
    closeBtn.addEventListener('click', closeModal);
    
    // Handle clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Reset email input border on typing
    emailInput.addEventListener('input', function() {
        this.style.borderColor = '#e2e8f0';
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        emailInput.value = '';
        emailInput.style.borderColor = '#e2e8f0';
    }
    
    function showSuccessMessage(email, platform) {
        // Create a beautiful success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 3000;
            animation: slideInRight 0.5s ease;
            max-width: 400px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <div>
                    <strong>Thanks!</strong><br>
                    We'll notify ${email} when the ${platform} beta is available.
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (hero && phoneMockup) {
        const rate = scrolled * -0.5;
        phoneMockup.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing animation to hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});
