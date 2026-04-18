<section id="pj" class="py-32 px-6 lg:px-24 max-w-7xl mx-auto relative z-10 block">
    <div class="reveal text-center mb-20 flex flex-col items-center">
        <h2 class="text-4xl md:text-6xl font-black mb-4"><?= htmlspecialchars($my['pj_title_1']) ?> <span class="text-grad"><?= htmlspecialchars($my['pj_title_2']) ?></span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
    </div>
    <?php if (empty($pj)): ?>
        <div class="col-span-1 md:col-span-3 py-20 text-center border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
            <h3 class="text-3xl font-black text-gray-400 tracking-widest uppercase"><?= $lang === 'en' ? 'Coming Soon' : 'Segera Hadir' ?></h3>
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <?php foreach($pj as $index => $p): ?>
                <div class="reveal glass rounded-[2.5rem] p-10 group flex flex-col items-start relative overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 hover:border-blue-500/30 bg-gradient-to-br from-white/[0.02] to-transparent cursor-pointer" onclick="openProj(<?= $index ?>)">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[2.5rem]"></div>
                    
                    <div class="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shrink-0 shadow-lg border border-blue-500/20 group-hover:border-transparent">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        <?= htmlspecialchars($p['t']) ?>
                    </h3>
                    <p class="text-gray-400 mb-10 flex-grow leading-relaxed text-sm md:text-base line-clamp-3">
                        <?= htmlspecialchars($p['d']) ?>
                    </p>
                    <div class="flex flex-wrap gap-2 mt-auto relative z-10 w-full">
                        <?php foreach($p['tg'] as $tg): ?>
                            <span class="px-4 py-2 text-xs font-bold rounded-full bg-white/5 border border-white/10 text-gray-300 shrink-0 group-hover:border-white/20 transition-colors">
                                <?= htmlspecialchars($tg) ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <div id="pj-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-8 opacity-0 pointer-events-none transition-opacity duration-500">
        <div class="absolute inset-0 bg-black/90 backdrop-blur-xl" onclick="closeProj()"></div>
        
        <div class="relative w-full h-full md:h-auto md:max-h-full max-w-6xl bg-[#050505] md:border md:border-white/10 md:rounded-[2rem] transform translate-y-10 sm:translate-y-0 sm:scale-95 opacity-0 transition-all duration-500 shadow-[0_0_100px_rgba(59,130,246,0.15)] flex flex-col md:flex-row overflow-hidden overflow-y-auto" id="pj-modal-content">
            
            <button onclick="closeProj()" class="fixed md:absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-black/40 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/20 group z-[60]">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div id="pj-modal-img-container" class="w-full md:w-1/2 h-[45vh] md:h-auto md:min-h-[70vh] shrink-0 hidden relative bg-black">
                <img id="pj-modal-img" src="" alt="Project Display" class="w-full h-full object-cover" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-90"></div>
            </div>

            <div class="w-full md:w-1/2 flex flex-col p-8 md:p-14 overflow-y-auto bg-[#050505] relative z-20">
                <div id="pj-modal-icon" class="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 mb-8">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                
                <h3 id="pj-modal-title" class="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6"></h3>
                
                <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full mb-8"></div>
                
                <p id="pj-modal-desc" class="text-gray-300 text-base md:text-lg leading-relaxed md:leading-loose font-light flex-grow mb-10 whitespace-pre-line"></p>
                
                <div id="pj-modal-tags" class="flex flex-wrap gap-2 mb-10"></div>
                
                <button onclick="closeProj()" class="py-4 px-8 bg-white text-black font-bold text-sm sm:text-base rounded-full w-full sm:w-auto self-start hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white mt-auto">
                    <?= $lang === 'en' ? 'Close detail' : 'Tutup detail' ?>
                </button>
            </div>
        </div>
    </div>
</section>

<script>
    const projData = <?= json_encode($pj) ?>;
    
    function openProj(idx) {
        const p = projData[idx];
        if(!p) return;
        
        document.body.style.overflow = 'hidden';
        
        // Hide navbar smoothly
        const nav = document.getElementById('main-nav') || document.querySelector('nav');
        if(nav) {
            nav.style.transform = 'translate(-50%, -150%) scale(0.9)';
            nav.style.opacity = '0';
            nav.style.pointerEvents = 'none';
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
            span.className = 'px-4 py-2 text-xs font-bold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
        
        const modal = document.getElementById('pj-modal');
        const content = document.getElementById('pj-modal-content');
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0', 'translate-y-10');
            content.classList.add('scale-100', 'opacity-100', 'translate-y-0');
        }, 30);
    }
    
    function closeProj() {
        document.body.style.overflow = '';
        
        // Show navbar smoothly
        const nav = document.getElementById('main-nav') || document.querySelector('nav');
        if(nav) {
            nav.style.transform = 'translate(-50%, 0) scale(1)';
            nav.style.opacity = '1';
            nav.style.pointerEvents = 'auto';
        }
        
        const modal = document.getElementById('pj-modal');
        const content = document.getElementById('pj-modal-content');
        
        content.classList.remove('scale-100', 'opacity-100', 'translate-y-0');
        content.classList.add('scale-95', 'opacity-0', 'translate-y-10');
        
        setTimeout(() => {
            modal.classList.add('opacity-0', 'pointer-events-none');
        }, 500);
    }
</script>

