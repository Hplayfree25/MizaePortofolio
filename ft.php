<footer id="interactive-footer" class="ios-footer professional-footer relative z-10 w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
    <div class="mx-auto w-full max-w-7xl">
        <div class="footer-panel grid gap-10 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-2xl sm:p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:p-10">
            <div class="max-w-xl">
                <p class="text-sm font-black text-white">Revaldo Anderson</p>
                <h2 class="mt-5 text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl">
                    <?= $lang === 'en' ? 'Engineering portfolio with practical work and clean execution.' : 'Portfolio engineering dengan karya praktis dan eksekusi rapi.' ?>
                </h2>
                <p class="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
                    <?= $lang === 'en' ? 'Available for project discussions, portfolio reviews, and technical collaboration.' : 'Terbuka untuk diskusi proyek, review portofolio, dan kolaborasi teknis.' ?>
                </p>
            </div>

            <div>
                <p class="footer-label">Navigation</p>
                <div class="mt-5 grid gap-3">
                    <a href="#hr" class="footer-link"><?= htmlspecialchars($my['nav_home']) ?></a>
                    <a href="#sk" class="footer-link"><?= htmlspecialchars($my['nav_skills']) ?></a>
                    <a href="#pj" class="footer-link"><?= htmlspecialchars($my['nav_projects']) ?></a>
                </div>
            </div>

            <div>
                <p class="footer-label">Contact</p>
                <div class="mt-5 grid gap-3">
                    <a href="mailto:<?= htmlspecialchars($my['email']) ?>" class="footer-link truncate"><?= htmlspecialchars($my['email']) ?></a>
                    <a href="#hr" class="footer-link"><?= $lang === 'en' ? 'Back to top' : 'Kembali ke atas' ?></a>
                </div>
            </div>
        </div>

        <div class="mt-6 flex flex-col gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.025] px-5 py-5 text-center backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p class="text-xs font-bold text-zinc-500 sm:text-sm">
                &copy; <?= date('Y') ?> <?= $lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi.' ?>
            </p>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Built using PHP, Tailwind, Vanilla JS
            </p>
        </div>
    </div>
</footer>
<script src="scr.js?v=<?= filemtime('scr.js') ?>"></script>
</body>
</html>
