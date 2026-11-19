/* ==========================================================================
   Atajos de Windows 11: web de la guía
   ---------------------------------------------------------------------------
   Lee los archivos Markdown de la guía (la única fuente del contenido),
   convierte sus tablas en listas de atajos con teclas visuales y ofrece
   buscador, favoritos y un modo de práctica.

   Para añadir una página nueva: crea el .md y añádelo a PAGES.
   ========================================================================== */
(function () {
  'use strict';

  const REPO = 'https://github.com/damdavidprieto/WindowsUltimateGuide';
  const BRANCH = 'main';
  const SITE_NAME = 'Atajos de Windows 11';

  const GROUPS = [
    { id: 'atajos', title: 'Atajos de teclado' },
    { id: 'ejecutar', title: 'Win + R (Ejecutar)' },
    { id: 'sistema', title: 'Sistema y avanzado' },
  ];

  // Orden = orden del menú. `hidden`: se carga pero no aparece en el menú.
  const PAGES = [
    { id: 'hotkeys/README', hidden: true, noIndex: true, title: 'Resumen', icon: '⌨️' },
    { id: 'hotkeys/general', group: 'atajos', title: 'Tecla Windows', icon: '⊞', desc: 'Sistema, paneles, búsqueda, escritura y Copilot.' },
    { id: 'hotkeys/navigation', group: 'atajos', title: 'Ventanas y escritorios', icon: '🪟', desc: 'Snap, escritorios virtuales, monitores y barra de tareas.' },
    { id: 'hotkeys/explorer', group: 'atajos', title: 'Explorador de archivos', icon: '📂', desc: 'Pestañas, vistas, paneles y gestión de archivos.' },
    { id: 'hotkeys/text-editing', group: 'atajos', title: 'Texto y diálogos', icon: '✍️', desc: 'Copiar, pegar, seleccionar y moverse por el texto.' },
    { id: 'hotkeys/screenshots', group: 'atajos', title: 'Capturas y grabación', icon: '📸', desc: 'Recortes, grabar la pantalla y Game Bar.' },
    { id: 'hotkeys/accessibility', group: 'atajos', title: 'Accesibilidad', icon: '♿', desc: 'Lupa, Narrador, subtítulos y teclas especiales.' },
    { id: 'hotkeys/terminal', group: 'atajos', title: 'Terminal y PowerShell', icon: '🐚', desc: 'Windows Terminal, PowerShell y CMD.' },
    { id: 'hotkeys/browser', group: 'atajos', title: 'Navegadores', icon: '🌐', desc: 'Edge, Chrome y Firefox.' },
    { id: 'power-user/powertoys', group: 'atajos', title: 'PowerToys', icon: '🚀', desc: 'Paleta de comandos, Pegado avanzado, FancyZones…' },
    { id: 'development/vs2022', group: 'atajos', title: 'Visual Studio', icon: '🛠️', desc: 'Editar, depurar, multicursor y Copilot.' },
    { id: 'win-plus-r/essentials', group: 'ejecutar', title: 'Apps esenciales', icon: '🏃', desc: 'calc, notepad, wt, msinfo32…' },
    { id: 'win-plus-r/control-panel', group: 'ejecutar', title: 'Panel de Control (.cpl)', icon: '⚙️', desc: 'Accesos directos a los ajustes clásicos.' },
    { id: 'win-plus-r/system-admin', group: 'ejecutar', title: 'Administración (.msc)', icon: '🧑‍💼', desc: 'Discos, servicios, eventos, directivas…' },
    { id: 'system/env-vars', group: 'sistema', title: 'Variables de entorno', icon: '🌐', desc: '%APPDATA%, %TEMP%, %USERPROFILE%…' },
    { id: 'system/built-in-tools', group: 'sistema', title: 'Herramientas nativas', icon: '🧰', desc: 'Utilidades potentes que vienen con Windows.' },
    { id: 'system/cli-tips', group: 'sistema', title: 'Comandos de terminal', icon: '💻', desc: 'sfc, winget, ipconfig y más.' },
    { id: 'power-user/wsl', group: 'sistema', title: 'WSL (Linux)', icon: '🐧', desc: 'Linux dentro de Windows.' },
    { id: 'power-user/god-mode', group: 'sistema', title: 'God Mode', icon: '👑', desc: 'Todos los ajustes en una carpeta.' },
    { id: 'power-user/registry-hacks', group: 'sistema', title: 'Trucos del registro', icon: '🔧', desc: 'Ajustes de interfaz con el registro.' },
  ];
  const META = new Map(PAGES.map((p) => [p.id, p]));

  const SUGGESTIONS = ['captura de pantalla', 'escritorio virtual', 'portapapeles', 'pestaña', 'emoji', 'copiar ruta', 'monitor', 'bloquear'];

  // Palabras que la gente escribe → cómo aparecen en la guía.
  const ALIASES = {
    windows: ['win'], logo: ['win'], inicio: ['inicio', 'win'],
    control: ['ctrl'], ctl: ['ctrl'],
    mayus: ['shift'], mayusculas: ['shift', 'mayus'],
    escape: ['esc'], intro: ['enter'], return: ['enter'], entrar: ['enter'],
    suprimir: ['supr'], delete: ['supr'], del: ['supr'], borrar: ['borrar', 'eliminar', 'supr'],
    space: ['espacio'], barra: ['barra', 'espacio'],
    print: ['imprpant'], prtscn: ['imprpant'], impr: ['imprpant'], imprpant: ['imprpant'],
    pantallazo: ['captura'], screenshot: ['captura'], capturar: ['captura'], foto: ['captura'],
    recorte: ['recorte', 'captura'], recortar: ['recorte', 'captura'],
    video: ['grabar', 'grabacion', 'video'], grabar: ['grabar', 'grabacion'],
    pestanas: ['pestana'], tabs: ['pestana', 'tab'],
    ventanas: ['ventana'], escritorios: ['escritorio'], monitores: ['monitor'], pantallas: ['pantalla', 'monitor'],
    emojis: ['emoji'], emoticono: ['emoji'], emoticonos: ['emoji'],
    apagar: ['apagado', 'apagar'], busqueda: ['busqueda', 'buscar'], buscar: ['buscar', 'busqueda'],
    admin: ['administrador', 'admin'], tareas: ['tareas'], minimizar: ['minimizar'],
    terminal: ['terminal'], consola: ['consola', 'terminal'], cmd: ['cmd'],
    clipboard: ['portapapeles'], dictado: ['dictado', 'voz'], voz: ['voz', 'dictado'],
    zoom: ['zoom', 'ampliar', 'lupa'], lupa: ['lupa'],
  };

  // Nombres de tecla que, escritos como `código`, se dibujan como tecla.
  const KEY_NAMES = new Set([
    'win', 'ctrl', 'shift', 'alt', 'tab', 'esc', 'enter', 'espacio', 'supr', 'inicio', 'fin',
    'imprpant', 'repag', 'avpag', 'retroceso', 'pausa', 'insert', 'fn',
    'bloq mayus', 'bloq num', 'bloq despl', 'tecla menu', '←', '→', '↑', '↓',
  ]);

  const CALLOUTS = {
    NOTE: { icon: 'ℹ️', label: 'Nota', cls: 'note' },
    TIP: { icon: '💡', label: 'Consejo', cls: 'tip' },
    IMPORTANT: { icon: '❗', label: 'Importante', cls: 'important' },
    WARNING: { icon: '⚠️', label: 'Atención', cls: 'warning' },
    CAUTION: { icon: '🛑', label: 'Precaución', cls: 'caution' },
  };

  const ICONS = {
    starOff: '<svg viewBox="0 0 24 24" class="star-off" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    starOn: '<svg viewBox="0 0 24 24" class="star-on fill" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  };

  // ------------------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const unesc = (s) => String(s).replace(/&(amp|lt|gt|quot|#39);/g, (m, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" }[e]));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const EMOJI_RE = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍]/gu;
  const stripEmoji = (s) => String(s).replace(EMOJI_RE, '').replace(/\s+/g, ' ').trim();
  const leadingEmoji = (s) => {
    const m = String(s).match(/^\s*((?:[\p{Extended_Pictographic}][️‍]*)+)/u);
    return m ? m[1] : '';
  };
  // Markdown en línea → texto plano.
  const plain = (md) => stripEmoji(String(md)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/<[^>]+>/g, ''));
  const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion';
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('wug-' + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('wug-' + key, JSON.stringify(value)); } catch (e) { /* almacenamiento no disponible */ }
    },
  };

  const dirOf = (pageId) => pageId.includes('/') ? pageId.slice(0, pageId.lastIndexOf('/')) : '';
  function resolvePath(dir, rel) {
    const out = dir ? dir.split('/') : [];
    for (const part of rel.split('/')) {
      if (!part || part === '.') continue;
      if (part === '..') out.pop(); else out.push(part);
    }
    return out.join('/');
  }
  function resolveHref(href, pageId) {
    if (/^(https?:|mailto:|#)/i.test(href)) return href;
    const [path] = href.split('#');
    const target = resolvePath(dirOf(pageId), path);
    if (/\.md$/i.test(target)) {
      const id = target.replace(/\.md$/i, '');
      if (id === 'README' || id === 'hotkeys/README') return '#/';
      if (META.has(id)) return '#/p/' + id;
      return `${REPO}/blob/${BRANCH}/${target}`;
    }
    return `${REPO}/tree/${BRANCH}/${target}`;
  }
  const rewriteHrefs = (html, pageId) => html.replace(/href="([^"]+)"/g, (m, h) => `href="${esc(resolveHref(unesc(h), pageId))}"`);

  // ------------------------------------------------------------------------
  // Teclas
  // ------------------------------------------------------------------------
  function kbd(escapedContent) {
    const t = escapedContent.trim();
    if (t === 'Win') return '<kbd><span class="win-logo" aria-hidden="true"><i></i><i></i><i></i><i></i></span>Win</kbd>';
    return `<kbd>${t}</kbd>`;
  }
  const joinPlus = (html) => html.replace(/<\/kbd>\s*\+\s*<kbd/g, '</kbd><span class="plus" aria-label="más">+</span><kbd');
  function isKeyName(raw) {
    const t = norm(unesc(raw).trim());
    if (!t) return false;
    if (KEY_NAMES.has(t)) return true;
    if (/^f\d{1,2}$/.test(t)) return true;
    return [...t].length === 1; // una sola letra, número o símbolo
  }
  // `Win` + `E` en una celda de atajo → teclas.
  function keysToHTML(md) {
    return joinPlus(marked.parseInline(md).replace(/<code>([^<]*)<\/code>/g, (m, c) => kbd(c)));
  }
  // En texto normal, solo los `códigos` que son nombres de tecla.
  function kbdify(html) {
    return joinPlus(html.replace(/<code>([^<]{1,16})<\/code>/g, (m, c) => (isKeyName(c) ? kbd(c) : m)));
  }
  const rich = (md, pageId) => kbdify(rewriteHrefs(marked.parseInline(md), pageId));
  function cmdHTML(md) {
    return marked.parseInline(md).replace(/<code>([^<]*)<\/code>/g, (m, c) =>
      `<code>${c}</code><button class="mini-btn cmd-copy" data-copy="${c}" aria-label="Copiar ${c}" title="Copiar">${ICONS.copy}</button>`);
  }

  // ------------------------------------------------------------------------
  // Procesado de páginas
  // ------------------------------------------------------------------------
  const state = {
    pages: new Map(),   // id → { meta, title, lead, blocks, entries }
    entries: new Map(), // id de fila → fila (todas)
    index: [],          // filas que aparecen en la búsqueda
    favs: new Set(store.get('favs', [])),
    prevHash: '#/',
    lastHash: null,
  };

  function processPage(meta, md) {
    const tokens = marked.lexer(md);
    const page = { meta, title: meta.title, lead: '', blocks: [], entries: [] };
    const usedIds = new Set();
    let h2 = '', h3 = '', seenH1 = false;

    for (const t of tokens) {
      if (t.type === 'space' || t.type === 'hr') continue;
      if (t.type === 'heading' && t.depth === 1 && !seenH1) { seenH1 = true; page.title = stripEmoji(plain(t.text)); continue; }
      if (t.type === 'paragraph' && /^\s*\[(⬅️|🏠)/u.test(t.text)) continue; // navegación del Markdown
      if (t.type === 'paragraph' && !page.lead && page.blocks.length === 0) { page.lead = rich(t.text, meta.id); continue; }

      if (t.type === 'heading') {
        const text = plain(t.text);
        if (t.depth <= 2) { h2 = text; h3 = ''; } else { h3 = text; }
        let id = 's-' + slug(text), n = 2;
        while (usedIds.has(id)) id = 's-' + slug(text) + '-' + n++;
        usedIds.add(id);
        page.blocks.push({ kind: 'heading', depth: Math.max(2, Math.min(t.depth, 3)), text, icon: leadingEmoji(t.text), id });
        continue;
      }
      if (t.type === 'table' && /^(atajo|comando|variable)/.test(norm(plain(t.header[0].text)))) {
        const rows = buildRows(t, meta, h2, h3);
        page.blocks.push({ kind: 'rows', rows });
        page.entries.push(...rows);
        continue;
      }
      if (t.type === 'blockquote') {
        const m = t.text.match(/^\s*\[!(\w+)\]\s*/);
        const type = m && CALLOUTS[m[1].toUpperCase()] ? m[1].toUpperCase() : 'NOTE';
        const body = m ? t.text.slice(m[0].length) : t.text;
        page.blocks.push({ kind: 'callout', type, html: kbdify(rewriteHrefs(marked.parse(body), meta.id)) });
        continue;
      }
      const one = [t];
      one.links = tokens.links;
      page.blocks.push({ kind: 'html', html: kbdify(rewriteHrefs(marked.parser(one), meta.id)) });
    }

    state.pages.set(meta.id, page);
    for (const e of page.entries) {
      state.entries.set(e.id, e);
      if (!meta.noIndex) state.index.push(e);
    }
  }

  function buildRows(t, meta, h2, h3) {
    const heads = t.header.map((h) => norm(plain(h.text)));
    const kind = heads[0].startsWith('atajo') ? 'keys' : 'cmd';
    const tagCols = heads.map((h, i) => (i > 0 && /^(utilidad|donde)/.test(h) ? i : -1)).filter((i) => i > 0);
    const textCols = heads.map((_, i) => i).filter((i) => i > 0 && !tagCols.includes(i));
    const mainCol = textCols[0];

    return t.rows.map((r) => {
      const keysMd = r[0].text;
      const mainMd = mainCol != null ? r[mainCol].text : '';
      const keysPlain = plain(keysMd);
      const mainPlain = plain(mainMd);
      let id = `${meta.id}|${keysPlain}|${mainPlain}`;
      while (state.entries.has(id)) id += '*';
      const extras = textCols.slice(1).map((i) => ({ label: plain(t.header[i].text), md: r[i].text }));
      const tags = tagCols.map((i) => plain(r[i].text)).filter(Boolean);
      const searchText = [keysPlain, mainPlain, ...extras.map((x) => plain(x.md)), ...tags, h2, h3, meta.title].join(' ');
      return {
        id, kind, page: meta.id, group: meta.group, h2, h3,
        keysHTML: kind === 'keys' ? keysToHTML(keysMd) : cmdHTML(keysMd),
        mainHTML: rich(mainMd, meta.id),
        extras: extras.map((x) => ({ label: x.label, html: rich(x.md, meta.id) })),
        tags,
        keysPlain, mainPlain,
        keyToks: norm(keysPlain).split(/[\s+,…/]+/).filter(Boolean),
        keysN: norm(keysPlain), mainN: norm(mainPlain), searchN: norm(searchText),
      };
    });
  }

  // ------------------------------------------------------------------------
  // Búsqueda
  // ------------------------------------------------------------------------
  function parseQuery(q) {
    return norm(q).split(/[\s+,]+/).filter((tok) => tok && tok !== '+').map((tok) => {
      const alts = new Set([tok, ...(ALIASES[tok] || [])]);
      if (tok.length > 4 && tok.endsWith('s')) alts.add(tok.slice(0, -1));
      if (tok.length > 5 && tok.endsWith('es')) alts.add(tok.slice(0, -2));
      return [...alts];
    });
  }
  function scoreEntry(e, query) {
    let score = 0;
    const keyHits = new Set();
    for (const alts of query) {
      let best = 0;
      for (const a of alts) {
        if (e.keyToks.includes(a)) { best = Math.max(best, 4); keyHits.add(a); }
        else if ([...a].length > 1) {
          if (e.mainN.includes(a)) best = Math.max(best, e.mainN.startsWith(a) ? 3.5 : 3);
          else if (e.keysN.includes(a)) best = Math.max(best, 2.5);
          else if (e.searchN.includes(a)) best = Math.max(best, 1);
        }
      }
      if (!best) return 0;
      score += best;
    }
    // Si se buscan teclas, prima el atajo que coincide exactamente (Win V → Win + V).
    if (keyHits.size) score += keyHits.size === new Set(e.keyToks).size ? 3 : -0.4 * (e.keyToks.length - keyHits.size);
    return score + (e.group === 'atajos' ? 0.3 : 0);
  }
  function search(q) {
    const query = parseQuery(q);
    if (!query.length) return { query, results: [] };
    const results = state.index
      .map((e) => ({ e, s: scoreEntry(e, query) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.e);
    return { query, results };
  }
  // Resalta en el texto las palabras buscadas, sin importar las tildes.
  function highlight(root, query) {
    const words = [...new Set(query.flat())].filter((w) => [...w].length >= 3);
    if (!words.length) return;
    const fold = { a: '[aáàä]', e: '[eéèë]', i: '[iíìï]', o: '[oóòö]', u: '[uúùü]', n: '[nñ]' };
    const pattern = words
      .sort((a, b) => b.length - a.length)
      .map((w) => [...w].map((ch) => fold[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join(''))
      .join('|');
    const re = new RegExp(`(${pattern})`, 'gi');
    for (const el of $$('.row-main, .row-extra', root)) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        if (!re.test(node.nodeValue)) continue;
        re.lastIndex = 0;
        const span = document.createElement('span');
        span.innerHTML = esc(node.nodeValue).replace(re, '<mark>$1</mark>');
        node.replaceWith(...span.childNodes);
      }
    }
  }

  // ------------------------------------------------------------------------
  // Plantillas
  // ------------------------------------------------------------------------
  function favButton(id) {
    const on = state.favs.has(id);
    return `<button class="mini-btn fav-btn" data-fav="${esc(id)}" aria-pressed="${on}" aria-label="${on ? 'Quitar de favoritos' : 'Guardar en favoritos'}" title="${on ? 'Quitar de favoritos' : 'Guardar en favoritos'}">${ICONS.starOff}${ICONS.starOn}</button>`;
  }
  function rowHTML(e, opts = {}) {
    const meta = META.get(e.page);
    const tags = e.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    const extras = e.extras.map((x) => `<div class="row-extra">${x.html}</div>`).join('');
    const where = [meta.title, e.h2, e.h3].filter(Boolean).join(' › ');
    const src = opts.showSource ? `<a class="row-src" href="#/p/${e.page}">${esc(where)}</a>` : '';
    return `<div class="row">
      <div class="row-keys">${e.keysHTML}</div>
      <div class="row-body"><div class="row-main">${tags}${e.mainHTML}</div>${extras}${src}</div>
      <div class="row-actions">${favButton(e.id)}</div>
    </div>`;
  }
  const rowsHTML = (rows, opts) => `<div class="rows">${rows.map((e) => rowHTML(e, opts)).join('')}</div>`;

  function blockHTML(b) {
    switch (b.kind) {
      case 'heading':
        return `<h${b.depth} class="sec-h" id="${b.id}">${b.icon ? `<span class="h-icon" aria-hidden="true">${b.icon}</span>` : ''}${esc(b.text)}</h${b.depth}>`;
      case 'rows':
        return rowsHTML(b.rows);
      case 'callout': {
        const c = CALLOUTS[b.type];
        return `<div class="callout ${c.cls}"><span class="callout-icon" aria-hidden="true">${c.icon}</span><div><div class="callout-title">${c.label}</div>${b.html}</div></div>`;
      }
      default:
        return `<div class="prose">${b.html}</div>`;
    }
  }

  const countFor = (pageId) => (state.pages.get(pageId)?.entries.length || 0);
  const totalShortcuts = () => state.index.filter((e) => e.kind === 'keys').length;
  const totalCommands = () => state.index.filter((e) => e.kind === 'cmd').length;

  function siteFooter() {
    return `<footer class="site-foot">
      <span>Pulsa <kbd>/</kbd> para buscar desde cualquier página.</span>
      <span>Contenido con licencia MIT · <a href="${REPO}" target="_blank" rel="noopener">Ver y contribuir en GitHub</a></span>
    </footer>`;
  }

  // ------------------------------------------------------------------------
  // Vistas
  // ------------------------------------------------------------------------
  const main = $('#main');
  const searchInput = $('#search');

  function setTitle(t) { document.title = t ? `${t} · ${SITE_NAME}` : `${SITE_NAME}: la guía definitiva`; }

  function renderNav() {
    const link = (href, icon, label, count, key) =>
      `<a class="nav-link" href="${href}" data-nav="${key}"><span class="nav-icon" aria-hidden="true">${icon}</span><span class="nav-label">${esc(label)}</span>${count != null ? `<span class="nav-count">${count}</span>` : ''}</a>`;
    let html = link('#/', '🏠', 'Inicio', null, 'home');
    html += link('#/favoritos', '⭐', 'Mis favoritos', state.favs.size || null, 'favoritos');
    html += link('#/practica', '🎯', 'Practicar', null, 'practica');
    for (const g of GROUPS) {
      const pages = PAGES.filter((p) => p.group === g.id && !p.hidden && state.pages.has(p.id));
      if (!pages.length) continue;
      html += `<div class="nav-group"><div class="nav-title">${esc(g.title)}</div>`;
      html += pages.map((p) => link('#/p/' + p.id, p.icon, p.title, countFor(p.id) || null, 'p/' + p.id)).join('');
      html += '</div>';
    }
    $('#nav').innerHTML = html;
    markNav();
  }
  function markNav() {
    const h = location.hash.replace(/^#\/?/, '').split('?')[0] || 'home';
    for (const a of $$('[data-nav]')) {
      if (a.dataset.nav === h) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    }
  }

  function categoryCards() {
    return GROUPS.map((g) => {
      const pages = PAGES.filter((p) => p.group === g.id && !p.hidden && state.pages.has(p.id));
      if (!pages.length) return '';
      const unit = g.id === 'atajos' ? 'atajos' : 'elementos';
      return `<div class="cat-group-title">${esc(g.title)}</div><div class="cat-grid">${pages.map((p) => `
        <a class="cat-card" href="#/p/${p.id}">
          <span class="cat-icon" aria-hidden="true">${p.icon}</span>
          <span class="cat-title">${esc(p.title)}</span>
          <span class="cat-desc">${esc(p.desc || '')}</span>
          <span class="cat-count">${countFor(p.id) ? `${countFor(p.id)} ${unit}` : 'Guía'}</span>
        </a>`).join('')}</div>`;
    }).join('');
  }

  function randomShortcut() {
    const pool = state.index.filter((e) => e.kind === 'keys');
    return pool.length ? pick(pool) : null;
  }
  function randomCard() {
    const e = randomShortcut();
    if (!e) return '';
    const meta = META.get(e.page);
    return `<div class="feature" id="random-card">
      <h3>🎲 Atajo al azar</h3>
      <div class="feature-keys">${e.keysHTML}</div>
      <div class="feature-desc">${e.mainHTML}</div>
      <div class="feature-src"><a href="#/p/${e.page}">${meta.icon} ${esc(meta.title)}</a>${e.h2 ? ' › ' + esc(e.h2) : ''}</div>
      <button class="btn" data-action="random">Otro atajo</button>
    </div>`;
  }

  function renderHome() {
    setTitle('');
    const summary = state.pages.get('hotkeys/README');
    const essentials = summary ? (summary.blocks.find((b) => b.kind === 'rows') || { rows: [] }).rows : [];
    let legend = '';
    if (summary) {
      const i = summary.blocks.findIndex((b) => b.kind === 'heading' && /leyenda/i.test(b.text));
      if (i >= 0) {
        const rest = summary.blocks.slice(i + 1);
        const end = rest.findIndex((b) => b.kind === 'heading');
        legend = (end >= 0 ? rest.slice(0, end) : rest).map(blockHTML).join('');
      }
    }
    main.innerHTML = `
      <section class="hero">
        <h1>Domina Windows 11 con el teclado</h1>
        <p>Escribe arriba lo que quieres hacer y te diremos cómo hacerlo más rápido. Guía en español, revisada en noviembre de 2026.</p>
        <div class="hero-chips"><span class="label">Prueba:</span>${SUGGESTIONS.map((s) => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>
        <div class="stats"><span><b>${totalShortcuts()}</b> atajos</span><span><b>${totalCommands()}</b> comandos</span><span><b>${PAGES.filter((p) => !p.hidden).length}</b> secciones</span></div>
      </section>

      <h2 class="section-title">🏆 Los ${essentials.length} imprescindibles <a class="aside" href="#/practica">Ponte a prueba →</a></h2>
      ${rowsHTML(essentials)}

      <h2 class="section-title">🧭 Explora por categoría</h2>
      ${categoryCards()}

      <h2 class="section-title">✨ Descubre</h2>
      <div class="feature-grid">
        ${randomCard()}
        <div class="feature">
          <h3>🎯 Modo práctica</h3>
          <p class="feature-desc muted">Te mostramos lo que hace un atajo y tú intentas recordarlo. La forma más rápida de memorizarlos.</p>
          <a class="btn btn-primary" href="#/practica">Empezar a practicar</a>
        </div>
        <div class="feature">
          <h3>⭐ Tus favoritos</h3>
          <p class="feature-desc muted">Pulsa la estrella de cualquier atajo para guardarlo. Tus favoritos se quedan en este navegador.</p>
          <a class="btn" href="#/favoritos">Ver favoritos${state.favs.size ? ` (${state.favs.size})` : ''}</a>
        </div>
      </div>

      ${legend ? `<details class="legend"><summary>🔤 ¿Cómo leer los atajos?</summary><div class="legend-body">${legend}</div></details>` : ''}
      ${siteFooter()}`;
  }

  function renderPage(id) {
    const page = state.pages.get(id);
    if (!page || page.meta.hidden) return renderNotFound();
    const meta = page.meta;
    const group = GROUPS.find((g) => g.id === meta.group);
    setTitle(meta.title);

    const sections = page.blocks.filter((b) => b.kind === 'heading' && b.depth === 2);
    const toc = sections.length > 1
      ? `<nav class="toc" aria-label="En esta página">${sections.map((s) => `<button class="chip" data-jump="${s.id}">${s.icon ? s.icon + ' ' : ''}${esc(s.text)}</button>`).join('')}</nav>`
      : '';

    const visible = PAGES.filter((p) => !p.hidden && state.pages.has(p.id));
    const idx = visible.findIndex((p) => p.id === id);
    const prev = visible[idx - 1], next = visible[idx + 1];

    main.innerHTML = `
      <div class="crumbs"><a href="#/">Inicio</a> › ${esc(group ? group.title : '')}</div>
      <header class="page-head">
        <span class="page-icon" aria-hidden="true">${meta.icon}</span>
        <div><h1>${esc(page.title)}</h1>${page.lead ? `<p class="lead">${page.lead}</p>` : ''}</div>
      </header>
      ${toc}
      ${page.blocks.map(blockHTML).join('')}
      <a class="edit-link" href="${REPO}/edit/${BRANCH}/${meta.id}.md" target="_blank" rel="noopener">${ICONS.edit} ¿Falta algo o hay un error? Edita esta página en GitHub</a>
      <nav class="page-foot" aria-label="Más secciones">
        ${prev ? `<a class="pager" href="#/p/${prev.id}"><small>← Anterior</small><span>${prev.icon} ${esc(prev.title)}</span></a>` : '<span></span>'}
        ${next ? `<a class="pager next" href="#/p/${next.id}"><small>Siguiente →</small><span>${next.icon} ${esc(next.title)}</span></a>` : ''}
      </nav>
      ${siteFooter()}`;
  }

  function renderSearch(q) {
    setTitle(`Buscar “${q}”`);
    const { query, results } = search(q);
    if (!results.length) {
      main.innerHTML = `<div class="empty">
        <div class="big" aria-hidden="true">🔎</div>
        <h2>No hay resultados para “${esc(q)}”</h2>
        <p class="muted">Prueba con otras palabras (por ejemplo, lo que quieres <em>hacer</em>) o con el nombre de una tecla: <kbd>Win</kbd>, <kbd>Ctrl</kbd>, <kbd>F2</kbd>…</p>
        <div class="hero-chips">${SUGGESTIONS.map((s) => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>
      </div>`;
      return;
    }
    const LIMIT = 120;
    const shown = results.slice(0, LIMIT);
    // Agrupa por página manteniendo el orden de relevancia.
    const groups = new Map();
    for (const e of shown) {
      if (!groups.has(e.page)) groups.set(e.page, []);
      groups.get(e.page).push(e);
    }
    main.innerHTML = `
      <div class="result-head"><h1>Resultados</h1><span class="muted">${results.length} ${results.length === 1 ? 'coincidencia' : 'coincidencias'} para “${esc(q)}”</span></div>
      ${[...groups].map(([pid, rows]) => {
        const m = META.get(pid);
        return `<h2 class="result-group"><span aria-hidden="true">${m.icon}</span><a href="#/p/${pid}">${esc(m.title)}</a> <span class="muted">· ${rows.length}</span></h2>${rowsHTML(rows, { showSource: true })}`;
      }).join('')}
      ${results.length > LIMIT ? `<p class="muted">Se muestran los ${LIMIT} más relevantes. Añade más palabras para afinar.</p>` : ''}`;
    highlight(main, query);
  }

  function renderFavorites() {
    setTitle('Mis favoritos');
    const rows = [...state.favs].map((id) => state.entries.get(id)).filter(Boolean);
    main.innerHTML = rows.length
      ? `<div class="result-head"><h1>⭐ Mis favoritos</h1><span class="muted">${rows.length} guardados en este navegador</span></div>${rowsHTML(rows, { showSource: true })}${siteFooter()}`
      : `<div class="empty"><div class="big" aria-hidden="true">⭐</div><h2>Todavía no tienes favoritos</h2>
         <p class="muted">Pulsa la estrella que aparece junto a cualquier atajo para guardarlo aquí.</p>
         <p><a class="btn btn-primary" href="#/">Explorar atajos</a></p></div>`;
  }

  // ---- Modo práctica ----
  const practice = { cat: store.get('practice-cat', 'all'), current: null, known: 0, total: 0, revealed: false };
  function practicePool() {
    const matchesCat = (e) =>
      practice.cat === 'all' ? true :
      practice.cat === 'favs' ? state.favs.has(e.id) :
      e.page === practice.cat;
    return state.index.filter((e) => e.kind === 'keys' && e.group === 'atajos' && matchesCat(e) && !e.mainHTML.includes('<kbd'));
  }
  function nextQuestion() {
    const pool = practicePool();
    if (!pool.length) { practice.current = null; return; }
    let e = pick(pool);
    if (pool.length > 1) while (practice.current && e.id === practice.current.id) e = pick(pool);
    practice.current = e;
    practice.revealed = false;
  }
  function renderPractice() {
    setTitle('Practicar');
    if (!practice.current || !practicePool().includes(practice.current)) nextQuestion();
    const e = practice.current;
    const options = [
      ['all', 'Todas las categorías'],
      ['favs', '⭐ Solo mis favoritos'],
      ...PAGES.filter((p) => p.group === 'atajos' && state.pages.has(p.id)).map((p) => [p.id, `${p.icon} ${p.title}`]),
    ].map(([v, l]) => `<option value="${esc(v)}"${v === practice.cat ? ' selected' : ''}>${esc(l)}</option>`).join('');
    const meta = e ? META.get(e.page) : null;

    main.innerHTML = `
      <div class="result-head"><h1>🎯 Practicar</h1></div>
      <p class="muted">Lee lo que hace el atajo, intenta recordarlo (¡o pruébalo en tu PC!) y luego compruébalo.</p>
      <div class="practice-bar">
        <label for="practice-cat" class="muted">Categoría:</label>
        <select id="practice-cat">${options}</select>
        <span class="score" aria-live="polite">${practice.total ? `Lo sabías: ${practice.known} de ${practice.total}` : ''}</span>
      </div>
      ${e ? `<div class="practice-card">
        <div class="practice-src">${meta.icon} ${esc(meta.title)}${e.h2 ? ' › ' + esc(e.h2) : ''}</div>
        <div class="practice-q">${e.mainHTML}</div>
        ${practice.revealed
          ? `<div class="practice-a">${e.keysHTML}</div>
             <div class="practice-actions">
               <button class="btn btn-primary" data-action="knew">✓ Lo sabía</button>
               <button class="btn" data-action="didnt">✗ No lo sabía</button>
               ${favButton(e.id)}
             </div>`
          : `<div class="practice-actions">
               <button class="btn btn-primary" data-action="reveal">Mostrar atajo</button>
               <button class="btn" data-action="skip">Saltar</button>
             </div>`}
      </div>` : `<div class="empty"><h2>No hay atajos en esta categoría</h2><p class="muted">Elige otra categoría o guarda algunos favoritos.</p></div>`}`;
    const revealBtn = $('[data-action="reveal"]', main);
    if (revealBtn) revealBtn.focus({ preventScroll: true });
  }

  function renderNotFound() {
    setTitle('No encontrado');
    main.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">🧭</div><h2>Esta página no existe</h2><p><a class="btn btn-primary" href="#/">Volver al inicio</a></p></div>`;
  }

  // ------------------------------------------------------------------------
  // Enrutado
  // ------------------------------------------------------------------------
  const isSearchHash = (h) => h.startsWith('#/buscar');
  function queryFromHash(h) {
    const m = h.match(/[?&]q=([^&]*)/);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  function route(force) {
    const h = location.hash || '#/';
    if (!force && h === state.lastHash) return;
    state.lastHash = h;
    document.body.classList.remove('nav-open');
    $('#menu-btn').setAttribute('aria-expanded', 'false');
    $('#scrim').hidden = true;

    if (isSearchHash(h)) {
      const q = queryFromHash(h);
      if (searchInput.value.trim() !== q) searchInput.value = q;
      if (q) renderSearch(q); else renderHome();
    } else {
      state.prevHash = h;
      if (searchInput.value) searchInput.value = '';
      const path = h.replace(/^#\/?/, '');
      if (path.startsWith('p/')) renderPage(decodeURIComponent(path.slice(2)));
      else if (path === 'favoritos') renderFavorites();
      else if (path === 'practica') renderPractice();
      else if (path === '' || path === '/') renderHome();
      else renderNotFound();
      window.scrollTo(0, 0);
    }
    markNav();
    afterRender();
  }

  function afterRender() {
    for (const a of $$('a[href^="http"]', main)) {
      if (!a.target) { a.target = '_blank'; a.rel = 'noopener'; }
    }
    for (const pre of $$('.prose pre', main)) {
      if (pre.querySelector('.mini-btn')) continue;
      const code = pre.querySelector('code');
      if (!code) continue;
      const b = document.createElement('button');
      b.className = 'mini-btn';
      b.dataset.copy = code.textContent.trim();
      b.setAttribute('aria-label', 'Copiar código');
      b.title = 'Copiar';
      b.innerHTML = ICONS.copy;
      pre.appendChild(b);
    }
  }

  function onSearchInput() {
    const q = searchInput.value.trim();
    const url = '#/buscar?q=' + encodeURIComponent(q);
    if (q) {
      if (isSearchHash(location.hash)) history.replaceState(null, '', url);
      else history.pushState(null, '', url);
      state.lastHash = url;
      renderSearch(q);
      markNav();
      afterRender();
    } else if (isSearchHash(location.hash)) {
      location.hash = state.prevHash || '#/';
    }
  }

  // ------------------------------------------------------------------------
  // Interacción
  // ------------------------------------------------------------------------
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (err) { /* sin soporte */ }
      ta.remove();
    }
    toast('Copiado: ' + text);
  }

  function toggleFav(id) {
    if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
    store.set('favs', [...state.favs]);
    const on = state.favs.has(id);
    for (const b of $$('[data-fav]')) {
      if (b.dataset.fav !== id) continue;
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? 'Quitar de favoritos' : 'Guardar en favoritos');
      b.title = on ? 'Quitar de favoritos' : 'Guardar en favoritos';
    }
    toast(on ? '⭐ Guardado en favoritos' : 'Quitado de favoritos');
    renderNav();
    if (location.hash === '#/favoritos' && !on) renderFavorites();
  }

  document.addEventListener('click', (ev) => {
    const t = ev.target;
    const fav = t.closest('[data-fav]');
    if (fav) { toggleFav(fav.dataset.fav); return; }
    const copy = t.closest('[data-copy]');
    if (copy) { copyText(copy.dataset.copy); return; }
    const q = t.closest('[data-q]');
    if (q) { searchInput.value = q.dataset.q; onSearchInput(); searchInput.focus(); return; }
    const jump = t.closest('[data-jump]');
    if (jump) { const el = document.getElementById(jump.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const action = t.closest('[data-action]');
    if (action) {
      const a = action.dataset.action;
      if (a === 'random') {
        const card = $('#random-card');
        if (card) { card.outerHTML = randomCard(); afterRender(); const b = $('#random-card [data-action="random"]'); if (b) b.focus(); }
      } else if (a === 'reveal') { practice.revealed = true; renderPractice(); const k = $('[data-action="knew"]'); if (k) k.focus({ preventScroll: true }); }
      else if (a === 'knew' || a === 'didnt') { practice.total++; if (a === 'knew') practice.known++; nextQuestion(); renderPractice(); }
      else if (a === 'skip') { nextQuestion(); renderPractice(); }
    }
  });

  document.addEventListener('change', (ev) => {
    if (ev.target.id === 'practice-cat') {
      practice.cat = ev.target.value;
      store.set('practice-cat', practice.cat);
      practice.current = null;
      renderPractice();
    }
  });

  document.addEventListener('keydown', (ev) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '') || document.activeElement?.isContentEditable;
    if ((ev.key === '/' && !typing) || ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k')) {
      ev.preventDefault();
      searchInput.focus();
      searchInput.select();
    } else if (ev.key === 'Escape') {
      if (document.body.classList.contains('nav-open')) { closeNav(); return; }
      if (document.activeElement === searchInput) {
        if (searchInput.value) { searchInput.value = ''; onSearchInput(); } else searchInput.blur();
      }
    } else if (!typing && location.hash === '#/practica' && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
      if (ev.key === ' ' && !practice.revealed && document.activeElement?.tagName !== 'BUTTON') { ev.preventDefault(); $('[data-action="reveal"]')?.click(); }
    }
  });

  searchInput.addEventListener('input', onSearchInput);
  searchInput.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { ev.preventDefault(); const first = $('.row', main); if (first) first.scrollIntoView({ block: 'center' }); searchInput.blur(); }
  });

  function closeNav() {
    document.body.classList.remove('nav-open');
    $('#menu-btn').setAttribute('aria-expanded', 'false');
    $('#scrim').hidden = true;
  }
  $('#menu-btn').addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    $('#menu-btn').setAttribute('aria-expanded', String(open));
    $('#scrim').hidden = !open;
  });
  $('#scrim').addEventListener('click', closeNav);
  $('#nav').addEventListener('click', (ev) => { if (ev.target.closest('a')) closeNav(); });

  // ---- Tema ----
  const THEMES = { auto: 'Tema: automático', light: 'Tema: claro', dark: 'Tema: oscuro' };
  let theme = store.get('theme', 'auto');
  function applyTheme() {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    const btn = $('#theme-btn');
    btn.title = THEMES[theme] + ' (pulsa para cambiar)';
    btn.setAttribute('aria-label', btn.title);
  }
  $('#theme-btn').addEventListener('click', () => {
    theme = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto';
    store.set('theme', theme);
    applyTheme();
    toast(THEMES[theme]);
  });
  applyTheme();

  // Texto de ayuda del buscador más corto en pantallas pequeñas.
  const narrow = window.matchMedia('(max-width: 640px)');
  const setPlaceholder = () => { searchInput.placeholder = narrow.matches ? 'Buscar atajos…' : '¿Qué quieres hacer? Ej.: captura, pestaña, Win + V'; };
  setPlaceholder();
  if (narrow.addEventListener) narrow.addEventListener('change', setPlaceholder);

  window.addEventListener('hashchange', () => route());
  window.addEventListener('popstate', () => route());

  // ------------------------------------------------------------------------
  // Arranque
  // ------------------------------------------------------------------------
  async function load() {
    if (typeof marked === 'undefined') {
      main.innerHTML = '<div class="empty"><h2>No se pudo cargar la web</h2></div>';
      return;
    }
    const results = await Promise.allSettled(PAGES.map((p) =>
      fetch(encodeURI(p.id + '.md'), { cache: 'no-cache' }).then((r) => {
        if (!r.ok) throw new Error(`${p.id}.md → HTTP ${r.status}`);
        return r.text();
      })));
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        try { processPage(PAGES[i], r.value); } catch (err) { console.error('Error procesando', PAGES[i].id, err); }
      } else {
        console.warn('No se pudo cargar', PAGES[i].id, r.reason);
      }
    });
    if (!state.pages.size) {
      main.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">⚠️</div><h2>No se pudo cargar la guía</h2>
        <p class="muted">Si estás viendo el archivo en local, ábrelo con un servidor web (por ejemplo, <code>python -m http.server</code>).</p>
        <p><a class="btn" href="${REPO}">Leer la guía en GitHub</a></p></div>`;
      return;
    }
    // Quita de los favoritos lo que ya no existe en la guía.
    const before = state.favs.size;
    for (const id of [...state.favs]) if (!state.entries.has(id)) state.favs.delete(id);
    if (state.favs.size !== before) store.set('favs', [...state.favs]);

    renderNav();
    route(true);
  }

  load();
})();
