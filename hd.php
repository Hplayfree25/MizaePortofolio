<!DOCTYPE html>
<html lang="<?= $lang ?>" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($my['name']) ?> - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="sty.css?v=<?= filemtime('sty.css') ?>">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Outfit', 'sans-serif'] },
                }
            }
        }
    </script>
</head>
<body class="antialiased selection:bg-cyan-300 selection:text-black relative">
<nav id="main-nav" class="site-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-10">
    <div class="nav-shell mx-auto w-full max-w-7xl overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-black/35 shadow-[0_16px_45px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
        <div class="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <a href="#hr" class="nav-brand group flex min-w-0 max-w-[13rem] items-center sm:max-w-none" aria-label="<?= htmlspecialchars($my['nav_home']) ?>">
                <span class="min-w-0">
                    <span class="block truncate text-sm font-black leading-tight text-white transition duration-300 group-hover:text-cyan-100 sm:text-base">Revaldo Anderson</span>
                    <span class="block text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 transition duration-300 group-hover:text-zinc-300">Portfolio</span>
                </span>
            </a>

            <button type="button" class="nav-toggle ios-press group relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.05rem] border border-white/10 bg-white/[0.06] text-white shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.10] md:hidden" data-nav-toggle aria-label="Menu" aria-expanded="false">
                <span class="nav-toggle-lines relative h-4 w-5"></span>
            </button>

            <div class="nav-desktop hidden items-center gap-2 md:flex">
                <div class="nav-links relative flex items-center rounded-2xl bg-white/[0.025] p-1" data-nav-links>
                    <span class="nav-cursor absolute left-1 top-1 h-10 rounded-xl opacity-0 transition-all duration-300" data-nav-cursor></span>
                    <a href="#hr" class="nav-link active relative z-10 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition duration-300 hover:text-white" data-nav-link><?= htmlspecialchars($my['nav_home']) ?></a>
                    <a href="#sk" class="nav-link relative z-10 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-400 transition duration-300 hover:text-white" data-nav-link><?= htmlspecialchars($my['nav_skills']) ?></a>
                    <a href="#pj" class="nav-link relative z-10 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-400 transition duration-300 hover:text-white" data-nav-link><?= htmlspecialchars($my['nav_projects']) ?></a>
                </div>
                <div class="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.025] p-1">
                    <a href="?lang=id" class="rounded-xl px-3 py-2 text-xs font-black transition <?= $lang === 'id' ? 'bg-cyan-300 text-black' : 'text-zinc-400 hover:text-white' ?>">ID</a>
                    <a href="?lang=en" class="rounded-xl px-3 py-2 text-xs font-black transition <?= $lang === 'en' ? 'bg-cyan-300 text-black' : 'text-zinc-400 hover:text-white' ?>">EN</a>
                </div>
            </div>
        </div>

        <div class="nav-mobile grid max-h-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden" data-nav-panel>
            <div class="px-4 pb-4 pt-1">
                <div class="grid gap-2 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-2">
                    <a href="#hr" class="nav-link active rounded-2xl px-4 py-3 text-sm font-bold text-white transition hover:text-white" data-nav-link><?= htmlspecialchars($my['nav_home']) ?></a>
                    <a href="#sk" class="nav-link rounded-2xl px-4 py-3 text-sm font-bold text-zinc-400 transition hover:text-white" data-nav-link><?= htmlspecialchars($my['nav_skills']) ?></a>
                    <a href="#pj" class="nav-link rounded-2xl px-4 py-3 text-sm font-bold text-zinc-400 transition hover:text-white" data-nav-link><?= htmlspecialchars($my['nav_projects']) ?></a>
                    <div class="mt-1 grid grid-cols-2 gap-2">
                        <a href="?lang=id" class="rounded-2xl px-4 py-3 text-center text-xs font-black transition <?= $lang === 'id' ? 'bg-cyan-300 text-black' : 'bg-white/[0.04] text-zinc-400' ?>">ID</a>
                        <a href="?lang=en" class="rounded-2xl px-4 py-3 text-center text-xs font-black transition <?= $lang === 'en' ? 'bg-cyan-300 text-black' : 'bg-white/[0.04] text-zinc-400' ?>">EN</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
