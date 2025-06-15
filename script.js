// Main JavaScript file for Carr Denzy Plumbing & Gas website

// Optimized for LCP performance

// Immediate LCP optimization
(function () {
    // Critical hero section optimization
    const hero = document.getElementById('home');
    if (hero) {
        // Ensure hero renders immediately
        hero.style.visibility = 'visible';
        hero.style.opacity = '1';
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('CZK2hQByhNl9oaNMQ');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // EmailJS Form submission handling
    const btn = document.getElementById('button');
    const contactForm = document.getElementById('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Validation
            const name = document.getElementById('from_name').value;
            const email = document.getElementById('from_email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                showFeedback('Please fill in all required fields.', 'error');
                return;
            }

            btn.value = 'Sending...';
            btn.disabled = true;
            showFeedback('Sending your message...', 'loading');

            const serviceID = 'default_service';
            const templateID = 'template_abcdefg';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Send Message';
                    btn.disabled = false;
                    showFeedback('Thank you for your message! We will get back to you soon.', 'success');
                    contactForm.reset();
                }, (err) => {
                    btn.value = 'Send Message';
                    btn.disabled = false;
                    showFeedback('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                    console.error('EmailJS error:', err);
                });
        });
    }

    // Function to show feedback messages
    function showFeedback(message, type) {
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `form-feedback ${type}`;
            feedback.style.display = 'block';

            // Hide feedback after 5 seconds for success/error messages
            if (type === 'success' || type === 'error') {
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 5000);
            }
        }
    }// "Get a Quote" button functionality
    const quoteButton = document.querySelector('#home button');
    if (quoteButton) {
        quoteButton.addEventListener('click', function () {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Change icon
            const icon = this.querySelector('span');
            if (navLinks.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });
    }

    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.querySelector('span').textContent = 'menu';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.querySelector('span').textContent = 'menu';
            }
        }
    });
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and testimonials
    document.querySelectorAll('.service-content, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading states for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
    // Portfolio Image Modal/Lightbox functionality - Fixed for mobile
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const portfolioImages = document.querySelectorAll('.portfolio-imgs img');

    let currentImageIndex = 0;
    let imageArray = [];

    // Build image array for navigation - Fixed for mobile
    if (portfolioImages.length > 0) {
        portfolioImages.forEach((img, index) => {
            imageArray.push({
                src: img.src,
                alt: img.alt || `Portfolio image ${index + 1}`
            });

            // Add click event to each portfolio image container
            const container = img.closest('.portfolio-imgs');
            if (container) {
                container.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    currentImageIndex = index;
                    openModal(imageArray[index].src, imageArray[index].alt);
                });

                // Add cursor pointer style
                container.style.cursor = 'pointer';
            }
        });
    }

    // Open modal function
    function openModal(src, alt) {
        if (modal && modalImg) {
            modal.style.display = 'flex';
            modalImg.src = src;
            if (caption) caption.textContent = alt;
            document.body.style.overflow = 'hidden';

            // Add fade-in animation
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    }

    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    // Change image function (for navigation arrows) - Fixed
    function changeImage(direction) {
        if (imageArray.length === 0) return;

        currentImageIndex += direction;

        // Handle wraparound
        if (currentImageIndex >= imageArray.length) {
            currentImageIndex = 0;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = imageArray.length - 1;
        }

        // Update modal image and caption
        if (modalImg && imageArray[currentImageIndex]) {
            modalImg.src = imageArray[currentImageIndex].src;
            if (caption) {
                caption.textContent = imageArray[currentImageIndex].alt;
            }
        }
    }

    // Event listeners for modal controls - Improved for mobile
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });

        // Add touch support
        closeBtn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            changeImage(-1);
        });

        // Add touch support
        prevBtn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            changeImage(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            changeImage(1);
        });

        // Add touch support
        nextBtn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            changeImage(1);
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModal();
            }
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            }
            if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });

    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (modal) {
        modal.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        modal.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                changeImage(1);
            } else {
                // Swipe right - previous image
                changeImage(-1);
            }
        }
    }
});