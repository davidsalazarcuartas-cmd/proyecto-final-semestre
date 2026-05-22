document.addEventListener('DOMContentLoaded', () => {


    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');


    let mobileNav = document.querySelector('.mobile-nav');
    if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <button class="mobile-nav-close" aria-label="Cerrar menú">✕</button>
            <a href="#inicio">Inicio</a>
            <a href="#cafe">Nuestro Café</a>
            <a href="#productos">Productos</a>
            <a href="#historia">Historia</a>
            <a href="#preparacion">Preparación</a>
            <a href="#contacto">Contacto</a>
        `;
        document.body.appendChild(mobileNav);


        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });


        mobileNav.querySelector('.mobile-nav-close').addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    navToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    const revealElements = document.querySelectorAll(
        '.section-header, .cafe-grid, .products-grid, .why-grid, ' +
        '.history-layout, .methods-grid, .storage-box, .contact-layout, ' +
        '.product-card, .why-card, .method-card, .contact-block'
    );


    revealElements.forEach((el, index) => {
        el.classList.add('reveal');

        const children = el.querySelectorAll('.product-card, .why-card, .method-card, .contact-block');
        children.forEach((child, i) => {
            child.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Una vez visible, dejar de observar
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        if (heroContent) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (rate < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        }
    });


    const eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) {
        const text = eyebrow.textContent;
        eyebrow.textContent = '';
        eyebrow.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                eyebrow.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        setTimeout(typeWriter, 500);
    }


    const stats = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const finalText = el.textContent;
                const hasPercent = finalText.includes('%');
                const hasLetter = /[a-zA-Z]/.test(finalText);

                if (hasLetter) {

                    statsObserver.unobserve(el);
                    return;
                }

                const finalNum = parseInt(finalText.replace(/\D/g, ''));
                let current = 0;
                const duration = 1500;
                const increment = finalNum / (duration / 16);

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalNum) {
                        el.textContent = finalText;
                        clearInterval(counter);
                    } else {
                        el.textContent = Math.floor(current) + (hasPercent ? '%' : '');
                    }
                }, 16);

                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));


    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.product-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.product-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });


    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + nav.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Desactivar animaciones complejas
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
            el.style.transition = 'none';
        });

        const grain = document.querySelector('.hero-grain');
        if (grain) grain.style.animation = 'none';
    }

    console.log(' Café Aromas del Baché — Web cargada correctamente');
});
