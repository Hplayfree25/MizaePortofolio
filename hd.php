<!DOCTYPE html>
<html lang="<?= $lang ?>" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($my['name']) ?> - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="sty.css">
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
<body class="antialiased selection:bg-blue-500 selection:text-white relative">
<nav id="main-nav" class="fixed top-6 left-1/2 -translate-x-1/2 glass px-6 md:px-8 py-3 rounded-full z-50 flex gap-4 md:gap-6 items-center shadow-2xl transition-all duration-500 hover:scale-105 border border-white/10 w-max max-w-[90vw] overflow-x-auto scb-hidden">
    <a href="#hr" class="text-xs md:text-sm font-semibold hover:text-blue-400 transition text-white shrink-0"><?= htmlspecialchars($my['nav_home']) ?></a>
    <a href="#sk" class="text-xs md:text-sm font-semibold hover:text-blue-400 transition text-gray-300 shrink-0"><?= htmlspecialchars($my['nav_skills']) ?></a>
    <a href="#pj" class="text-xs md:text-sm font-semibold hover:text-blue-400 transition text-gray-300 shrink-0"><?= htmlspecialchars($my['nav_projects']) ?></a>
    <div class="w-px h-4 bg-white/20 mx-2 shrink-0"></div>
    <div class="flex gap-2 shrink-0">
        <a href="?lang=id" class="text-[10px] md:text-xs font-bold px-2 py-1 rounded-md transition <?= $lang === 'id' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white glass' ?>">ID</a>
        <a href="?lang=en" class="text-[10px] md:text-xs font-bold px-2 py-1 rounded-md transition <?= $lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white glass' ?>">EN</a>
    </div>
</nav>
