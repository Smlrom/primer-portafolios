// ============================================================
// PORTAFOLIO - JAVASCRIPT OPTIMIZADO MEJORADO CON IA
// ============================================================

(() => {
    'use strict';

    // ----------------------------------------------------------
    // 1. Evita que el navegador restaure una posición antigua
    //    al recargar la página.
    // ----------------------------------------------------------
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const navigation = performance.getEntriesByType('navigation')[0];
    if (!navigation || navigation.type === 'reload' || navigation.type === 'navigate') {
        window.scrollTo(0, 0);
    }

    // ----------------------------------------------------------
    // 2. Elementos principales
    // ----------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.querySelector('.navbar');

    // ----------------------------------------------------------
    // 3. Menú hamburguesa
    // ----------------------------------------------------------
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        // Cierra el menú al elegir una sección.
        navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    // ----------------------------------------------------------
    // 4. Navbar al hacer scroll
    // ----------------------------------------------------------
    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };

        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    // ----------------------------------------------------------
    // 5. Aparición progresiva
    //    Un solo IntersectionObserver sustituye los listeners
    //    de scroll que existían antes.
    // ----------------------------------------------------------
    const revealItems = document.querySelectorAll('.section:not(#section-1), .reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        // Fallback para navegadores sin IntersectionObserver.
        revealItems.forEach(item => item.classList.add('visible'));
    }

    // La primera sección se muestra inmediatamente.
    const hero = document.getElementById('section-1');
    if (hero) hero.classList.add('visible');

    // ----------------------------------------------------------
    // 6. Typewriter
    //    Una sola función. La versión anterior estaba duplicada.
    // ----------------------------------------------------------
    const lineas = [
        { id: 'linea1', texto: 'Nombre: Saul Romero' },
        { id: 'linea2', texto: 'Correo: rokerton@gmail.com' },
        { id: 'linea3', texto: 'Rol: Desarrollador Full-Stack' },
        {
            id: 'descripcion',
            texto: 'Hola, soy un desarrollador web y mobile, autodidacta y curioso, que siempre busca aprender nuevas tecnologías y desafiar sus propios límites.'
        }
    ];

    let currentLinea = 0;
    let currentChar = 0;

    function escribirLinea() {
        if (currentLinea >= lineas.length) return;

        const linea = lineas[currentLinea];
        const contenedor = document.getElementById(linea.id);

        if (!contenedor) {
            currentLinea++;
            currentChar = 0;
            escribirLinea();
            return;
        }

        const textoSpan = contenedor.querySelector('.texto');
        const cursorSpan = contenedor.querySelector('.cursor');

        document.querySelectorAll('.cursor').forEach(cursor => {
            cursor.style.visibility = 'hidden';
        });

        if (cursorSpan) cursorSpan.style.visibility = 'visible';

        textoSpan.textContent = linea.texto.slice(0, currentChar);

        if (currentChar < linea.texto.length) {
            currentChar++;
            window.setTimeout(escribirLinea, 30);
            return;
        }

        if (cursorSpan) cursorSpan.style.visibility = 'hidden';
        currentLinea++;
        currentChar = 0;

        if (currentLinea < lineas.length) {
            window.setTimeout(escribirLinea, 400);
        }
    }

    // ----------------------------------------------------------
    // 7. Carrusel de imágenes
    // ----------------------------------------------------------
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;
    let slideTimer = null;

    function showNextSlide() {
        if (slides.length < 2) return;

        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }

    if (slides.length > 1) {
        slideTimer = window.setInterval(showNextSlide, 4000);
    }

    // ----------------------------------------------------------
    // 8. Inicio
    // ----------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        escribirLinea();

        // Evita un timer innecesario si la pestaña deja de existir.
        window.addEventListener('pagehide', () => {
            if (slideTimer) {
                window.clearInterval(slideTimer);
                slideTimer = null;
            }
        }, { once: true });
    });
})();


