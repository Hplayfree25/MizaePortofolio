<footer id="interactive-footer" class="bg-[#0a0a0a] pt-10 pb-24 relative z-10 w-full overflow-hidden min-h-[50vh] flex flex-col justify-center items-center select-none">
    
    <div id="paint-container" class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"></div>

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[30vh] bg-blue-900/10 blur-[80px] -z-10 pointer-events-none"></div>
    <div class="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90vw] h-[50vw] md:w-[60vw] md:h-[30vw] bg-gradient-to-t from-blue-700/20 via-pink-600/10 to-transparent rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
    
    <div class="max-w-6xl w-full px-6 flex flex-col items-center gap-12 relative z-20">
        
        <a id="magnetic-card" href="mailto:<?= htmlspecialchars($my['email']) ?>" class="email-card group relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 py-8 px-8 sm:px-12 lg:py-10 lg:px-16 rounded-[2.5rem] sm:rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-blue-500/50 transition-transform duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] cursor-pointer overflow-visible w-full max-w-full">
            
            <h2 id="draggable-text" class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter sm:tracking-tight z-10 transition-colors duration-300 text-center shrink-0 flex flex-wrap justify-center drop-shadow-md" style="pointer-events: auto;">
                <?= htmlspecialchars($my['name']) ?>
            </h2>
            
            <div class="hidden lg:block w-px h-16 bg-white/20 z-10 group-hover:bg-blue-400/50 transition-colors duration-500 shrink-0 pointer-events-none"></div>
            <div class="block lg:hidden w-16 h-px bg-white/20 z-10 group-hover:bg-blue-400/50 transition-colors duration-500 pointer-events-none"></div>
            
            <div class="flex items-center justify-center gap-2 sm:gap-4 z-10 min-w-0 pointer-events-none max-w-full">
                <span class="text-base sm:text-xl md:text-2xl lg:text-3xl text-blue-300 font-medium group-hover:text-pink-300 transition-colors duration-300 text-center truncate">
                    <?= htmlspecialchars($my['email']) ?>
                </span>
                
                <svg class="hidden sm:block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </div>
        </a>
        
        <div class="flex flex-col items-center gap-3 pointer-events-none">
            <p class="font-medium text-xs sm:text-sm text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-colors duration-300 text-center px-4">
                © <?= date('Y') ?> <?= htmlspecialchars($my['name']) ?>. <?= htmlspecialchars($my['ft_desc']) ?>
            </p>
            <p class="text-[10px] sm:text-xs text-gray-600 font-medium tracking-[0.2em] mt-1 text-center px-4">
                PHP, TAILWIND, VANILLA JS
            </p>
        </div>
    </div>
</footer>
<script src="scr.js"></script>
</body>
</html>
