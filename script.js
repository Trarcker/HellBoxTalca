document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA MENÚ MÓVIL ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Cerrar menú automáticamente al presionar un link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    // --- REVELADO DINÁMICO AL HACER SCROLL ---
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 1.15;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };

    // Eventos para ejecutar el revelado
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
});