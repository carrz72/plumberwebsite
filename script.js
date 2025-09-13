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

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('form');
    const modal = document.getElementById('imageModal');

    // 1. Header scroll effect
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial check

    // 2. Mobile navigation
    if (mobileMenuToggle && navLinks) {
        const menuIcon = mobileMenuToggle.querySelector('.material-symbols-outlined');

        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Update icon based on menu state
            if (navLinks.classList.contains('active')) {
                menuIcon.textContent = 'close';
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
            } else {
                menuIcon.textContent = 'menu';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.textContent = 'menu';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuIcon.textContent = 'menu';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.textContent = 'menu';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Contact Form with EmailJS
    if (contactForm) {
        // Initialize EmailJS - replace with your actual public key
        emailjs.init('CZK2hQByhNl9oaNMQ');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const feedbackDiv = document.getElementById('form-feedback');

            // Basic validation
            const name = contactForm.querySelector('#from_name').value;
            const email = contactForm.querySelector('#from_email').value;
            const message = contactForm.querySelector('#message').value;

            if (!name || !email || !message) {
                feedbackDiv.textContent = 'Please fill out all required fields.';
                feedbackDiv.className = 'form-feedback error';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            feedbackDiv.textContent = 'Sending your message...';
            feedbackDiv.className = 'form-feedback';

            // Replace with your Service ID and Template ID
            const serviceID = 'default_service';
            const templateID = 'template_abcdefg';

            emailjs.sendForm(serviceID, templateID, contactForm)
                .then(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    feedbackDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    feedbackDiv.className = 'form-feedback success';
                    contactForm.reset();
                    setTimeout(() => feedbackDiv.textContent = '', 5000);
                }, (err) => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    feedbackDiv.textContent = `Failed to send message. Error: ${JSON.stringify(err)}`;
                    feedbackDiv.className = 'form-feedback error';
                    setTimeout(() => feedbackDiv.textContent = '', 5000);
                });
        });
    }

    // 5. Portfolio Image Modal
    if (modal) {
        const modalImage = document.getElementById('modalImg');
        const modalCaption = document.getElementById('caption');
        const closeBtn = document.querySelector('.modal-close');
        const prevBtn = document.querySelector('.modal-prev');
        const nextBtn = document.querySelector('.modal-next');
        const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
        let currentIndex = 0;

        const openModal = (index) => {
            currentIndex = index;
            const item = portfolioItems[currentIndex];
            const img = item.querySelector('img');
            const captionText = img.alt || `Project ${currentIndex + 1}`;

            // Add loading state
            modal.style.display = 'flex';
            modalImage.style.opacity = '0';
            modalImage.src = img.src;
            modalCaption.textContent = captionText;
            document.body.style.overflow = 'hidden';

            // Show image when loaded
            modalImage.onload = () => {
                modalImage.style.opacity = '1';
            };
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        const showImage = (index) => {
            if (index >= portfolioItems.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = portfolioItems.length - 1;
            } else {
                currentIndex = index;
            }
            openModal(currentIndex);
        };

        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
                if (e.key === 'ArrowRight') showImage(currentIndex + 1);
            }
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    showImage(currentIndex + 1);
                } else {
                    // Swipe right - previous image  
                    showImage(currentIndex - 1);
                }
            }
        };
    }

    // 6. Intersection Observer for animations (reveal utilities)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade');

    if (!prefersReducedMotion && animatedElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Support optional stagger via parent [data-stagger]
                    const parent = el.closest('[data-stagger]');
                    if (parent && !el.dataset.staggerApplied) {
                        const step = parseInt(parent.dataset.stagger || '80', 10);
                        const children = Array.from(parent.children);
                        const index = children.indexOf(el);
                        el.style.transitionDelay = `${index * step}ms`;
                        el.dataset.staggerApplied = 'true';
                    }
                    el.classList.add('visible', 'is-visible');
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

        animatedElements.forEach(el => observer.observe(el));

        // Trigger any above-the-fold elements immediately
        requestAnimationFrame(() => {
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    el.classList.add('visible', 'is-visible');
                }
            });
        });
    } else {
        // Reduced motion or no elements: make them visible without animation
        animatedElements.forEach(el => el.classList.add('visible', 'is-visible'));
    }
});