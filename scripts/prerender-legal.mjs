// Build-time prerender of the legal page(s) to static HTML.
//
// Why: /privacy is a client-rendered React route, so a non-JS crawler
// (Google Play's privacy-policy checker, search engines, etc.) only sees an
// empty SPA shell — `<div id="root"></div>` — with no policy text. This renders
// the SAME React components the SPA uses to static HTML at dist/privacy.html,
// which nginx serves at `/privacy` (see nginx.conf). Single source of truth:
// edit src/pages/PrivacyPage.tsx and rebuild — no separate copy to keep in sync.
//
// Runs after `vite build` (see package.json "build"). Uses Vite's SSR module
// loader so it understands TSX and the project's plugins with no extra deps.

import { createServer } from 'vite'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(root, 'dist')

const vite = await createServer({
  root,
  logLevel: 'warn',
  // SSR-only: we render components via ssrLoadModule and never serve client
  // requests, so disable the client dep optimizer / HMR / file watcher. Besides
  // being unnecessary work, this avoids a noisy (harmless) "dep-scan: server is
  // closed" race the background scanner logs when we call vite.close() below.
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
})

// Each page is a React module exporting Ru* / En* components. The Support page
// (/support) is the App Store / Google Play "Support URL": a real web page with
// contact info and FAQ, not a chat deep-link (Apple rejects t.me/... links).
const PAGES = [
  {
    module: '/src/pages/PrivacyPage.tsx',
    ruExport: 'RuPrivacy',
    enExport: 'EnPrivacy',
    out: 'privacy.html',
    title: 'Политика обработки персональных данных — SvoiVPN',
    mustInclude: 'Политика',
    minLen: 3000,
  },
  {
    module: '/src/pages/SupportPage.tsx',
    ruExport: 'RuSupport',
    enExport: 'EnSupport',
    out: 'support.html',
    title: 'Поддержка — SvoiVPN',
    mustInclude: 'support@svoiweb.ru',
    minLen: 800,
  },
]

try {
  for (const page of PAGES) {
    const mod = await vite.ssrLoadModule(page.module)
    if (!mod[page.ruExport] || !mod[page.enExport]) {
      throw new Error(`${page.module} must export ${page.ruExport} and ${page.enExport}`)
    }

    const ru = renderToStaticMarkup(React.createElement(mod[page.ruExport]))
    const en = renderToStaticMarkup(React.createElement(mod[page.enExport]))

    // Fail the build rather than silently shipping an empty/broken page.
    if (!ru.includes(page.mustInclude) || ru.length < page.minLen) {
      throw new Error(`Prerendered RU ${page.out} looks wrong (length=${ru.length})`)
    }

    const html = renderPage({ title: page.title, ru, en })
    const out = resolve(distDir, page.out)
    writeFileSync(out, html, 'utf8')
    console.log(`[prerender] wrote ${out} (${html.length} bytes)`)
  }
} finally {
  await vite.close()
}

function renderPage({ title, ru, en }) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="theme-color" content="#0A0A0A">
<meta name="robots" content="index, follow">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<style>
*{box-sizing:border-box}
body{margin:0;background:#0A0A0A;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:820px;margin:0 auto;padding:40px 20px 60px}
.lang{position:sticky;top:0;z-index:10;background:#0A0A0A;padding:12px 0 16px;display:flex;gap:6px;border-bottom:1px solid rgba(255,255,255,0.06)}
.lang button{flex:1;background:#1A1A1A;color:#B5B5B5;border:1px solid transparent;border-radius:12px;padding:12px 16px;font-size:13px;font-weight:600;letter-spacing:.02em;cursor:pointer;transition:all .2s}
.lang button.active{background:rgba(0,214,120,.12);color:#00D678;border-color:rgba(0,214,120,.3)}
a{color:#00D678;text-decoration:none}
#en{display:none}
</style>
</head>
<body>
<div class="wrap">
<div class="lang">
<button id="btn-ru" class="active" type="button" onclick="setLang('ru')">Русский</button>
<button id="btn-en" type="button" onclick="setLang('en')">English</button>
</div>
<div id="ru">${ru}</div>
<div id="en">${en}</div>
</div>
<script>
function setLang(l){
  document.getElementById('ru').style.display=l==='ru'?'block':'none';
  document.getElementById('en').style.display=l==='en'?'block':'none';
  document.getElementById('btn-ru').classList.toggle('active',l==='ru');
  document.getElementById('btn-en').classList.toggle('active',l==='en');
  document.documentElement.lang=l;
}
</script>
</body>
</html>`
}
