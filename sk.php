<section id="sk" class="py-32 px-6 lg:px-24 max-w-7xl mx-auto relative z-10">
    <div class="reveal text-center mb-20">
        <h2 class="text-4xl md:text-6xl font-black mb-4"><?= htmlspecialchars($my['sk_title_1']) ?> <span class="text-grad"><?= htmlspecialchars($my['sk_title_2']) ?></span></h2>
        <p class="text-gray-400 max-w-xl mx-auto"><?= htmlspecialchars($my['sk_desc']) ?></p>
    </div>
    <div class="flex flex-wrap justify-center gap-4 md:gap-8">
        <?php foreach($sk as $index => $s): ?>
            <div class="reveal glass px-8 py-4 md:px-10 md:py-6 rounded-full font-bold text-lg md:text-2xl hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-default text-gray-300 hover:text-white" style="transition-delay: <?= $index * 50 ?>ms">
                <?= htmlspecialchars($s) ?>
            </div>
        <?php endforeach; ?>
    </div>
</section>
