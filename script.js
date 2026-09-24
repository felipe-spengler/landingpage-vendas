document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple reveal animation on scroll for product cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
    // Color picker logic
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state among siblings
            const parent = this.parentElement;
            parent.querySelectorAll('.color-option').forEach(s => {
                s.classList.remove('active');
                s.style.borderColor = 'transparent';
                if(s.title === 'Branca' || s.title === 'Branco' || s.title === 'Branco e Vermelho') {
                    s.style.boxShadow = '0 0 0 1px #ccc';
                } else {
                    s.style.boxShadow = 'none';
                }
            });
            this.classList.add('active');
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = 'none';

            // Change image
            const targetId = this.getAttribute('data-target');
            const newImg = this.getAttribute('data-img');
            const imgElement = document.getElementById(targetId);
            if (imgElement && imgElement.src !== newImg) {
                imgElement.style.opacity = '0.2';
                setTimeout(() => {
                    imgElement.src = newImg;
                    imgElement.style.opacity = '1';
                }, 200);
            }
        });
    });
});
