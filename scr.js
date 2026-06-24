document.addEventListener('DOMContentLoaded', () => {
    const getLang = () => {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'en' || urlLang === 'id') {
            return urlLang;
        }
        return 'id';
    };

    const renderLocalization = () => {
        const lang = getLang();
        const my = portfolioData[lang];
        if (!my) return;

        document.documentElement.lang = lang;
        document.title = `${my.name} - Portfolio`;

        const navBrand = document.getElementById('nav-brand');
        if (navBrand) navBrand.setAttribute('aria-label', my.nav_home);

        const linkHome = document.getElementById('nav-link-home');
        if (linkHome) linkHome.textContent = my.nav_home;
        const linkSkills = document.getElementById('nav-link-skills');
        if (linkSkills) linkSkills.textContent = my.nav_skills;
        const linkProjects = document.getElementById('nav-link-projects');
        if (linkProjects) linkProjects.textContent = my.nav_projects;

        const linkMobileHome = document.getElementById('nav-link-mobile-home');
        if (linkMobileHome) linkMobileHome.textContent = my.nav_home;
        const linkMobileSkills = document.getElementById('nav-link-mobile-skills');
        if (linkMobileSkills) linkMobileSkills.textContent = my.nav_skills;
        const linkMobileProjects = document.getElementById('nav-link-mobile-projects');
        if (linkMobileProjects) linkMobileProjects.textContent = my.nav_projects;

        const updateLangBtnClasses = (btn, isActive) => {
            if (!btn) return;
            btn.className = isActive 
                ? 'rounded-xl px-3 py-2 text-xs font-black transition bg-cyan-300 text-black' 
                : 'rounded-xl px-3 py-2 text-xs font-black transition text-zinc-400 hover:text-white';
        };

        const updateLangMobileBtnClasses = (btn, isActive) => {
            if (!btn) return;
            btn.className = isActive
                ? 'rounded-2xl px-4 py-3 text-center text-xs font-black transition bg-cyan-300 text-black'
                : 'rounded-2xl px-4 py-3 text-center text-xs font-black transition bg-white/[0.04] text-zinc-400';
        };

        updateLangBtnClasses(document.getElementById('lang-btn-id'), lang === 'id');
        updateLangBtnClasses(document.getElementById('lang-btn-en'), lang === 'en');
        updateLangMobileBtnClasses(document.getElementById('lang-btn-mobile-id'), lang === 'id');
        updateLangMobileBtnClasses(document.getElementById('lang-btn-mobile-en'), lang === 'en');

        const heroImg = document.getElementById('hero-img');
        if (heroImg) {
            heroImg.src = my.photo;
            heroImg.alt = my.name;
        }

        const heroT1 = document.getElementById('hero-title-1');
        if (heroT1) heroT1.textContent = my.hero_title_1;
        const heroT2 = document.getElementById('hero-title-2');
        if (heroT2) heroT2.textContent = my.hero_title_2;
        const heroDesc = document.getElementById('hero-desc');
        if (heroDesc) heroDesc.textContent = my.hero_desc;

        const heroBtnExp = document.getElementById('hero-btn-explore');
        if (heroBtnExp) heroBtnExp.textContent = my.hero_btn;
        const heroBtnSk = document.getElementById('hero-btn-skills');
        if (heroBtnSk) heroBtnSk.textContent = lang === 'en' ? 'Skills' : 'Keahlian';

        const skT1 = document.getElementById('sk-title-1');
        if (skT1) skT1.textContent = my.sk_title_1;
        const skT2 = document.getElementById('sk-title-2');
        if (skT2) skT2.textContent = my.sk_title_2;
        const skDesc = document.getElementById('sk-desc');
        if (skDesc) skDesc.textContent = my.sk_desc;

        const skGrid = document.getElementById('sk-grid');
        if (skGrid) {
            skGrid.innerHTML = my.sk_list.map((s, idx) => `
                <button type="button" class="ios-chip reveal group min-h-24 rounded-[1.35rem] px-5 py-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" style="transition-delay: ${idx * 45}ms" data-skill-chip>
                    <span class="block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 transition duration-300 group-hover:text-cyan-200">0${idx + 1}</span>
                    <span class="mt-3 block text-xl font-black text-white transition duration-300 group-hover:translate-x-1">${s}</span>
                </button>
            `).join('');

            const skillChips = skGrid.querySelectorAll('[data-skill-chip]');
            skillChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    skillChips.forEach(item => item.classList.remove('is-active'));
                    chip.classList.add('is-active');
                });
            });
        }

        const pjT1 = document.getElementById('pj-title-1');
        if (pjT1) pjT1.textContent = my.pj_title_1;
        const pjT2 = document.getElementById('pj-title-2');
        if (pjT2) pjT2.textContent = my.pj_title_2;

        const pjGrid = document.getElementById('pj-grid');
        if (pjGrid) {
            if (!my.pj_list || my.pj_list.length === 0) {
                pjGrid.className = '';
                pjGrid.innerHTML = `
                    <div class="ios-card reveal p-10 text-center">
                        <h3 class="text-2xl font-black text-zinc-400">${lang === 'en' ? 'Coming Soon' : 'Segera Hadir'}</h3>
                    </div>
                `;
            } else {
                pjGrid.className = 'grid grid-cols-1 gap-4 md:grid-cols-2';
                pjGrid.innerHTML = my.pj_list.map((p, idx) => `
                    <button type="button" class="ios-card ios-project-card reveal group flex min-h-[20rem] flex-col items-start overflow-hidden p-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 sm:p-6" style="transition-delay: ${idx * 60}ms" onclick="openProj(${idx})" data-ios-card>
                        ${p.img ? `
                            <div class="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-[1.35rem] bg-black/40">
                                <img src="${p.img}" alt="${p.t}" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
                            </div>
                        ` : ''}
                        <div class="flex w-full flex-1 flex-col">
                            <h3 class="text-2xl font-black tracking-normal text-white transition duration-300 group-hover:text-cyan-100 md:text-3xl">
                                ${p.t}
                            </h3>
                            <p class="mt-4 flex-1 text-sm leading-7 text-zinc-400 sm:text-base">
                                ${p.d}
                            </p>
                            <div class="mt-7 flex flex-wrap gap-2">
                                ${p.tg.map(tag => `
                                    <span class="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold text-zinc-300 transition duration-300 group-hover:border-cyan-300/30 group-hover:text-white">
                                        ${tag}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </button>
                `).join('');

                const pjCards = pjGrid.querySelectorAll('[data-ios-card]');
                pjCards.forEach(card => {
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
            }
        }

        const modalCloseBtn = document.getElementById('modal-close-btn');
        if (modalCloseBtn) modalCloseBtn.textContent = my.close_detail;

        const ftHeadline = document.getElementById('footer-headline');
        if (ftHeadline) ftHeadline.textContent = my.footer_headline;

        const ftDesc = document.getElementById('footer-desc');
        if (ftDesc) ftDesc.textContent = my.footer_desc;

        const ftNavHome = document.getElementById('footer-nav-home');
        if (ftNavHome) ftNavHome.textContent = my.nav_home;
        const ftNavSkills = document.getElementById('footer-nav-skills');
        if (ftNavSkills) ftNavSkills.textContent = my.nav_skills;
        const ftNavProjects = document.getElementById('footer-nav-projects');
        if (ftNavProjects) ftNavProjects.textContent = my.nav_projects;

        const ftEmail = document.getElementById('footer-email');
        if (ftEmail) {
            ftEmail.href = `mailto:${my.email}`;
            ftEmail.textContent = my.email;
        }

        const ftBackToTop = document.getElementById('footer-back-to-top');
        if (ftBackToTop) ftBackToTop.textContent = my.back_to_top;

        const ftCopyright = document.getElementById('footer-copyright');
        if (ftCopyright) {
            const currentYear = new Date().getFullYear();
            ftCopyright.innerHTML = `&copy; ${currentYear} ${my.all_rights_reserved}`;
        }
    };

    renderLocalization();

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

    const iosCards = document.querySelectorAll('[data-ios-card]:not(#pj-grid [data-ios-card])');
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

window.openProj = function(idx) {
    const lang = document.documentElement.lang || 'id';
    const my = portfolioData[lang];
    const p = my.pj_list[idx];
    if(!p) return;

    document.body.style.overflow = 'hidden';

    const nav = document.getElementById('main-nav') || document.querySelector('nav');
    if(nav) {
        nav.classList.add('nav-hidden');
    }

    document.getElementById('pj-modal-title').textContent = p.t;
    document.getElementById('pj-modal-desc').textContent = p.full_d || p.d;

    const imgContainer = document.getElementById('pj-modal-img-container');
    const imgEl = document.getElementById('pj-modal-img');
    const iconEl = document.getElementById('pj-modal-icon');

    if (p.img) {
        imgEl.src = p.img;
        imgContainer.classList.remove('hidden');
        iconEl.classList.add('hidden');
    } else {
        imgEl.src = '';
        imgContainer.classList.add('hidden');
        iconEl.classList.remove('hidden');
    }

    const tagsContainer = document.getElementById('pj-modal-tags');
    tagsContainer.innerHTML = '';
    p.tg.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-100';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    const modal = document.getElementById('pj-modal');
    const content = document.getElementById('pj-modal-content');

    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        content.classList.remove('scale-[0.98]', 'opacity-0', 'translate-y-8');
        content.classList.add('scale-100', 'opacity-100', 'translate-y-0');
    }, 30);
};

window.closeProj = function() {
    document.body.style.overflow = '';

    const nav = document.getElementById('main-nav') || document.querySelector('nav');
    if(nav) {
        nav.classList.remove('nav-hidden');
    }

    const modal = document.getElementById('pj-modal');
    const content = document.getElementById('pj-modal-content');

    content.classList.remove('scale-100', 'opacity-100', 'translate-y-0');
    content.classList.add('scale-[0.98]', 'opacity-0', 'translate-y-8');

    setTimeout(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
    }, 500);
};
