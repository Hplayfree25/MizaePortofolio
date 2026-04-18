document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    const footer = document.getElementById('interactive-footer');
    if (footer) {
        const paintContainer = document.getElementById('paint-container');
        const draggableText = document.getElementById('draggable-text');
        const magneticCard = document.getElementById('magnetic-card');

        let isDragged = false;

        const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

        const createPaintDrop = (x, y) => {
            const drop = document.createElement('div');
            drop.className = 'paint-drop';
            drop.style.left = `${x}px`;
            drop.style.top = `${y}px`;

            const size = 20 + Math.random() * 60;
            drop.style.width = `${size}px`;
            drop.style.height = `${size}px`;
            drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            paintContainer.appendChild(drop);

            setTimeout(() => {
                if (drop.parentNode) drop.remove();
            }, 2000);
        };

        footer.addEventListener('click', (e) => {
            if (e.target.closest('.email-card')) return;

            const rect = footer.getBoundingClientRect();
            const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
            const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

            const dropsCount = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < dropsCount; i++) {
                setTimeout(() => {
                    createPaintDrop(x + (Math.random() * 40 - 20), y + (Math.random() * 20 - 10));
                }, i * 100);
            }
        });

        if (draggableText) {
            const text = draggableText.innerText.trim();
            draggableText.innerHTML = '';

            const letters = [];

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const span = document.createElement('span');
                span.innerText = char === ' ' ? '\u00A0' : char;
                span.className = 'drag-letter';
                span.style.cursor = 'grab';

                draggableText.appendChild(span);

                letters.push({
                    el: span,
                    x: 0, y: 0,
                    vx: 0, vy: 0,
                    isDragging: false,
                    startX: 0, startY: 0
                });
            }

            const spring = 0.1;
            const friction = 0.8;

            const updatePhysics = () => {
                letters.forEach(letter => {
                    if (!letter.isDragging) {
                        const ax = -letter.x * spring;
                        const ay = -letter.y * spring;
                        letter.vx += ax;
                        letter.vy += ay;
                        letter.vx *= friction;
                        letter.vy *= friction;

                        letter.x += letter.vx;
                        letter.y += letter.vy;
                    }

                    if (Math.abs(letter.x) > 0.1 || Math.abs(letter.y) > 0.1 || letter.isDragging) {
                        letter.el.style.transform = `translate(${letter.x}px, ${letter.y}px) rotate(${letter.x * 0.1}deg)`;
                    } else {
                        letter.el.style.transform = 'translate(0px, 0px) rotate(0deg)';
                    }
                });
                requestAnimationFrame(updatePhysics);
            };
            updatePhysics();

            let activeLetter = null;

            const startDrag = (e, index) => {
                activeLetter = letters[index];
                activeLetter.isDragging = true;
                activeLetter.el.style.cursor = 'grabbing';
                activeLetter.el.style.zIndex = '50';

                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                activeLetter.startX = clientX - activeLetter.x;
                activeLetter.startY = clientY - activeLetter.y;
            };

            const moveDrag = (e) => {
                if (!activeLetter) return;
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                const newX = clientX - activeLetter.startX;
                const newY = clientY - activeLetter.startY;

                if (Math.abs(newX - activeLetter.x) > 2 || Math.abs(newY - activeLetter.y) > 2) {
                    isDragged = true;
                }

                activeLetter.x = newX;
                activeLetter.y = newY;
            };

            const endDrag = () => {
                if (!activeLetter) return;
                activeLetter.isDragging = false;
                activeLetter.el.style.cursor = 'grab';
                activeLetter.el.style.zIndex = '1';
                activeLetter = null;

                setTimeout(() => { isDragged = false; }, 100);
            };

            letters.forEach((letter, index) => {
                letter.el.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    startDrag(e, index);
                });
                letter.el.addEventListener('touchstart', (e) => {
                    startDrag(e, index);
                }, { passive: false });
            });

            window.addEventListener('mousemove', moveDrag);
            window.addEventListener('touchmove', moveDrag, { passive: false });
            window.addEventListener('mouseup', endDrag);
            window.addEventListener('touchend', endDrag);
        }

        if (magneticCard) {
            magneticCard.addEventListener('mousemove', (e) => {
                if (isDragged) return;
                const rect = magneticCard.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                magneticCard.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            magneticCard.addEventListener('mouseleave', () => {
                magneticCard.style.transform = `translate(0px, 0px)`;
            });

            magneticCard.addEventListener('click', (e) => {
                if (isDragged) {
                    e.preventDefault();
                }
            });
        }
    }
});


