// Pré-renderização opcional para SEO e leitura sem JavaScript. O site não exige build.
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const context = vm.createContext({ window: {}, URL });
for (const file of ['data.js', 'assets/js/utils.js', 'assets/js/icons.js', 'assets/js/components.js', 'assets/js/pages/home.js']) {
  vm.runInContext(await readFile(file, 'utf8'), context, { filename: file });
}
const data = context.window.clinicData;
const { escapeHTML: e } = context.window.Lumiere.utils;
const { header, footer, dialogs } = context.window.Lumiere.components;
const description = 'Um espaço dedicado ao autocuidado, à confiança e à sua beleza natural. Demonstração independente de estética e bem-estar.';
const html = `<!doctype html>
<html lang="pt-BR">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <title>${e(data.name)} · Sua beleza merece um cuidado especial</title>
 <meta name="description" content="${e(description)}">
 <meta name="robots" content="index, follow">
 <meta name="theme-color" content="${e(data.colors.canvas)}">
 <meta property="og:type" content="website">
 <meta property="og:locale" content="pt_BR">
 <meta property="og:title" content="${e(data.name)} · Sua beleza merece um cuidado especial">
 <meta property="og:description" content="${e(description)}">
 <meta property="og:url" content="${e(data.siteUrl)}">
 <meta property="og:image" content="${e(new URL(data.images.hero, data.siteUrl).href)}">
 <meta name="twitter:card" content="summary_large_image">
 <link rel="canonical" href="${e(data.siteUrl)}">
 <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link rel="stylesheet" href="assets/css/styles.css">
 ${['data.js', 'assets/js/utils.js', 'assets/js/icons.js', 'assets/js/components.js', 'assets/js/pages/home.js', 'assets/js/app.js'].map(src => `<script defer src="${src}"></script>`).join('\n ')}
 <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: data.name, url: data.siteUrl, description, inLanguage: 'pt-BR' }).replace(/</g, '\\u003c')}</script>
</head>
<body>
 <div id="site-header">${header()}</div>
 <main id="conteudo" tabindex="-1">${context.window.Lumiere.home()}</main>
 <div id="site-footer">${footer()}</div>
 <div id="site-dialogs">${dialogs()}</div>
 <noscript><p class="container section-caption">Ative o JavaScript para usar os filtros, a galeria ampliada e os botões de contato. Este é um site demonstrativo; nenhum atendimento real é oferecido.</p></noscript>
</body>
</html>`;
await writeFile('index.html', html);
await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${e(data.siteUrl)}</loc></url></urlset>\n`);
await writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${data.siteUrl}sitemap.xml\n`);
console.log('HTML estático, sitemap e robots atualizados.');
