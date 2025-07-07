// Enhanced Smooth scrolling and modern interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading screen animation
    createLoadingScreen();
    
    // Mobile Navigation Toggle with Accessibility
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', mobileMenu);

    function mobileMenu() {
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        hamburger.setAttribute('aria-expanded', !isActive);
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(n => n.addEventListener('click', closeMenu));

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Enhanced smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', clickHandler);
    }

    function clickHandler(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70;
            
            // Add smooth scroll with easing
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Add scale animation to target section
            target.style.transform = 'scale(1.02)';
            setTimeout(() => {
                target.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Enhanced navbar scroll effect with glassmorphism
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = 'none';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Enhanced parallax effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // AI animation parallax
        const aiAnimation = document.querySelector('.ai-animation');
        if (aiAnimation) {
            const rate = scrolled * 0.1;
            aiAnimation.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
        }
        
        // Section backgrounds parallax
        const sections = document.querySelectorAll('.services, .how-we-work, .benefits, .contact');
        sections.forEach((section, index) => {
            const rate = scrolled * (0.1 + index * 0.05);
            section.style.backgroundPosition = `center ${rate}px`;
        });
    });

    // Enhanced contact form handling with better UX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fix the errors above.', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const service = formData.get('service');
        const message = formData.get('message');

        // Show loading state with animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--gradient-tertiary)';

        // Simulate form submission with realistic delay
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('🎉 Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            // Reset form field styles
            inputs.forEach(input => {
                input.classList.remove('success', 'error');
                input.style.borderColor = '';
            });
            
        } catch (error) {
            showNotification('❌ Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }
    }

    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        // Remove existing classes
        field.classList.remove('success', 'error');
        
        if (isRequired && !value) {
            field.classList.add('error');
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            field.classList.add('error');
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            return false;
        }
        
        if (value) {
            field.classList.add('success');
            field.style.borderColor = '#10b981';
            field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.style.transform = 'translateX(100%)';
            setTimeout(() => existingNotification.remove(), 300);
        }

        // Create enhanced notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : '⚠️'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Enhanced styles
        const baseStyles = `
            position: fixed;
            top: 90px;
            right: 20px;
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            max-width: 400px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        const typeStyles = type === 'success' 
            ? 'background: linear-gradient(135deg, #10b981 0%, #059669 100%);'
            : 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);';
            
        notification.style.cssText = baseStyles + typeStyles;

        // Add notification styles to head if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .notification-icon {
                    font-size: 24px;
                    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
                }
                .notification-message {
                    flex: 1;
                    line-height: 1.4;
                    font-weight: 500;
                    font-size: 14px;
                }
                .notification-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 5px 8px;
                    border-radius: 8px;
                    margin-left: 10px;
                    transition: all 0.2s ease;
                }
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }
                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    display: inline-block;
                    animation: spin 1s linear infinite;
                    margin-right: 8px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 6000);
    }

    // Enhanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation with enhanced effects
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .step, .feature-card, .team-member, .testimonial-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        observer.observe(el);
    });

    // Enhanced counter animation with easing
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.textContent.replace(/\d/g, '');
            
            let current = 0;
            const increment = target / 60; // 60 frames for smooth animation
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                current = target * easeOutCubic;
                
                counter.textContent = Math.floor(current) + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            counter.textContent = '0' + suffix;
            requestAnimationFrame(updateCount);
        });
    }

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }

    // Enhanced service card interactions
    const serviceCards = document.querySelectorAll('.service-card, .benefit-card, .step');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon, .benefit-icon, .step-number');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease';
            }
            
            // Add glowing effect
            card.style.boxShadow = '0 40px 80px rgba(102, 126, 234, 0.2), 0 0 50px rgba(102, 126, 234, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.animation = 'none';
            }
            
            // Remove glowing effect
            card.style.boxShadow = '';
        });
    });

    // Add CSS for bounce animation
    if (!document.querySelector('#bounce-animation')) {
        const style = document.createElement('style');
        style.id = 'bounce-animation';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0,0,0) scale(1);
                }
                40%, 43% {
                    transform: translate3d(0,-15px,0) scale(1.1);
                }
                70% {
                    transform: translate3d(0,-7px,0) scale(1.05);
                }
                90% {
                    transform: translate3d(0,-2px,0) scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced scroll-to-top button with modern design
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll-to-top button with enhanced animation
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(100px) scale(0.8)';
        }
    });

    // Enhanced scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add ripple animation CSS
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced hover effects for buttons
    const buttons = document.querySelectorAll('.btn, .cta-button');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add magnetic effect to cards
    const cards = document.querySelectorAll('.service-card, .benefit-card, .step');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `perspective(1000px) rotateX(${y / 10}deg) rotateY(${x / 10}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    function createLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loadingScreen.innerHTML = `
            <div class="loading-content" style="text-align: center; color: white;">
                <div class="loading-logo" style="font-size: 3rem; font-weight: 900; margin-bottom: 20px; 
                     background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                     -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    INTROVERTED.<span style="color: #ed8936;">AI</span>
                </div>
                <div class="loading-spinner" style="width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.3); 
                     border-top: 4px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Remove loading screen after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.remove(), 500);
            }, 1000);
        });
    }

    // Initialize page with fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});