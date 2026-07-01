document.addEventListener('DOMContentLoaded', () => {
    class PixelGridAnimation {
        constructor(canvas, contextName) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.contextName = contextName;
            this.gridSize = 15;
            this.cellSize = 8;
            this.gap = 2;
            this.padding = 1;
            
            canvas.width = 150;
            canvas.height = 150;
            
            this.cells = [];
            for (let r = 0; r < this.gridSize; r++) {
                this.cells[r] = [];
                for (let c = 0; c < this.gridSize; c++) {
                    this.cells[r][c] = { current: 0, target: 0.08 };
                }
            }
            
            this.state = 0;
            this.ticks = 0;
            this.stateDuration = 180;
            this.glitchTicks = 0;
            
            this.glyphs = {
                'A': [12, 18, 18, 30, 18, 18, 18],
                'B': [28, 18, 18, 28, 18, 18, 28],
                'C': [14, 16, 16, 16, 16, 16, 14],
                'D': [28, 18, 18, 18, 18, 18, 28],
                'E': [30, 16, 16, 28, 16, 16, 30],
                'G': [14, 16, 16, 22, 18, 18, 14],
                'I': [14, 4, 4, 4, 4, 4, 14],
                'L': [16, 16, 16, 16, 16, 16, 30],
                'O': [14, 18, 18, 18, 18, 18, 14],
                'P': [28, 18, 18, 28, 16, 16, 16],
                'S': [14, 16, 16, 14, 2, 2, 28],
                'U': [18, 18, 18, 18, 18, 18, 12],
                'X': [17, 10, 4, 10, 17, 17, 17],
                'Y': [17, 10, 4, 4, 4, 4, 4],
                '0': [14, 19, 21, 25, 18, 18, 14],
                '1': [4, 12, 4, 4, 4, 4, 14],
                '2': [14, 18, 2, 4, 8, 16, 30],
                '⚡': [4, 12, 28, 14, 6, 4, 0],
                '<': [2, 4, 8, 16, 8, 4, 2],
                '>': [8, 4, 2, 1, 2, 4, 8],
                'Δ': [4, 10, 10, 17, 17, 31, 0],
                '=': [0, 30, 0, 30, 0, 0, 0],
                ' ': [0, 0, 0, 0, 0, 0, 0]
            };
        }
        
        triggerTransition() {
            this.ticks = 0;
            this.state = 0;
            this.glitchTicks = 15;
        }
        
        setTarget(r, c, val) {
            if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
                this.cells[r][c].target = val;
            }
        }
        
        clearTargets() {
            for (let r = 0; r < this.gridSize; r++) {
                for (let c = 0; c < this.gridSize; c++) {
                    this.cells[r][c].target = 0.08;
                }
            }
        }
        
        drawGlyph(char) {
            const glyph = this.glyphs[char] || this.glyphs[' '];
            const startX = 5;
            const startY = 4;
            for (let r = 0; r < 7; r++) {
                const rowVal = glyph[r];
                for (let c = 0; c < 5; c++) {
                    const bit = (rowVal >> (4 - c)) & 1;
                    if (bit) {
                        this.setTarget(startY + r, startX + c, 0.9);
                    }
                }
            }
        }
        
        update() {
            if (this.glitchTicks > 0) {
                this.glitchTicks--;
                this.clearTargets();
                for (let i = 0; i < 40; i++) {
                    const r = Math.floor(Math.random() * this.gridSize);
                    const c = Math.floor(Math.random() * this.gridSize);
                    this.setTarget(r, c, Math.random() > 0.4 ? 0.95 : 0.15);
                }
                for (let r = 0; r < this.gridSize; r++) {
                    for (let c = 0; c < this.gridSize; c++) {
                        const cell = this.cells[r][c];
                        cell.current += (cell.target - cell.current) * 0.4;
                    }
                }
                this.render();
                return;
            }

            this.ticks++;
            
            if (this.ticks % this.stateDuration === 0) {
                this.state = (this.state + 1) % 3;
            }
            
            this.clearTargets();
            
            if (this.contextName === 'star-delta') {
                if (this.state === 0) {
                    this.drawGlyph('⚡');
                    if (Math.random() > 0.7) {
                        for (let r = 0; r < this.gridSize; r++) {
                            for (let c = 0; c < this.gridSize; c++) {
                                if (this.cells[r][c].target > 0.5) {
                                    this.cells[r][c].target = 0.4 + Math.random() * 0.6;
                                }
                            }
                        }
                    }
                } else if (this.state === 1) {
                    this.drawGlyph('Y');
                } else {
                    this.drawGlyph('Δ');
                }
            } else if (this.contextName === 'plc') {
                if (this.state === 0) {
                    const seq = ['P', 'L', 'C'];
                    const idx = Math.floor(this.ticks / 40) % 3;
                    this.drawGlyph(seq[idx]);
                } else if (this.state === 1) {
                    const center = 7;
                    const radius = Math.floor(this.ticks / 10) % 8;
                    for (let r = 0; r < this.gridSize; r++) {
                        for (let c = 0; c < this.gridSize; c++) {
                            const dist = Math.max(Math.abs(r - center), Math.abs(c - center));
                            if (dist === radius) {
                                this.setTarget(r, c, 0.85);
                            }
                        }
                    }
                } else {
                    const col = this.ticks % this.gridSize;
                    for (let r = 0; r < this.gridSize; r++) {
                        const val = (Math.sin(r + this.ticks * 0.2) + 1) / 2;
                        if (val > 0.6) {
                            this.setTarget(r, col, 0.8);
                            this.setTarget((r + 5) % this.gridSize, (col + 7) % this.gridSize, 0.8);
                        }
                    }
                }
            } else if (this.contextName === 'api') {
                if (this.state === 0) {
                    const seq = ['A', 'P', 'I'];
                    const idx = Math.floor(this.ticks / 40) % 3;
                    this.drawGlyph(seq[idx]);
                } else if (this.state === 1) {
                    const row = 7;
                    const pos = (this.ticks * 2) % (this.gridSize + 4) - 2;
                    this.setTarget(row, pos, 0.9);
                    this.setTarget(row, pos - 1, 0.6);
                    this.setTarget(row, pos - 2, 0.3);
                    
                    const row2 = 4;
                    const pos2 = (this.ticks * 2 + 8) % (this.gridSize + 4) - 2;
                    this.setTarget(row2, pos2, 0.9);
                    this.setTarget(row2, pos2 - 1, 0.6);
                    
                    const row3 = 10;
                    const pos3 = (this.ticks * 2 + 4) % (this.gridSize + 4) - 2;
                    this.setTarget(row3, pos3, 0.9);
                    this.setTarget(row3, pos3 - 1, 0.6);
                } else {
                    this.drawGlyph('<');
                    this.drawGlyph('>');
                }
            } else if (this.contextName === 'db') {
                if (this.state === 0) {
                    const seq = ['D', 'B'];
                    const idx = Math.floor(this.ticks / 60) % 2;
                    this.drawGlyph(seq[idx]);
                } else if (this.state === 1) {
                    const rows = [3, 7, 11];
                    rows.forEach(r => {
                        for (let c = 3; c <= 11; c++) {
                            this.setTarget(r, c, 0.85);
                        }
                        this.setTarget(r + 1, 3, 0.85);
                        this.setTarget(r + 1, 11, 0.85);
                    });
                } else {
                    const scanLine = Math.floor(this.ticks / 6) % this.gridSize;
                    for (let c = 0; c < this.gridSize; c++) {
                        this.setTarget(scanLine, c, 0.9);
                        this.setTarget((scanLine - 1 + this.gridSize) % this.gridSize, c, 0.4);
                    }
                }
            } else if (this.contextName === 'frontend') {
                if (this.state === 0) {
                    const seq = ['J', 'S', 'C'];
                    const idx = Math.floor(this.ticks / 40) % 3;
                    this.drawGlyph(seq[idx]);
                } else if (this.state === 1) {
                    const angle = this.ticks * 0.1;
                    const cx = 7 + Math.round(Math.cos(angle) * 4);
                    const cy = 7 + Math.round(Math.sin(angle) * 4);
                    this.setTarget(cy, cx, 0.95);
                    this.setTarget(cy - 1, cx, 0.5);
                    this.setTarget(cy, cx - 1, 0.5);
                } else {
                    const center = 7;
                    const size = Math.floor(this.ticks / 12) % 6;
                    this.setTarget(center, center, 0.9);
                    for (let i = 1; i <= size; i++) {
                        this.setTarget(center - i, center, 0.8);
                        this.setTarget(center + i, center, 0.8);
                        this.setTarget(center, center - i, 0.8);
                        this.setTarget(center, center + i, 0.8);
                    }
                }
            } else if (this.contextName === 'responsive') {
                if (this.state === 0) {
                    const seq = ['U', 'X'];
                    const idx = Math.floor(this.ticks / 60) % 2;
                    this.drawGlyph(seq[idx]);
                } else if (this.state === 1) {
                    const size = 3 + (Math.floor(this.ticks / 10) % 6);
                    const min = 7 - Math.floor(size / 2);
                    const max = 7 + Math.floor(size / 2);
                    for (let i = min; i <= max; i++) {
                        this.setTarget(min, i, 0.85);
                        this.setTarget(max, i, 0.85);
                        this.setTarget(i, min, 0.85);
                        this.setTarget(i, max, 0.85);
                    }
                } else {
                    for (let r = 2; r <= 12; r++) {
                        this.setTarget(r, 4, 0.85);
                        this.setTarget(r, 10, 0.85);
                    }
                    for (let c = 4; c <= 10; c++) {
                        this.setTarget(2, c, 0.85);
                        this.setTarget(12, c, 0.85);
                    }
                    this.setTarget(11, 7, 0.95);
                }
            }
            
            if (Math.random() > 0.85) {
                const rx = Math.floor(Math.random() * this.gridSize);
                const ry = Math.floor(Math.random() * this.gridSize);
                if (this.cells[ry][rx].target < 0.2) {
                    this.cells[ry][rx].current = 0.6;
                }
            }
            
            for (let r = 0; r < this.gridSize; r++) {
                for (let c = 0; c < this.gridSize; c++) {
                    const cell = this.cells[r][c];
                    cell.current += (cell.target - cell.current) * 0.18;
                }
            }
            
            this.render();
        }
        
        render() {
            this.ctx.clearRect(0, 0, 150, 150);
            
            for (let r = 0; r < this.gridSize; r++) {
                for (let c = 0; c < this.gridSize; c++) {
                    const val = this.cells[r][c].current;
                    const x = this.padding + c * (this.cellSize + this.gap);
                    const y = this.padding + r * (this.cellSize + this.gap);
                    
                    if (val > 0.1) {
                        this.ctx.fillStyle = `rgba(96, 165, 250, ${val})`;
                        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                        
                        if (val > 0.5) {
                            this.ctx.fillStyle = `rgba(255, 255, 255, ${(val - 0.5) * 2})`;
                            this.ctx.fillRect(x + 2, y + 2, 4, 4);
                        }
                    } else {
                        this.ctx.fillStyle = `rgba(255, 255, 255, 0.04)`;
                        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    }
                }
            }
        }
    }

    class FluidTextScrambler {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.tl = null;
        }
        setText(newText) {
            if (this.tl) {
                this.tl.kill();
            }
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.el.innerHTML = '';
            const spans = [];
            for (let i = 0; i < length; i++) {
                const span = document.createElement('span');
                span.className = 'inline-block';
                span.style.opacity = oldText[i] ? '1' : '0';
                span.style.transform = oldText[i] ? 'translateY(0)' : 'translateY(-4px)';
                const origChar = oldText[i] || ' ';
                span.textContent = origChar === ' ' ? '\u00A0' : origChar;
                this.el.appendChild(span);
                spans.push(span);
            }
            this.tl = gsap.timeline({
                onComplete: () => {
                    if (newText.length < oldText.length) {
                        this.el.innerHTML = newText.replace(/ /g, '\u00A0');
                    }
                    this.resolve();
                }
            });
            spans.forEach((span, idx) => {
                const toChar = newText[idx] || '';
                const delay = idx * 0.03;
                const scrambleObj = { progress: 0 };
                this.tl.to(scrambleObj, {
                    progress: 1,
                    duration: 0.2,
                    ease: "none",
                    onStart: () => {
                        span.classList.add('text-blue-600', 'font-mono');
                    },
                    onUpdate: () => {
                        span.textContent = this.chars[Math.floor(Math.random() * this.chars.length)];
                    },
                    onComplete: () => {
                        span.classList.remove('text-blue-600', 'font-mono');
                        const finalChar = toChar || ' ';
                        span.textContent = finalChar === ' ' ? '\u00A0' : finalChar;
                    }
                }, delay);
                this.tl.to(span, {
                    opacity: toChar ? 1 : 0,
                    y: toChar ? 0 : 4,
                    duration: 0.3,
                    ease: "power3.out"
                }, delay + 0.2);
            });
            return promise;
        }
    }

    let nameScrambler = null;
    let hoverState = false;
    let quoteTween = null;

    const initQuoteAnimation = () => {
        if (quoteTween) {
            if (quoteTween.scrollTrigger) {
                quoteTween.scrollTrigger.kill(true);
            }
            quoteTween.kill();
        }

        gsap.set('.quote-phrase', { color: 'rgba(24, 24, 27, 0.15)' });

        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        quoteTween = gsap.to('.quote-phrase', {
            color: '#18181b',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '#sk-quote',
                start: isMobile ? 'top 80%' : 'top top',
                end: isMobile ? 'bottom 40%' : '+=100%',
                pin: !isMobile,
                scrub: true
            }
        });
    };

    const getLang = () => {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'en' || urlLang === 'id') {
            return urlLang;
        }
        try {
            const stored = localStorage.getItem('portfolio-lang');
            if (stored === 'en' || stored === 'id') return stored;
        } catch (e) {}
        return 'en';
    };

    const persistLang = (lang) => {
        try { localStorage.setItem('portfolio-lang', lang); } catch (e) {}
    };

    const renderLocalization = () => {
        const lang = getLang();
        const my = portfolioData[lang];
        if (!my) return;

        document.documentElement.lang = lang;
        document.title = `${my.name} - Portfolio`;

        const navBrand = document.getElementById('nav-brand');
        if (navBrand) navBrand.setAttribute('aria-label', my.nav_home);

        const updateRollLink = (id, text) => {
            const el = document.getElementById(id);
            if (el) {
                el.setAttribute('aria-label', text);
                const isMobile = el.closest('.nav-mobile');
                if (isMobile) {
                    el.textContent = text;
                } else {
                    el.innerHTML = `<span class="nav-link-inner" aria-hidden="true"><span class="nav-link-text">${text}</span><span class="nav-link-text-hover">${text}</span></span>`;
                }
            }
        };
        updateRollLink('nav-link-home', my.nav_home);
        updateRollLink('nav-link-skills', my.nav_skills);
        updateRollLink('nav-link-projects', my.nav_projects);
        updateRollLink('nav-link-mobile-home', my.nav_home);
        updateRollLink('nav-link-mobile-skills', my.nav_skills);
        updateRollLink('nav-link-mobile-projects', my.nav_projects);

        const btnId = document.getElementById('lang-btn-id');
        const btnEn = document.getElementById('lang-btn-en');
        const handle = document.getElementById('lang-handle');
        const langBtn = document.getElementById('lang-toggle-btn');

        const setLangHandle = (toId) => {
            if (!handle) return;
            const btnEl = document.getElementById('lang-toggle-btn');
            if (!btnEl) return;
            const btnRect = btnEl.getBoundingClientRect();
            const handleRect = handle.getBoundingClientRect();
            // Start position is always px-0.5 (2px)
            const travel = btnRect.width - handleRect.width - 4;
            const targetX = toId ? 0 : Math.max(0, travel);
            gsap.to(handle, { x: targetX, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        };

        if (btnId && btnEn && handle) {
            const globeSvg = handle.querySelector('svg');
            if (lang === 'id') {
                btnId.classList.add('text-zinc-800');
                btnId.classList.remove('text-zinc-400');
                btnEn.classList.add('text-zinc-400');
                btnEn.classList.remove('text-zinc-800');
                setLangHandle(true);
                if (globeSvg) gsap.to(globeSvg, { rotation: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
            } else {
                btnId.classList.add('text-zinc-400');
                btnId.classList.remove('text-zinc-800');
                btnEn.classList.add('text-zinc-800');
                btnEn.classList.remove('text-zinc-400');
                setLangHandle(false);
                if (globeSvg) gsap.to(globeSvg, { rotation: 360, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
            }
        }

        const heroT2a = document.getElementById('hero-title-2-a');
        const heroT2b = document.getElementById('hero-title-2-b');
        if (heroT2a && heroT2b) {
            const nameParts = my.hero_title_2.split(' ');
            window.currentNamePartA = nameParts[0] || 'Revaldo';
            window.currentNamePartB = nameParts[1] || 'Anderson';
            if (!hoverState) {
                heroT2a.textContent = window.currentNamePartA;
                heroT2b.textContent = window.currentNamePartB;
            }
        }

        const subLeft = document.getElementById('hero-sub-left');
        if (subLeft) subLeft.textContent = my.hero_sub_left;
        const subRight = document.getElementById('hero-sub-right');
        if (subRight) subRight.textContent = my.hero_sub_right;

        const aboutP1 = document.getElementById('about-p1');
        if (aboutP1) aboutP1.innerHTML = my.about_p1;
        const aboutP2 = document.getElementById('about-p2');
        if (aboutP2) aboutP2.innerHTML = my.about_p2;

        const aboutBtnText = document.getElementById('about-btn-text');
        if (aboutBtnText) aboutBtnText.textContent = my.about_btn;

        const quoteSpans = document.querySelectorAll('#about-quote .quote-phrase');
        if (quoteSpans.length && my.quote_phrases) {
            quoteSpans.forEach((span, idx) => {
                if (my.quote_phrases[idx]) {
                    span.textContent = my.quote_phrases[idx];
                }
            });
        }

        const pjT1 = document.getElementById('pj-title-1');
        if (pjT1) pjT1.textContent = my.pj_title_1;
        const pjT2 = document.getElementById('pj-title-2');
        if (pjT2) pjT2.textContent = my.pj_title_2;

        const titleBtns = document.querySelectorAll('.project-title-btn');
        titleBtns.forEach((btn, idx) => {
            const p = my.pj_list[idx];
            if (p) {
                const textSpan = btn.querySelector('.project-title-text');
                if (textSpan) textSpan.textContent = p.t;
                const imgEl = document.getElementById(`pj-img-${idx}`);
                if (imgEl) imgEl.src = p.img;
            }
        });

        const pjSub = document.getElementById('pj-subheadline');
        if (pjSub) pjSub.textContent = my.pj_subheadline;

        const updateText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };
        updateText('pj-dark-slide-t0', my.pj_dark_slide_t0);
        updateText('pj-dark-card-t0-0', my.pj_dark_card_t0_0);
        updateText('pj-dark-card-d0-0', my.pj_dark_card_d0_0);
        updateText('pj-dark-card-t0-1', my.pj_dark_card_t0_1);
        updateText('pj-dark-card-d0-1', my.pj_dark_card_d0_1);

        updateText('pj-dark-slide-t1', my.pj_dark_slide_t1);
        updateText('pj-dark-card-t1-0', my.pj_dark_card_t1_0);
        updateText('pj-dark-card-d1-0', my.pj_dark_card_d1_0);
        updateText('pj-dark-card-t1-1', my.pj_dark_card_t1_1);
        updateText('pj-dark-card-d1-1', my.pj_dark_card_d1_1);

        updateText('pj-dark-slide-t2', my.pj_dark_slide_t2);
        updateText('pj-dark-card-t2-0', my.pj_dark_card_t2_0);
        updateText('pj-dark-card-d2-0', my.pj_dark_card_d2_0);
        updateText('pj-dark-card-t2-1', my.pj_dark_card_t2_1);
        updateText('pj-dark-card-d2-1', my.pj_dark_card_d2_1);
        updateText('expander-label-text', my.dark_expander_label);

        const cursorLabel = document.getElementById('cursor-label-text');
        if (cursorLabel) {
            cursorLabel.innerHTML = lang === 'en' ? 'View Work<br>Below' : 'Lihat Karya<br>Di Bawah';
        }

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

        ScrollTrigger.refresh();
    };

    renderLocalization();

    const toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
        const handle = document.getElementById('lang-handle');
        
        toggleBtn.addEventListener('pointerenter', () => {
            gsap.to(toggleBtn, { scale: 1.08, borderColor: '#a1a1aa', duration: 0.25, ease: 'power2.out' });
        });

        toggleBtn.addEventListener('pointerleave', () => {
            gsap.to(toggleBtn, { scale: 1, borderColor: '#e2e8f0', duration: 0.25, ease: 'power2.out' });
        });

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // springy click squeeze
            gsap.fromTo(toggleBtn, { scale: 0.9 }, { scale: 1.08, duration: 0.3, ease: 'back.out(2.0)', overwrite: 'auto' });
            gsap.to(toggleBtn, { scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.3, overwrite: 'auto' });
            
            const currentLang = document.documentElement.lang || 'en';
            const nextLang = currentLang === 'id' ? 'en' : 'id';
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lang=' + nextLang;
            window.history.pushState({ path: newUrl }, '', newUrl);
            persistLang(nextLang);
            renderLocalization();

            // spring active label highlight
            const activeLabel = document.getElementById(`lang-btn-${nextLang}`);
            if (activeLabel) {
                gsap.fromTo(activeLabel, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: 'back.out(2.0)' });
            }
        });
    }

    const bindLangLabel = (id, targetLang) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const currentLang = document.documentElement.lang || 'en';
                if (currentLang !== targetLang) {
                    // spring active label highlight on click
                    gsap.fromTo(el, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: 'back.out(2.0)' });
                    
                    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lang=' + targetLang;
                    window.history.pushState({ path: newUrl }, '', newUrl);
                    persistLang(targetLang);
                    renderLocalization();
                }
            });
        }
    };
    bindLangLabel('lang-btn-id', 'id');
    bindLangLabel('lang-btn-en', 'en');

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    const initScrollSpy = () => {
        const navLinkEls = Array.from(document.querySelectorAll('[data-nav-link][data-nav-target]'));
        if (!navLinkEls.length) return;

        const sections = [];
        navLinkEls.forEach(link => {
            const id = link.getAttribute('data-nav-target');
            const sec = document.getElementById(id);
            if (sec) sections.push({ id, el: sec, links: navLinkEls.filter(l => l.getAttribute('data-nav-target') === id) });
        });
        if (!sections.length) return;

        let currentId = null;

        const setActive = (id, fromClick) => {
            if (currentId === id && !fromClick) return;
            currentId = id;
            navLinkEls.forEach(l => {
                const isMatch = l.getAttribute('data-nav-target') === id;
                l.classList.toggle('active', isMatch);
            });
            if (mainNavTracker) mainNavTracker.update();
        };

        const spy = new IntersectionObserver((entries) => {
            let best = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const found = sections.find(s => s.el === entry.target);
                    if (found && (!best || entry.intersectionRatio > best.ratio)) {
                        best = { id: found.id, ratio: entry.intersectionRatio };
                    }
                }
            });
            if (best) setActive(best.id);
        }, {
            rootMargin: '-45% 0px -50% 0px',
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
        });

        sections.forEach(s => spy.observe(s.el));
        setActive(sections[0].id, true);

        return { setActive, refresh: () => setActive(currentId) };
    };

    const initSlidingCursor = (wrapSelector, cursorSelector, linkSelector) => {
        const wrap = document.querySelector(wrapSelector);
        const cursor = document.querySelector(cursorSelector);
        if (!wrap || !cursor) return null;

        const setCursor = (link, instant = false) => {
            if (!link) {
                gsap.to(cursor, { opacity: 0, duration: 0.2 });
                return;
            }
            const wrapRect = wrap.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            
            gsap.to(cursor, {
                left: linkRect.left - wrapRect.left,
                top: linkRect.top - wrapRect.top,
                width: linkRect.width,
                height: linkRect.height,
                opacity: 1,
                duration: instant ? 0 : 0.35,
                ease: "power3.out",
                overwrite: "auto"
            });
        };

        const links = wrap.querySelectorAll(linkSelector);
        links.forEach(link => {
            link.addEventListener('pointerenter', () => setCursor(link));
        });

        wrap.addEventListener('pointerleave', () => {
            const activeLink = wrap.querySelector(`${linkSelector}.active`);
            if (activeLink) {
                setCursor(activeLink);
            } else {
                gsap.to(cursor, { opacity: 0, duration: 0.2 });
            }
        });

        setTimeout(() => {
            const activeLink = wrap.querySelector(`${linkSelector}.active`);
            if (activeLink) {
                setCursor(activeLink, true);
            }
        }, 100);

        window.addEventListener('resize', () => {
            const activeLink = wrap.querySelector(`${linkSelector}.active`);
            if (activeLink) {
                setCursor(activeLink, true);
            }
        }, { passive: true });
        
        return {
            update: () => {
                const activeLink = wrap.querySelector(`${linkSelector}.active`);
                setCursor(activeLink);
            }
        };
    };

    const nav = document.getElementById('main-nav');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navPanel = document.querySelector('[data-nav-panel]');
    const navLinks = document.querySelectorAll('[data-nav-link]');

    let mainNavTracker = null;
    let langTracker = null;
    let darkTl = null;
    let scrollSpy = null;

    mainNavTracker = initSlidingCursor('[data-nav-links]', '[data-nav-cursor]', '[data-nav-link]');
    langTracker = initSlidingCursor('[data-lang-wrap]', '[data-lang-cursor]', 'a[id^="lang-btn-"]');

    scrollSpy = initScrollSpy();



    if (nav) {
        const updateNavState = () => {
            nav.classList.toggle('scrolled', window.scrollY > 12);
        };

        updateNavState();
        window.addEventListener('scroll', updateNavState, { passive: true });

        let lastScrollY = window.scrollY;
        let hideTimer = null;
        const onScrollHide = () => {
            const y = window.scrollY;
            if (hideTimer) cancelAnimationFrame(hideTimer);
            hideTimer = requestAnimationFrame(() => {
                const goingDown = y > lastScrollY;
                const pastHero = y > window.innerHeight * 0.6;
                if (goingDown && pastHero && y - lastScrollY > 6) {
                    nav.classList.add('nav-hidden');
                } else if (!goingDown && lastScrollY - y > 4) {
                    nav.classList.remove('nav-hidden');
                }
                lastScrollY = y;
            });
        };
        window.addEventListener('scroll', onScrollHide, { passive: true });

        window.addEventListener('resize', () => {
            nav.classList.remove('nav-hidden');
        }, { passive: true });
    }

    if (nav && navToggle && navPanel) {
        const line1 = navToggle.querySelector('.line-1');
        const line2 = navToggle.querySelector('.line-2');
        const line3 = navToggle.querySelector('.line-3');
        const toggleIcon = navToggle.querySelector('.nav-toggle-icon');

        let hamburgerTl = gsap.timeline({ paused: true });
        hamburgerTl.to(line1, { left: 6, duration: 0.15, ease: "power2.in" }, 0)
                   .to(line3, { left: 10, duration: 0.15, ease: "power2.in" }, 0)
                   .to(toggleIcon, { rotation: 180, duration: 0.45, ease: "power3.out" }, 0.15)
                   .to(line1, { left: 0, top: 6, width: 20, height: 2, rotation: 45, transformOrigin: "center center", borderRadius: "1px", duration: 0.45, ease: "back.out(1.2)" }, 0.15)
                   .to(line2, { opacity: 0, scaleY: 0, height: 0, duration: 0.3, ease: "power3.out" }, 0.15)
                   .to(line3, { left: 0, top: 6, width: 20, height: 2, rotation: -45, transformOrigin: "center center", borderRadius: "1px", duration: 0.45, ease: "back.out(1.2)" }, 0.15);

        let menuOpen = false;
        const toggleMenu = (open) => {
            menuOpen = open;
            nav.classList.toggle('menu-open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (open) {
                hamburgerTl.play();
                gsap.killTweensOf(navPanel);
                gsap.fromTo(navPanel, 
                    { height: 0, opacity: 0, scale: 0.95 },
                    { height: "auto", opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", pointerEvents: "auto", clearProps: "scale" }
                );
            } else {
                hamburgerTl.reverse();
                gsap.killTweensOf(navPanel);
                gsap.to(navPanel, { 
                    height: 0, 
                    opacity: 0, 
                    duration: 0.4, 
                    ease: "power3.inOut", 
                    pointerEvents: "none" 
                });
            }
        };

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(!menuOpen);
        });

        document.addEventListener('click', (e) => {
            if (!menuOpen) return;
            if (nav.contains(e.target)) return;
            toggleMenu(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            toggleMenu(false);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('data-nav-target');
                if (targetId && lenis) {
                    const target = document.getElementById(targetId);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { duration: 1.0, offset: -10 });
                    }
                }
                if (scrollSpy && targetId) scrollSpy.setActive(targetId, true);
                if (menuOpen) {
                    toggleMenu(false);
                }
            });
        });

        const matchDesktop = window.matchMedia('(min-width: 768px)');
        matchDesktop.addEventListener('change', (e) => {
            if (e.matches && menuOpen) toggleMenu(false);
        });
    }



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

    const heroT2a = document.getElementById('hero-title-2-a');
    const heroT2b = document.getElementById('hero-title-2-b');
    if (heroT2a && heroT2b) {
        const nameScramblerA = new FluidTextScrambler(heroT2a);
        const nameScramblerB = new FluidTextScrambler(heroT2b);
        const triggerEl = heroT2a.closest('.hero-title-wrapper') || heroT2a.closest('h1') || heroT2a;
        triggerEl.addEventListener('pointerenter', () => {
            if (!hoverState) {
                hoverState = true;
                triggerEl.classList.add('is-hovered');
                nameScramblerA.setText('Mizae');
                nameScramblerB.setText('');
            }
        });
        triggerEl.addEventListener('pointerleave', () => {
            if (hoverState) {
                hoverState = false;
                triggerEl.classList.remove('is-hovered');
                nameScramblerA.setText(window.currentNamePartA || 'Revaldo');
                nameScramblerB.setText(window.currentNamePartB || 'Anderson');
            }
        });
    }

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.to('.hero-shell > div:not(.hero-grid)', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hr',
            start: 'top top',
            end: 'bottom 40%',
            scrub: true
        }
    });

    gsap.to('.hero-grid', {
        y: 120,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hr',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    const aboutSk = document.getElementById('sk');
    if (aboutSk) {
        gsap.set('.about-title', { opacity: 0, y: -20 });
        gsap.set('.about-p1', { opacity: 0, x: -30 });
        gsap.set('.about-img-container', { opacity: 0, scale: 0.75, y: 30 });
        gsap.set('.about-p2', { opacity: 0, x: 30 });
        gsap.set('.about-btn', { opacity: 0, y: 20 });

        const skTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#sk',
                start: 'top 95%',
                end: 'bottom 40%',
                scrub: 0.6
            }
        });

        skTl.to('.about-img-container', { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 0)
            .to('.about-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 0.2)
            .to('.about-p1', { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' }, 0.4)
            .to('.about-p2', { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' }, 0.4)
            .to('.about-btn', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 0.6);
    }

    initQuoteAnimation();

    const aboutBtn = document.querySelector('[data-about-btn]');
    if (aboutBtn) {
        const fill = aboutBtn.querySelector('.about-btn-fill');
        const arrow = aboutBtn.querySelector('[data-about-arrow]');
        
        gsap.set(fill, { xPercent: -100, yPercent: 100 });
        
        aboutBtn.addEventListener('mouseenter', () => {
            gsap.killTweensOf([fill, arrow]);
            gsap.to(fill, { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power2.out' });
            
            gsap.timeline()
                .to(arrow, { x: 15, y: -15, opacity: 0, duration: 0.15, ease: 'power2.in' })
                .set(arrow, { x: -15, y: 15, color: '#ffffff' })
                .to(arrow, { x: 0, y: 0, opacity: 1, duration: 0.25, ease: 'power3.out' });
        });
        
        aboutBtn.addEventListener('mouseleave', () => {
            gsap.killTweensOf([fill, arrow]);
            gsap.to(fill, { xPercent: -100, yPercent: 100, duration: 0.3, ease: 'power2.out' });
            
            gsap.timeline()
                .to(arrow, { x: -15, y: 15, opacity: 0, duration: 0.15, ease: 'power2.in' })
                .set(arrow, { x: -15, y: 15, color: '#71717a' })
                .to(arrow, { x: 0, y: 0, opacity: 1, duration: 0.25, ease: 'power3.out' });
        });
    }

    const titleBtns = document.querySelectorAll('.project-title-btn');
    const slides = document.querySelectorAll('.project-image-slide');
    const imageBox = document.querySelector('[data-project-image-box]');
    const customCursor = document.querySelector('[data-custom-cursor]');
    const overlay = document.querySelector('[data-project-overlay]');

    if (titleBtns.length && slides.length && imageBox && customCursor && overlay) {
        gsap.set(overlay, { yPercent: 100 });

        titleBtns.forEach((btn, idx) => {
            const txt = btn.querySelector('.project-title-text');
            if (idx === 0) {
                gsap.set(txt, { color: '#18181b', scale: 1.0, opacity: 1, transformOrigin: 'left center' });
            } else {
                gsap.set(txt, { color: '#a1a1aa', scale: 0.85, opacity: 0.4, transformOrigin: 'left center' });
            }
        });

        const pjTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#pj',
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: 0.4,
                anticipatePin: 1
            }
        });

        pjTimeline.to(overlay, { yPercent: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
        
        pjTimeline.set(slides[0], { opacity: 0, zIndex: 9 }, 0.45);
        pjTimeline.set(slides[1], { opacity: 1, zIndex: 10 }, 0.45);
        pjTimeline.set(slides[2], { opacity: 0, zIndex: 9 }, 0.45);
        
        pjTimeline.to(overlay, { yPercent: -100, duration: 0.4, ease: 'power1.inOut' }, 0.5);
        pjTimeline.set(overlay, { yPercent: 100 }, 0.9);
        
        pjTimeline.to(titleBtns[0].querySelector('.project-title-text'), { color: '#a1a1aa', scale: 0.85, opacity: 0.4, duration: 0.45, ease: 'power2.inOut' }, 0);
        pjTimeline.to(titleBtns[1].querySelector('.project-title-text'), { color: '#18181b', scale: 1.0, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, 0.45);

        pjTimeline.to(overlay, { yPercent: 0, duration: 0.4, ease: 'power1.inOut' }, 1.1);
        
        pjTimeline.set(slides[0], { opacity: 0, zIndex: 9 }, 1.55);
        pjTimeline.set(slides[1], { opacity: 0, zIndex: 9 }, 1.55);
        pjTimeline.set(slides[2], { opacity: 1, zIndex: 10 }, 1.55);
        
        pjTimeline.to(overlay, { yPercent: -100, duration: 0.4, ease: 'power1.inOut' }, 1.6);
        pjTimeline.set(overlay, { yPercent: 100 }, 2.0);

        pjTimeline.to(titleBtns[1].querySelector('.project-title-text'), { color: '#a1a1aa', scale: 0.85, opacity: 0.4, duration: 0.45, ease: 'power2.inOut' }, 1.1);
        pjTimeline.to(titleBtns[2].querySelector('.project-title-text'), { color: '#18181b', scale: 1.0, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, 1.55);

        pjTimeline.to({}, { duration: 0.8 }, 2.0);

        titleBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const trigger = pjTimeline.scrollTrigger;
                if (!trigger) return;
                
                const progress = trigger.progress;
                let activeIdx = 0;
                if (progress > 0.366 && progress <= 0.733) {
                    activeIdx = 1;
                } else if (progress > 0.733) {
                    activeIdx = 2;
                }

                if (index === activeIdx) {
                    const darkTrigger = darkTl ? darkTl.scrollTrigger : null;
                    if (darkTrigger) {
                        const start = darkTrigger.start;
                        const end = darkTrigger.end;
                        const total = end - start;
                        let targetScroll = start;
                        if (index === 1) {
                            targetScroll = start + total * 0.35;
                        } else if (index === 2) {
                            targetScroll = start + total * 0.6;
                        }
                        lenis.scrollTo(targetScroll, { duration: 1.5 });
                    }
                } else {
                    const start = trigger.start;
                    const end = trigger.end;
                    const total = end - start;
                    let targetScroll = start;
                    if (index === 1) {
                        targetScroll = start + total * (1.2 / 2.8);
                    } else if (index === 2) {
                        targetScroll = start + total * (2.4 / 2.8);
                    }
                    lenis.scrollTo(targetScroll, { duration: 1.2 });
                }
            });
        });

        imageBox.addEventListener('click', () => {
            const overlayY = gsap.getProperty(overlay, 'yPercent');
            if (overlayY === 0) {
                const existing = document.getElementById('security-toast');
                if (existing) {
                    existing.remove();
                }

                const lang = getLang();
                const msg = lang === 'id' 
                    ? 'Perisai Keamanan Aktif — Seluruh koneksi dan data sistem terlindungi secara aman.'
                    : 'Security Shield Active — All system connections and data are safely protected.';

                const toast = document.createElement('div');
                toast.id = 'security-toast';
                toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 flex items-center gap-3 bg-zinc-950/90 border border-blue-500/30 text-white px-5 py-3.5 rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.15)] backdrop-blur-md transition-all duration-300 max-w-sm w-[90%] pointer-events-auto select-none';
                toast.style.opacity = '0';
                toast.style.transform = 'translate(-50%, 20px)';
                if (window.innerWidth >= 768) {
                    toast.style.transform = 'translateY(20px)';
                }

                toast.innerHTML = `
                    <svg class="h-6 w-6 text-blue-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <p class="text-xs font-semibold text-zinc-200 leading-normal">${msg}</p>
                `;

                document.body.appendChild(toast);

                const isMobile = window.innerWidth < 768;
                gsap.to(toast, {
                    opacity: 1,
                    x: isMobile ? '-50%' : 0,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out'
                });

                setTimeout(() => {
                    gsap.to(toast, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3,
                        ease: 'power3.in',
                        onComplete: () => {
                            toast.remove();
                        }
                    });
                }, 3000);
            } else {
                const trigger = pjTimeline.scrollTrigger;
                if (trigger) {
                    const progress = trigger.progress;
                    let activeIdx = 0;
                    if (progress > 0.366 && progress <= 0.733) {
                        activeIdx = 1;
                    } else if (progress > 0.733) {
                        activeIdx = 2;
                    }

                    const darkTrigger = darkTl ? darkTl.scrollTrigger : null;
                    if (darkTrigger) {
                        const start = darkTrigger.start;
                        const end = darkTrigger.end;
                        const total = end - start;
                        let targetScroll = start;
                        if (activeIdx === 1) {
                            targetScroll = start + total * 0.35;
                        } else if (activeIdx === 2) {
                            targetScroll = start + total * 0.6;
                        }
                        lenis.scrollTo(targetScroll, { duration: 1.5 });
                    }
                }
            }
        });

        if (!window.matchMedia('(pointer: coarse)').matches) {
            gsap.set(customCursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

            imageBox.addEventListener('pointerenter', () => {
                gsap.killTweensOf(customCursor);
                gsap.to(customCursor, { scale: 1, opacity: 1, duration: 0.15, ease: 'power1.out' });
            });

            imageBox.addEventListener('pointerleave', () => {
                gsap.killTweensOf(customCursor);
                gsap.to(customCursor, { scale: 0, opacity: 0, duration: 0.15, ease: 'power1.in' });
            });

            imageBox.addEventListener('pointermove', (e) => {
                const rect = imageBox.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                gsap.set(customCursor, { x: x, y: y });
            });
        } else {
            gsap.set(customCursor, { display: 'none' });
        }
    }

    const darkExpander = document.getElementById('pj-dark-expander');
    if (darkExpander) {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const initWidth = isMobile ? '90%' : '75%';
        const initHeight = isMobile ? '50vh' : '65vh';
        const initRadius = isMobile ? '2rem' : '3.5rem';

        const growTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#pj-dark-section',
                start: 'top bottom',
                end: 'top top',
                scrub: 0.5
            }
        });

        growTl.fromTo(darkExpander, 
            { width: initWidth, height: initHeight, borderRadius: initRadius },
            {
                width: '100%',
                height: '100vh',
                borderRadius: '0px',
                ease: 'none',
                duration: 1.0
            }
        )
        .to('#pj-dark-expander-label', {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power2.out'
        }, 0);

        gsap.set('.pj-dark-slide', { opacity: 0, y: 0, pointerEvents: 'none' });
        gsap.set('#dark-slide-0', { opacity: 1, pointerEvents: 'auto' });

        let currentActiveSlide = 0;

        darkTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#pj-dark-section',
                start: 'top top',
                end: '+=200%',
                pin: true,
                scrub: 0.5,
                toggleClass: { targets: '#main-nav', className: 'nav-in-dark' },
                onUpdate: (self) => {
                    const progress = self.progress;
                    let activeIdx = 0;
                    if (progress > 0.238 && progress <= 0.476) {
                        activeIdx = 1;
                    } else if (progress > 0.476) {
                        activeIdx = 2;
                    }

                    if (activeIdx !== currentActiveSlide) {
                        currentActiveSlide = activeIdx;
                        
                        const lang = getLang();
                        const my = portfolioData[lang];
                        if (!my) return;

                        const scrambleText = (id, targetText) => {
                            const el = document.getElementById(id);
                            if (!el) return;
                            if (!el.scrambler) {
                                el.scrambler = new FluidTextScrambler(el);
                            }
                            el.scrambler.setText(targetText);
                        };

                        if (activeIdx === 0) {
                            scrambleText('pj-dark-slide-t0', my.pj_dark_slide_t0);
                            scrambleText('pj-dark-card-t0-0', my.pj_dark_card_t0_0);
                            scrambleText('pj-dark-card-d0-0', my.pj_dark_card_d0_0);
                            scrambleText('pj-dark-card-t0-1', my.pj_dark_card_t0_1);
                            scrambleText('pj-dark-card-d0-1', my.pj_dark_card_d0_1);
                        } else if (activeIdx === 1) {
                            scrambleText('pj-dark-slide-t1', my.pj_dark_slide_t1);
                            scrambleText('pj-dark-card-t1-0', my.pj_dark_card_t1_0);
                            scrambleText('pj-dark-card-d1-0', my.pj_dark_card_d1_0);
                            scrambleText('pj-dark-card-t1-1', my.pj_dark_card_t1_1);
                            scrambleText('pj-dark-card-d1-1', my.pj_dark_card_d1_1);
                        } else if (activeIdx === 2) {
                            scrambleText('pj-dark-slide-t2', my.pj_dark_slide_t2);
                            scrambleText('pj-dark-card-t2-0', my.pj_dark_card_t2_0);
                            scrambleText('pj-dark-card-d2-0', my.pj_dark_card_d2_0);
                            scrambleText('pj-dark-card-t2-1', my.pj_dark_card_t2_1);
                            scrambleText('pj-dark-card-d2-1', my.pj_dark_card_d2_1);
                        }

                        const activeSlideEl = document.getElementById(`dark-slide-${activeIdx}`);
                        if (activeSlideEl) {
                            const slideCanvases = activeSlideEl.querySelectorAll('.pixel-grid-canvas');
                            slideCanvases.forEach(canvas => {
                                if (canvas.animInstance) {
                                    canvas.animInstance.triggerTransition();
                                }
                            });
                        }
                    }
                }
            }
        });

        darkTl.set('#dark-slide-0', { opacity: 0, pointerEvents: 'none' }, 1.0)
        .set('#dark-slide-1', { opacity: 1, pointerEvents: 'auto' }, 1.0)
        .to({}, { duration: 1.0 })
        .set('#dark-slide-1', { opacity: 0, pointerEvents: 'none' }, 2.0)
        .set('#dark-slide-2', { opacity: 1, pointerEvents: 'auto' }, 2.0)
        .to({}, { duration: 1.0 })
        .to('#dark-slide-2', { opacity: 0, pointerEvents: 'none', duration: 0.4 }, 3.0)
        .to(darkExpander, {
            width: initWidth,
            height: initHeight,
            borderRadius: initRadius,
            duration: 1.2,
            ease: 'power2.inOut'
        }, 3.0)
        .to('#pj-dark-expander-label', {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power2.out'
        }, 3.2);

        gsap.to('#expander-label-text', {
            y: -5,
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    const darkCards = document.querySelectorAll('.dark-project-card');
    const darkCursor = document.querySelector('[data-dark-cursor]');

    if (darkCards.length) {
        if (darkCursor) {
            if (!window.matchMedia('(pointer: coarse)').matches) {
                gsap.set(darkCursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

                window.addEventListener('pointermove', (e) => {
                    gsap.set(darkCursor, { x: e.clientX, y: e.clientY });
                });

                darkCards.forEach(card => {
                    card.addEventListener('pointerenter', () => {
                        gsap.killTweensOf(darkCursor);
                        gsap.to(darkCursor, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
                    });

                    card.addEventListener('pointerleave', () => {
                        gsap.killTweensOf(darkCursor);
                        gsap.to(darkCursor, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
                    });
                });
            } else {
                gsap.set(darkCursor, { display: 'none' });
            }
        }

        darkCards.forEach(card => {
            card.addEventListener('click', () => {
                const canvas = card.querySelector('canvas');
                if (canvas && canvas.getAttribute('data-context') === 'star-delta') {
                    window.location.href = 'star-delta.html';
                } else {
                    lenis.scrollTo('#interactive-footer', { duration: 1.2 });
                }
            });
        });
    }

    const canvases = document.querySelectorAll('.pixel-grid-canvas');
    if (canvases.length) {
        const anims = [];
        canvases.forEach(canvas => {
            const context = canvas.getAttribute('data-context');
            if (context) {
                const anim = new PixelGridAnimation(canvas, context);
                canvas.animInstance = anim;
                anims.push(anim);
            }
        });
        
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;
        
        const tick = (time) => {
            requestAnimationFrame(tick);
            const delta = time - lastTime;
            if (delta > interval) {
                lastTime = time - (delta % interval);
                anims.forEach(anim => anim.update());
            }
        };
        requestAnimationFrame(tick);
    }
});
