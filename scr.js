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

    const nav = document.getElementById('main-nav');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navPanel = document.querySelector('[data-nav-panel]');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const navCursor = document.querySelector('[data-nav-cursor]');
    const navLinkWrap = document.querySelector('[data-nav-links]');

    const setNavCursor = (link) => {
        if (!navCursor || !navLinkWrap || !link || !navLinkWrap.contains(link)) return;
        const wrapRect = navLinkWrap.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        navCursor.style.width = `${linkRect.width}px`;
        navCursor.style.transform = `translateX(${linkRect.left - wrapRect.left}px)`;
        navCursor.style.opacity = '1';
    };

    const setActiveNav = (id) => {
        navLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', active);
            link.classList.toggle('text-white', active);
            link.classList.toggle('text-zinc-400', !active);
        });

        const desktopActive = document.querySelector(`.nav-desktop [data-nav-link][href="#${id}"]`);
        setNavCursor(desktopActive);
    };

    if (nav) {
        const updateNavState = () => {
            nav.classList.toggle('scrolled', window.scrollY > 12);
        };

        updateNavState();
        window.addEventListener('scroll', updateNavState, { passive: true });
    }

    if (nav && navToggle && navPanel) {
        navToggle.addEventListener('click', () => {
            const open = !nav.classList.contains('menu-open');
            nav.classList.toggle('menu-open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('menu-open')) return;
            if (nav.contains(e.target)) return;
            nav.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            nav.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav && navToggle) {
                nav.classList.remove('menu-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        link.addEventListener('pointerenter', () => setNavCursor(link));
    });

    if (navLinkWrap) {
        navLinkWrap.addEventListener('pointerleave', () => {
            const activeDesktop = document.querySelector('.nav-desktop [data-nav-link].active');
            setNavCursor(activeDesktop);
        });
    }

    const sections = document.querySelectorAll('section[id]');
    if (sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible) setActiveNav(visible.target.id);
        }, { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] });

        sections.forEach(section => sectionObserver.observe(section));
    }

    window.addEventListener('resize', () => {
        const activeDesktop = document.querySelector('.nav-desktop [data-nav-link].active');
        setNavCursor(activeDesktop);
    }, { passive: true });

    const heroStage = document.querySelector('[data-hero-stage]');
    if (heroStage) {
        const moveHeroStage = (e) => {
            const rect = heroStage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroStage.style.setProperty('--stage-x', `${(x / rect.width) * 100}%`);
            heroStage.style.setProperty('--stage-y', `${(y / rect.height) * 100}%`);
        };

        heroStage.addEventListener('pointermove', moveHeroStage);
    }

    const iosCards = document.querySelectorAll('[data-ios-card]');
    iosCards.forEach(card => {
        const moveCard = (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) return;
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            card.style.setProperty('--ios-tilt-x', `${(px - 0.5) * 5}deg`);
            card.style.setProperty('--ios-tilt-y', `${(0.5 - py) * 5}deg`);
        };

        const resetCard = () => {
            card.style.setProperty('--ios-tilt-x', '0deg');
            card.style.setProperty('--ios-tilt-y', '0deg');
        };

        card.addEventListener('pointermove', moveCard);
        card.addEventListener('pointerleave', resetCard);
        card.addEventListener('pointercancel', resetCard);
    });

    const skillChips = document.querySelectorAll('[data-skill-chip]');
    skillChips.forEach(chip => {
        chip.addEventListener('click', () => {
            skillChips.forEach(item => item.classList.remove('is-active'));
            chip.classList.add('is-active');
        });
    });

    const heroCard = document.querySelector('[data-hero-card]');
    if (heroCard) {
        const moveHeroCard = (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = x / rect.width;
            const py = y / rect.height;
            const tiltX = (px - 0.5) * 12;
            const tiltY = (0.5 - py) * 12;

            heroCard.style.setProperty('--hero-x', `${px * 100}%`);
            heroCard.style.setProperty('--hero-y', `${py * 100}%`);
            heroCard.style.setProperty('--tilt-x', `${tiltX}deg`);
            heroCard.style.setProperty('--tilt-y', `${tiltY}deg`);
        };

        const resetHeroCard = () => {
            heroCard.style.setProperty('--hero-x', '50%');
            heroCard.style.setProperty('--hero-y', '50%');
            heroCard.style.setProperty('--tilt-x', '0deg');
            heroCard.style.setProperty('--tilt-y', '0deg');
        };

        heroCard.addEventListener('pointermove', moveHeroCard);
        heroCard.addEventListener('pointerleave', resetHeroCard);
        heroCard.addEventListener('pointercancel', resetHeroCard);
    }

});
