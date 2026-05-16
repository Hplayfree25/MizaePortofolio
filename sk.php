<section id="sk" class="ios-section relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-24">
    <div class="reveal ios-section-head mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <h2 class="text-4xl font-black tracking-normal text-white md:text-6xl"><?= htmlspecialchars($my['sk_title_1']) ?> <span class="text-grad"><?= htmlspecialchars($my['sk_title_2']) ?></span></h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base"><?= htmlspecialchars($my['sk_desc']) ?></p>
    </div>

    <div class="ios-card ios-skill-panel reveal grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-5" data-ios-card>
        <?php foreach($sk as $index => $s): ?>
            <button type="button" class="ios-chip reveal group min-h-24 rounded-[1.35rem] px-5 py-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" style="transition-delay: <?= $index * 45 ?>ms" data-skill-chip>
                <span class="block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 transition duration-300 group-hover:text-cyan-200">0<?= $index + 1 ?></span>
                <span class="mt-3 block text-xl font-black text-white transition duration-300 group-hover:translate-x-1"><?= htmlspecialchars($s) ?></span>
            </button>
        <?php endforeach; ?>
    </div>
</section>
