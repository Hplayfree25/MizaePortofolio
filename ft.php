<footer class="py-16 border-t border-white/10 text-center text-gray-500 relative z-10 glass mt-32 overflow-hidden">
    <div class="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[60vw] h-[20vw] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>
    
    <div class="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
        <h2 class="text-3xl font-bold text-white tracking-tight"><?= htmlspecialchars($my['name']) ?></h2>
        <a href="mailto:<?= htmlspecialchars($my['email']) ?>" class="text-xl text-blue-400 font-medium hover:text-white transition-colors">
            <?= htmlspecialchars($my['email']) ?>
        </a>
        <p class="font-medium text-sm text-gray-600 mt-8">
            © <?= date('Y') ?> <?= htmlspecialchars($my['name']) ?> <?= htmlspecialchars($my['ft_desc']) ?>
        </p>
    </div>
</footer>
<script src="scr.js"></script>
</body>
</html>
