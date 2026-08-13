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

    // --- GALERÍA / MODAL DE EQUIPAMIENTO ---
    const equipData = {
        'peso-libre': {
            title: 'PESO LIBRE',
            items: [
                { name: 'Barras Olímpicas', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600' },
                { name: 'Discos Bumper', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' },
                { name: 'Mancuernas de Alto Gramaje', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600' },
                { name: 'Bancos y Racks Heavy Duty', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600' }
            ]
        },
        'musculacion': {
            title: 'MUSCULACIÓN',
            items: [
                { name: 'Máquinas Especializadas', img: 'https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?q=80&w=600' },
                { name: 'Sistemas de Poleas', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' },
                { name: 'Prensa 45°', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600' },
                { name: 'Extensiones & Femoral', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600' }
            ]
        },
        'cardio': {
            title: 'CARDIO',
            items: [
                { name: 'Caminadoras Profesionales', img: 'https://images.unsplash.com/photo-1576678927484-cc909957088c?q=80&w=600' },
                { name: 'Bicicletas Spinning', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600' },
                { name: 'Elípticas de Alto Rendimiento', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600' }
            ]
        },
        'funcional': {
            title: 'FUNCIONAL',
            items: [
                { name: 'Espacio Abierto y Césped Sintético', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600' },
                { name: 'Kettlebells & Balones Medicinales', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600' },
                { name: 'Entrenamiento Dinámico', img: 'https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?q=80&w=600' }
            ]
        }
    };

    const modal = document.getElementById('equipModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalGallery = document.getElementById('modalGallery');
    const modalClose = document.getElementById('modalClose');
    const equipCards = document.querySelectorAll('.equip-card');

    const openModal = (category) => {
        const data = equipData[category];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalGallery.innerHTML = '';

        data.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'modal-item';
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name}</p>
            `;
            modalGallery.appendChild(itemElement);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    equipCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            openModal(category);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});