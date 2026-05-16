<section id="hr" class="hero-shell relative min-h-screen overflow-hidden px-4 pb-20 pt-24 sm:px-6 md:px-10 lg:px-24">
    <div class="hero-grid absolute inset-0 pointer-events-none"></div>
    <div class="hero-orbit absolute pointer-events-none"></div>

    <div class="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center">
        <div class="hero-stage relative grid min-h-[35rem] items-center overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.015] px-5 py-8 shadow-[0_22px_75px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:min-h-[39rem] sm:px-8 md:px-10 lg:min-h-[40rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:overflow-visible lg:rounded-[2rem] lg:px-12" data-hero-stage>
            <div class="hero-visual reveal delay-200 absolute right-0 top-14 z-0 w-[34vw] min-w-[7.5rem] max-w-[10rem] sm:right-8 sm:top-10 sm:w-[38vw] sm:max-w-[15.5rem] md:right-12 md:max-w-[18rem] lg:order-2 lg:static lg:z-10 lg:w-full lg:max-w-none lg:justify-self-end">
                <div class="hero-portrait-card group relative aspect-[4/5] w-full overflow-hidden rounded-[1.45rem] border border-white/[0.12] bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.42)] sm:rounded-[1.75rem] lg:max-w-[26rem]" data-hero-card>
                    <img src="<?= htmlspecialchars($my['photo']) ?>" alt="<?= htmlspecialchars($my['name']) ?>" class="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]">
                    <div class="hero-photo-tone absolute inset-0"></div>
                    <div class="hero-card-light absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"></div>
                    <div class="hero-frame-line absolute left-5 right-5 top-5 h-px bg-white/35"></div>
                    <div class="hero-frame-line absolute bottom-5 left-5 right-5 h-px bg-white/18"></div>
                    <div class="hero-corner hero-corner-a absolute left-5 top-5"></div>
                    <div class="hero-corner hero-corner-b absolute bottom-5 right-5"></div>
                </div>
            </div>

            <div class="reveal relative z-10 flex min-w-0 max-w-[78%] flex-col items-start sm:max-w-[34rem] lg:order-1 lg:max-w-3xl">
                <div class="hero-kicker mb-5 h-px w-20 bg-white/35"></div>

                <h1 class="hero-title max-w-full text-[clamp(2.45rem,11vw,5.8rem)] font-black leading-[0.92] tracking-normal text-white lg:text-[clamp(5.4rem,7vw,7.6rem)]">
                    <?= htmlspecialchars($my['hero_title_1']) ?>
                    <span class="hero-name block"><?= htmlspecialchars($my['hero_title_2']) ?></span>
                </h1>

                <p class="mt-7 max-w-[33rem] text-sm font-light leading-7 text-zinc-300 sm:text-base sm:leading-8 md:text-lg">
                    <?= htmlspecialchars($my['hero_desc']) ?>
                </p>

                <div class="mt-9 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row">
                    <a href="#pj" class="hero-primary inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-bold text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-black sm:text-base">
                        <?= htmlspecialchars($my['hero_btn']) ?>
                    </a>
                    <a href="#sk" class="hero-secondary inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-bold text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black sm:text-base">
                        <?= $lang === 'en' ? 'Skills' : 'Keahlian' ?>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <a href="#sk" class="hero-scroll absolute bottom-6 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/70 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-black" aria-label="Scroll">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m0 0l-6-6m6 6l6-6"></path>
        </svg>
    </a>
</section>
