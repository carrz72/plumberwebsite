// Main JavaScript file for Carr Denzy Plumbing & Gas website - Performance Optimized

// Performance utilities
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

document.addEventListener('DOMContentLoaded', function () {
    // Optimize image loading
    const images = document.querySelectorAll('img[loading="lazy"]');

    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Initialize EmailJS only when needed
    let emailJSInitialized = false;
    const initEmailJS = () => {
        if (!emailJSInitialized && typeof emailjs !== 'undefined') {
            emailjs.init('CZK2hQByhNl9oaNMQ');
            emailJSInitialized = true;
        }
    };

    // Optimized smooth scrolling
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Event delegation for navigation links
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            smoothScroll(link.getAttribute('href'));
        }
    });

    // Optimized scroll handler with throttling
    const handleScroll = throttle(() => {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }, 16); // 60fps

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimized intersection observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve to prevent repeated animations
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add animate class to elements and observe them
    document.querySelectorAll('.service-content, .testimonial').forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });

    // Mobile menu optimization
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            menuOpen = !menuOpen;
            navLinks.classList.toggle('active', menuOpen);

            const icon = this.querySelector('span');
            if (icon) {
                icon.textContent = menuOpen ? 'close' : 'menu';
            }
        });

        // Close menu when clicking on nav links
        navLinks.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                menuOpen = false;
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('span');
                if (icon) {
                    icon.textContent = 'menu';
                }
            }
        });
    }

    // Optimized outside click handler
    document.addEventListener('click', function (e) {
        if (menuOpen && !e.target.closest('nav')) {
            menuOpen = false;
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('span');
                if (icon) {
                    icon.textContent = 'menu';
                }
            }
        }
    });

    // Optimized form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Initialize EmailJS only when form is submitted
            initEmailJS();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (!name || !email || !message) {
                showFeedback('Please fill in all required fields.', 'error');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            showFeedback('Sending your message...', 'loading');

            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                phone: phone,
                service: service,
                message: message,
                to_name: 'Carr Denzy Plumbing & Gas'
            };

            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_6k5jfur', 'template_abcdefg', templateParams)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showFeedback('Thank you for your message! We will get back to you soon.', 'success');
                        contactForm.reset();
                    }, function (error) {
                        console.log('FAILED...', error);
                        showFeedback('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                    })
                    .finally(function () {
                        // Reset button state
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    });
            }
        });
    }

    // Optimized feedback function
    function showFeedback(message, type) {
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `form-feedback ${type}`;
            feedback.style.display = 'block';

            if (type === 'success' || type === 'error') {
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Optimized portfolio modal with event delegation
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('caption');
    const modalContent = document.querySelector('.modal-content');
    let currentImageIndex = 0;
    let imageArray = [];

    // Build image array once
    const portfolioImages = document.querySelectorAll('.portfolio-imgs img');
    portfolioImages.forEach((img, index) => {
        imageArray.push({
            src: img.src,
            alt: img.alt
        });
    });

    // Event delegation for portfolio clicks
    document.addEventListener('click', function (e) {
        const portfolioImg = e.target.closest('.portfolio-imgs img');
        if (portfolioImg) {
            e.preventDefault();
            currentImageIndex = Array.from(portfolioImages).indexOf(portfolioImg);

            // Get the position of the clicked image
            const rect = portfolioImg.getBoundingClientRect();
            openModal(portfolioImg.src, portfolioImg.alt, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        }
    });

    // Modal controls
    document.addEventListener('click', function (e) {
        if (e.target.matches('.modal-close')) {
            closeModal();
        }
        if (e.target.matches('.modal-prev')) {
            changeImage(-1);
        }
        if (e.target.matches('.modal-next')) {
            changeImage(1);
        }
        if (e.target === modal) {
            closeModal();
        }
    });

    // Updated modal functions to position on top of portfolio section
    function openModal(src, alt, rect) {
        if (modal) {
            // Move modal to body element for proper overlay
            if (modal.parentElement !== document.body) {
                document.body.appendChild(modal);
            }

            // Show modal
            modal.style.display = 'block';

            // Get portfolio section position
            const portfolioSection = document.getElementById('portfolio');
            const portfolioRect = portfolioSection.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Position modal content at the top of the portfolio section
            if (modalContent) {
                modalContent.style.position = 'absolute';
                modalContent.style.top = (portfolioRect.top + scrollTop + 20) + 'px'; // 20px padding from top of portfolio
                modalContent.style.left = '50%';
                modalContent.style.width = '90%';
                modalContent.style.height = 'auto';
                modalContent.style.maxWidth = '800px';
                modalContent.style.transform = 'translateX(-50%)';
                modalContent.style.transition = 'all 0.3s ease-out';
                modalContent.style.zIndex = '10000';
            }

            // Set image src and caption
            modalImg.src = src;
            modalImg.style.opacity = '0';
            modalImg.style.maxHeight = '60vh'; // Limit height to stay within portfolio area
            caption.textContent = alt;

            // Prevent page scrolling when modal is open
            document.body.style.overflow = 'hidden';

            // Fade in the modal and image
            requestAnimationFrame(() => {
                modal.style.opacity = '1';

                // Fade in the image
                setTimeout(() => {
                    modalImg.style.opacity = '1';
                    modalImg.style.transition = 'opacity 0.3s ease';
                }, 50);
            });
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.opacity = '0';
            modalImg.style.opacity = '0';

            setTimeout(() => {
                modal.style.display = 'none';
                // Reset modal content position
                if (modalContent) {
                    modalContent.style.transition = 'none';
                }
                // Restore page scrolling
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    function changeImage(direction) {
        // Fade out current image
        modalImg.style.opacity = '0';

        setTimeout(() => {
            currentImageIndex += direction;

            if (currentImageIndex >= imageArray.length) {
                currentImageIndex = 0;
            }
            if (currentImageIndex < 0) {
                currentImageIndex = imageArray.length - 1;
            }

            if (modalImg && caption) {
                modalImg.src = imageArray[currentImageIndex].src;
                caption.textContent = imageArray[currentImageIndex].alt;

                // Fade in new image
                setTimeout(() => {
                    modalImg.style.opacity = '1';
                }, 50);
            }
        }, 200);
    }

    // Optimized keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal && modal.style.display === 'flex') {
            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    changeImage(-1);
                    break;
                case 'ArrowRight':
                    changeImage(1);
                    break;
            }
        }
    });

    // Quote button optimization
    const quoteButton = document.querySelector('#home button');
    if (quoteButton) {
        quoteButton.addEventListener('click', function () {
            smoothScroll('#contact');
        });
    }

    // Preload critical images
    const criticalImages = ['/images/background1.jpg', '/images/background6.jpg'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Service Worker registration for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}