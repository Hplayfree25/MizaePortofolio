<section id="hr" class="relative min-h-screen flex flex-col justify-center pt-32 md:pt-24 pb-40 md:pb-56 overflow-hidden px-6 lg:px-24">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] bg-blue-600/20 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-pink-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
    
    <div class="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 z-10">
        
        <div class="reveal order-1 md:order-2 w-full md:w-1/2 flex justify-center items-center relative group mt-8 md:mt-0">
            
            <div class="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[360px] md:w-[350px] md:h-[480px] lg:w-[400px] lg:h-[550px] rounded-full sm:rounded-[2rem] md:rounded-[3rem] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1 md:p-1.5 transition-all duration-500 md:group-hover:scale-[1.03] md:group-hover:-rotate-2 group-hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.6)] cursor-pointer">
                
                <div class="w-full h-full rounded-full sm:rounded-[1.8rem] md:rounded-[2.85rem] overflow-hidden bg-black/50 relative z-10">
                    <img src="<?= htmlspecialchars($my['photo']) ?>" alt="<?= htmlspecialchars($my['name']) ?>" class="w-full h-full object-cover object-top md:group-hover:scale-110 md:group-hover:rotate-1 transition-all duration-700" onerror="this.src='https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400&h=711'">
                    <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 hidden md:block"></div>
                </div>
                
                <svg class="hidden md:block absolute top-[15%] left-[20%] text-blue-300 w-12 h-12 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-[750ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-16 group-hover:-translate-x-16 group-hover:rotate-90 fill-current drop-shadow-[0_10px_20px_rgba(147,197,253,0.8)] z-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
                </svg>

                <svg class="hidden md:block absolute top-[20%] right-[15%] text-pink-400 w-16 h-16 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[1000ms] delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-20 group-hover:translate-x-20 group-hover:rotate-180 fill-current drop-shadow-[0_10px_20px_rgba(236,72,153,0.8)] z-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
                </svg>

                <svg class="hidden md:block absolute bottom-[15%] right-[25%] text-purple-400 w-10 h-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-[850ms] delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-12 group-hover:translate-x-12 group-hover:-rotate-90 fill-current drop-shadow-[0_10px_20px_rgba(192,132,252,0.8)] z-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
                </svg>

            </div>
            
        </div>

        <div class="reveal delay-200 order-2 md:order-1 flex flex-col items-center md:items-start gap-5 sm:gap-7 text-center md:text-left w-full md:w-1/2 pt-8 md:pt-0">
            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight md:tracking-tighter">
                <?= htmlspecialchars($my['hero_title_1']) ?> <br>
                <span class="text-grad"><?= htmlspecialchars($my['hero_title_2']) ?></span>
            </h1>
            <p class="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-full md:max-w-lg mx-auto md:mx-0 leading-relaxed md:leading-loose">
                <?= htmlspecialchars($my['hero_desc']) ?>
            </p>
            <div class="flex gap-4 items-center mt-2">
                <a href="#pj" class="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold text-sm sm:text-base rounded-full hover:bg-transparent hover:text-white hover:border-white border-2 border-white transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <?= htmlspecialchars($my['hero_btn']) ?>
                </a>
            </div>
        </div>
        
    </div>

    <div class="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end z-20 group">
        <a href="#sk" class="absolute bottom-[50px] sm:bottom-[80px] md:bottom-[120px] flex flex-col items-center gap-1 sm:gap-2 transition-transform duration-500 group-hover:-translate-y-4 cursor-pointer z-30 mb-2">
            <span class="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 group-hover:text-blue-400 transition-colors">Scroll</span>
            <div class="w-5 h-8 md:w-6 md:h-10 border-2 border-white/20 group-hover:border-blue-400 rounded-full flex justify-center p-1 transition-colors backdrop-blur-sm">
                <div class="w-1 h-2 bg-white/50 group-hover:bg-blue-400 rounded-full animate-[bounce_1.5s_infinite]"></div>
            </div>
        </a>
        
        <svg class="block w-full h-[50px] sm:h-[80px] md:h-[120px] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:h-[70px] sm:group-hover:h-[100px] md:group-hover:h-[160px] fill-[#050505] drop-shadow-[0_-5px_15px_rgba(59,130,246,0.15)] group-hover:drop-shadow-[0_-20px_35px_rgba(236,72,153,0.3)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill-opacity="1" d="M0,192L48,208C96,224,192,256,288,261.3C384,267,480,245,576,213.3C672,181,768,139,864,144C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    </div>
</section>
