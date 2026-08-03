document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Sticky Navbar Blur & Mobile Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    /* ==========================================================================
       Intersection Observer for Scroll Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Gallery Filtering
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // match transition duration
                }
            });
        });
    });

    /* ==========================================================================
       Lightbox for Gallery
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgUrl = item.querySelector('img').src;
            const text = item.querySelector('.overlay-text').innerText;
            
            lightboxImg.src = imgUrl;
            lightboxCaption.innerText = text;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    closeLightbox.addEventListener('click', closeLightboxFunc);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFunc();
    });

    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /* ==========================================================================
       Testimonial Carousel (Simple Implementation)
       ========================================================================== */
    const testimonials = [
        {
            quote: "\"The saree I ordered for my wedding was breathtaking. The attention to detail in the hand-painted lotuses made me feel like royalty. A true masterpiece.\"",
            name: "Priya S."
        },
        {
            quote: "\"I commissioned a portrait of my parents for their anniversary. The emotion captured in the watercolors brought them to tears. Exceptional talent.\"",
            name: "Michael R."
        },
        {
            quote: "\"My custom kurti is now my favorite piece of clothing. It's not just a garment; it's a piece of wearable art. The fabric quality is also superb.\"",
            name: "Aisha K."
        }
    ];

    let currentTestimonial = 0;
    const carouselContainer = document.querySelector('.testimonial-carousel');

    function createTestimonialHTML(index) {
        return `
            <div class="testimonial-slide active">
                <p class="quote-text">${testimonials[index].quote}</p>
                <h5 class="client-name">${testimonials[index].name}</h5>
                <div class="stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
            </div>
        `;
    }

    // Auto rotate testimonials
    if(carouselContainer) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            carouselContainer.innerHTML = createTestimonialHTML(currentTestimonial);
        }, 6000);
    }

    /* ==========================================================================
       FAQ Accordion
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Close other open items
            const openHeaders = document.querySelectorAll('.accordion-header.active');
            openHeaders.forEach(openHeader => {
                if (openHeader !== header) {
                    openHeader.classList.remove('active');
                    openHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current item
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* ==========================================================================
       Form Validation & Submission Simulation
       ========================================================================== */
    const customForm = document.getElementById('custom-order-form');
    const formMessage = document.querySelector('.form-message');

    if (customForm) {
        customForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = customForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending Inquiry...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                customForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                
                formMessage.style.color = '#B76E79'; // Rose gold
                formMessage.innerText = 'Thank you! Your custom inquiry has been received. Our artist will contact you shortly.';
                
                setTimeout(() => {
                    formMessage.innerText = '';
                }, 5000);
            }, 1500);
        });
    }

});
