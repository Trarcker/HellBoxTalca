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

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // --- DATOS DEL EQUIPAMIENTO CON FOTOS MULTIPLES ---
    const equipData = {
        'peso-libre': {
            title: 'PESO LIBRE',
            items: [
                { 
                    name: 'Barras Olímpicas', 
                    images: [
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000',
                        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
                        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Discos Bumper', 
                    images: [
                        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Mancuernas de Alto Gramaje', 
                    images: [
                        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000',
                        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Bancos y Racks Heavy Duty', 
                    images: [
                        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000',
                        'https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?q=80&w=1000'
                    ]
                }
            ]
        },
        'musculacion': {
            title: 'MUSCULACIÓN',
            items: [
                { 
                    name: 'Máquinas Especializadas', 
                    images: [
                        'https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?q=80&w=1000',
                        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Sistemas de Poleas', 
                    images: [
                        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Prensa 45°', 
                    images: [
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Extensiones & Femoral', 
                    images: [
                        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000'
                    ]
                }
            ]
        },
        'cardio': {
            title: 'CARDIO',
            items: [
                { 
                    name: 'Caminadoras Profesionales', 
                    images: [
                        'https://images.unsplash.com/photo-1576678927484-cc909957088c?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Bicicletas Spinning', 
                    images: [
                        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Elípticas de Alto Rendimiento', 
                    images: [
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000'
                    ]
                }
            ]
        },
        'funcional': {
            title: 'FUNCIONAL',
            items: [
                { 
                    name: 'Espacio Abierto y Césped Sintético', 
                    images: [
                        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Kettlebells & Balones Medicinales', 
                    images: [
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000'
                    ]
                },
                { 
                    name: 'Entrenamiento Dinámico', 
                    images: [
                        'https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?q=80&w=1000'
                    ]
                }
            ]
        }
    };

    // --- ELEMENTOS DEL MODAL DE DOS COLUMNAS ---
    const modal = document.getElementById('equipModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    const towerMenu = document.getElementById('towerMenu');
    const viewerTitle = document.getElementById('viewerTitle');
    const mainImage = document.getElementById('mainImage');
    const viewerThumbnails = document.getElementById('viewerThumbnails');
    const equipCards = document.querySelectorAll('.equip-card');

    let currentCategoryData = null;

    // Actualiza la imagen principal y la miniatura activa
    const setMainImage = (src, activeThumbIndex = 0) => {
        mainImage.style.opacity = '0.3';
        setTimeout(() => {
            mainImage.src = src;
            mainImage.style.opacity = '1';
        }, 150);

        const thumbs = viewerThumbnails.querySelectorAll('.thumb-item');
        thumbs.forEach((thumb, index) => {
            if (index === activeThumbIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    };

    // Carga los detalles de un elemento seleccionado de la torre
    const loadViewerItem = (item) => {
        viewerTitle.textContent = item.name;
        viewerThumbnails.innerHTML = '';

        if (item.images && item.images.length > 0) {
            setMainImage(item.images[0], 0);

            item.images.forEach((imgUrl, index) => {
                const thumb = document.createElement('div');
                thumb.className = `thumb-item ${index === 0 ? 'active' : ''}`;
                thumb.innerHTML = `<img src="${imgUrl}" alt="${item.name} thumbnail ${index + 1}">`;

                thumb.addEventListener('click', () => {
                    setMainImage(imgUrl, index);
                });

                viewerThumbnails.appendChild(thumb);
            });
        }
    };

    // Abre el modal renderizando la Torre de Opciones
    const openModal = (category) => {
        currentCategoryData = equipData[category];
        if (!currentCategoryData) return;

        modalTitle.textContent = currentCategoryData.title;
        towerMenu.innerHTML = '';

        currentCategoryData.items.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = `tower-item ${index === 0 ? 'active' : ''}`;
            btn.textContent = item.name;

            btn.addEventListener('click', () => {
                towerMenu.querySelectorAll('.tower-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadViewerItem(item);
            });

            towerMenu.appendChild(btn);
        });

        if (currentCategoryData.items.length > 0) {
            loadViewerItem(currentCategoryData.items[0]);
        }

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