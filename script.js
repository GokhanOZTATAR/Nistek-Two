// ==========================================
// NISTEK OTOMOTIV - JAVASCRIPT
// Mobile Menu, Form Handling & Parts Filter
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE MENU TOGGLE ===
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav')) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
    
    // === PARTS CATALOG FILTER ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const partCards = document.querySelectorAll('.part-card');
    
    if (filterButtons.length > 0 && partCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                partCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // === IMAGE LIGHTBOX ===
    const siteImages = document.querySelectorAll('img:not([data-no-lightbox])');

    if (siteImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML =
            '<div class="image-lightbox-dialog">' +
            '<button class="image-lightbox-close" type="button" aria-label="Görseli kapat">×</button>' +
            '<img class="image-lightbox-image" src="" alt="">' +
            '<p class="image-lightbox-caption"></p>' +
            '</div>';

        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector('.image-lightbox-image');
        const lightboxCaption = lightbox.querySelector('.image-lightbox-caption');
        const lightboxClose = lightbox.querySelector('.image-lightbox-close');

        const closeLightbox = function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        const openLightbox = function(image) {
            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt || 'Büyütülmüş görsel';
            lightboxCaption.textContent = image.alt || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        siteImages.forEach(image => {
            image.classList.add('lightbox-enabled');
            image.setAttribute('tabindex', '0');
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', (image.alt || 'Görsel') + ' büyütmek için tıklayın');

            image.addEventListener('click', function() {
                openLightbox(image);
            });

            image.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openLightbox(image);
                }
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // === CONTACT FORM HANDLING ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                message: document.getElementById('message').value
            };
            
            // Basic validation
            if (!formData.name || !formData.phone) {
                alert('Lütfen ad soyad ve telefon numaranızı giriniz.');
                return;
            }
            
            // Show success message
            alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.\n\n' +
                  'Ad Soyad: ' + formData.name + '\n' +
                  'Telefon: ' + formData.phone);
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Mesajınız başarıyla gönderildi!');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
            // });
        });
    }
    
    // === SCROLL ANIMATIONS ===
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
    const animatedElements = document.querySelectorAll(
        '.service-card, .feature-card, .value-card, ' +
        '.trust-item, .contact-info-card, .quick-contact-card, ' +
        '.mv-card, .cert-card, .service-detail-card, .part-card, .highlight-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // === HEADER SCROLL EFFECT ===
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            header.style.padding = '1rem 0';
        } else {
            header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.04)';
            header.style.padding = '1.25rem 0';
        }
        
        lastScroll = currentScroll;
    });
    
    // === SET MINIMUM DATE FOR APPOINTMENT ===
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        
        dateInput.min = `${year}-${month}-${day}`;
    }
    
});
