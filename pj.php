<section id="pj" class="ios-section relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-24">
    <div class="reveal ios-section-head mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16">
        <h2 class="text-4xl font-black tracking-normal text-white md:text-6xl"><?= htmlspecialchars($my['pj_title_1']) ?> <span class="text-grad"><?= htmlspecialchars($my['pj_title_2']) ?></span></h2>
        <div class="mt-5 h-1 w-20 rounded-full bg-white/20"></div>
    </div>

    <?php if (empty($pj)): ?>
        <div class="ios-card reveal p-10 text-center">
            <h3 class="text-2xl font-black text-zinc-400"><?= $lang === 'en' ? 'Coming Soon' : 'Segera Hadir' ?></h3>
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <?php foreach($pj as $index => $p): ?>
                <button type="button" class="ios-card ios-project-card reveal group flex min-h-[20rem] flex-col items-start overflow-hidden p-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 sm:p-6" style="transition-delay: <?= $index * 60 ?>ms" onclick="openProj(<?= $index ?>)" data-ios-card>
                    <?php if (!empty($p['img'])): ?>
                        <div class="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-[1.35rem] bg-black/40">
                            <img src="<?= htmlspecialchars($p['img']) ?>" alt="<?= htmlspecialchars($p['t']) ?>" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
                        </div>
                    <?php endif; ?>

                    <div class="flex w-full flex-1 flex-col">
                        <h3 class="text-2xl font-black tracking-normal text-white transition duration-300 group-hover:text-cyan-100 md:text-3xl">
                            <?= htmlspecialchars($p['t']) ?>
                        </h3>
                        <p class="mt-4 flex-1 text-sm leading-7 text-zinc-400 sm:text-base">
                            <?= htmlspecialchars($p['d']) ?>
                        </p>
                        <div class="mt-7 flex flex-wrap gap-2">
                            <?php foreach($p['tg'] as $tg): ?>
                                <span class="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold text-zinc-300 transition duration-300 group-hover:border-cyan-300/30 group-hover:text-white">
                                    <?= htmlspecialchars($tg) ?>
                                </span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </button>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<div id="pj-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 opacity-0 pointer-events-none transition-opacity duration-500 md:p-8">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-2xl" onclick="closeProj()"></div>

    <div class="ios-modal relative flex max-h-full w-full max-w-6xl translate-y-8 scale-[0.98] flex-col overflow-hidden rounded-[1.75rem] opacity-0 transition-all duration-500 md:flex-row" id="pj-modal-content">
        <button onclick="closeProj()" class="absolute right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white backdrop-blur-xl transition duration-300 hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-cyan-300/70">
            <svg class="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div id="pj-modal-img-container" class="hidden h-[40vh] w-full shrink-0 bg-black md:h-auto md:min-h-[70vh] md:w-1/2">
            <img id="pj-modal-img" src="" alt="Project Display" class="h-full w-full object-cover" loading="lazy">
        </div>

        <div class="flex w-full flex-col overflow-y-auto p-7 md:w-1/2 md:p-12">
            <div id="pj-modal-icon" class="mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.06] text-cyan-200">
                <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>

            <h3 id="pj-modal-title" class="text-3xl font-black leading-tight tracking-normal text-white md:text-5xl"></h3>
            <p id="pj-modal-desc" class="mt-7 flex-grow whitespace-pre-line text-base font-light leading-8 text-zinc-300 md:text-lg"></p>
            <div id="pj-modal-tags" class="mt-8 flex flex-wrap gap-2"></div>

            <button onclick="closeProj()" class="ios-button mt-10 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-full px-7 text-sm font-black text-black transition duration-300 sm:w-auto">
                <?= $lang === 'en' ? 'Close detail' : 'Tutup detail' ?>
            </button>
        </div>
    </div>
</div>

<script>
    const projData = <?= json_encode($pj) ?>;

    function openProj(idx) {
        const p = projData[idx];
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
    }

    function closeProj() {
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
    }
</script>
