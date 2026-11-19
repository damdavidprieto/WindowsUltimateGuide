/* ==========================================================================
   Atajos de Windows 11 · Visual Studio 2026 · VS Code
   ---------------------------------------------------------------------------
   La web lee los archivos Markdown de la guía (la única fuente del
   contenido) y convierte sus tablas en listas de atajos con:
   teclas dibujadas, nivel, "cuándo usarlo", teclado visual, buscador,
   favoritos y modo práctica.

   Formato de tabla que entiende (columnas en cualquier orden tras la 1.ª):
     | Atajo | Qué hace | Cuándo usarlo | Nivel |
   Para añadir una página: crea el .md y añádelo a PAGES.
   ========================================================================== */
(function () {
  'use strict';

  const REPO = 'https://github.com/damdavidprieto/WindowsUltimateGuide';
  const BRANCH = 'main';
  const SITE_NAME = 'Atajos de Teclado';

  const PRODUCTS = [
    { id: 'windows', title: 'Windows 11', icon: 'win', desc: 'Ventanas, archivos, capturas, texto y todo el sistema.' },
    { id: 'vs', title: 'Visual Studio 2026', icon: '🟣', desc: 'El entorno de Microsoft para C#, C++ y .NET.' },
    { id: 'vscode', title: 'Visual Studio Code', icon: '🔵', desc: 'El editor de código gratuito y ligero.' },
    { id: 'extras', title: 'Extras', icon: '➕', desc: 'Navegadores, PowerToys, Win + R y trucos del sistema.' },
  ];
  const PRODUCT = new Map(PRODUCTS.map((p) => [p.id, p]));

  // Orden = orden del menú.
  const PAGES = [
    { id: 'hotkeys/README', hidden: true, noIndex: true, title: 'Resumen', icon: '⌨️' },
    { id: 'hotkeys/empieza-aqui', product: 'start', noIndex: true, title: 'Cómo usar los atajos', icon: '🎓', desc: 'Para quien empieza: cómo se pulsan y dónde está cada tecla.' },
    { id: 'hotkeys/general', product: 'windows', title: 'Tecla Windows', icon: 'win', desc: 'Sistema, paneles, búsqueda, escritura y Copilot.' },
    { id: 'hotkeys/navigation', product: 'windows', title: 'Ventanas y escritorios', icon: '🪟', desc: 'Cambiar de ventana, Snap, escritorios y barra de tareas.' },
    { id: 'hotkeys/explorer', product: 'windows', title: 'Explorador de archivos', icon: '📂', desc: 'Copiar, mover, renombrar y organizar archivos.' },
    { id: 'hotkeys/text-editing', product: 'windows', title: 'Texto y diálogos', icon: '✍️', desc: 'Copiar, pegar, seleccionar y formularios en cualquier app.' },
    { id: 'hotkeys/screenshots', product: 'windows', title: 'Capturas y grabación', icon: '📸', desc: 'Capturas de pantalla y vídeos de la pantalla.' },
    { id: 'hotkeys/accessibility', product: 'windows', title: 'Accesibilidad', icon: '♿', desc: 'Lupa, Narrador, subtítulos y ayudas del teclado.' },
    { id: 'hotkeys/terminal', product: 'windows', title: 'Terminal', icon: '🐚', desc: 'Windows Terminal, PowerShell y CMD.' },
    { id: 'development/visual-studio', product: 'vs', title: 'Visual Studio 2026', icon: '🟣', desc: 'Editar, navegar, refactorizar, depurar, pruebas y Copilot.' },
    { id: 'development/vscode', product: 'vscode', title: 'Visual Studio Code', icon: '🔵', desc: 'Editar, varios cursores, terminal, depurar y Copilot.' },
    { id: 'hotkeys/browser', product: 'extras', title: 'Navegadores', icon: '🌐', desc: 'Edge, Chrome y Firefox.' },
    { id: 'power-user/powertoys', product: 'extras', title: 'PowerToys', icon: '🚀', desc: 'Utilidades gratuitas de Microsoft.' },
    { id: 'win-plus-r/essentials', product: 'extras', title: 'Win + R: apps', icon: '🏃', desc: 'calc, notepad, wt, msinfo32…' },
    { id: 'win-plus-r/control-panel', product: 'extras', title: 'Win + R: Panel de Control', icon: '⚙️', desc: 'Ajustes clásicos (.cpl).' },
    { id: 'win-plus-r/system-admin', product: 'extras', title: 'Win + R: administración', icon: '🧑‍💼', desc: 'Consolas de gestión (.msc).' },
    { id: 'system/env-vars', product: 'extras', title: 'Variables de entorno', icon: '🧭', desc: '%APPDATA%, %TEMP%, %USERPROFILE%…' },
    { id: 'system/built-in-tools', product: 'extras', title: 'Herramientas nativas', icon: '🧰', desc: 'Utilidades que vienen con Windows.' },
    { id: 'system/cli-tips', product: 'extras', title: 'Comandos de terminal', icon: '💻', desc: 'sfc, winget, ipconfig y más.' },
    { id: 'power-user/wsl', product: 'extras', title: 'WSL (Linux)', icon: '🐧', desc: 'Linux dentro de Windows.' },
    { id: 'power-user/god-mode', product: 'extras', title: 'God Mode', icon: '👑', desc: 'Todos los ajustes en una carpeta.' },
    { id: 'power-user/registry-hacks', product: 'extras', title: 'Trucos del registro', icon: '🔧', desc: 'Ajustes de interfaz con el registro.' },
  ];
  const META = new Map(PAGES.map((p) => [p.id, p]));

  const LEVELS = [
    { id: 'basico', label: 'Básico', hint: 'Imprescindibles' },
    { id: 'intermedio', label: 'Intermedio', hint: 'Muy útiles' },
    { id: 'avanzado', label: 'Avanzado', hint: 'Para expertos' },
  ];
  const LEVEL = new Map(LEVELS.map((l) => [l.id, l]));

  const SUGGESTIONS = ['copiar', 'captura de pantalla', 'cambiar de ventana', 'deshacer', 'renombrar', 'comentar código', 'terminal', 'depurar'];

  // Lo que la gente escribe → cómo aparece en la guía.
  const ALIASES = {
    windows: ['win'], logo: ['win'], control: ['ctrl'], ctl: ['ctrl'],
    mayus: ['shift'], mayusculas: ['shift', 'mayusculas'],
    escape: ['esc'], intro: ['enter'], return: ['enter'],
    suprimir: ['supr'], delete: ['supr'], del: ['supr'], borrar: ['borra', 'elimina', 'supr'], eliminar: ['borra', 'elimina'],
    space: ['espacio'], print: ['imprpant'], prtscn: ['imprpant'], impr: ['imprpant'],
    pantallazo: ['captura'], screenshot: ['captura'], capturar: ['captura'], foto: ['captura'],
    recortar: ['recorte', 'captura'], video: ['graba', 'video'], grabar: ['graba'],
    pestanas: ['pestana'], tabs: ['pestana', 'tab'], ventanas: ['ventana'], escritorios: ['escritorio'],
    monitores: ['monitor'], pantallas: ['pantalla', 'monitor'], emojis: ['emoji'], emoticono: ['emoji'],
    apagar: ['apaga'], buscar: ['busca'], busqueda: ['busca'], admin: ['administrador'],
    consola: ['consola', 'terminal'], clipboard: ['portapapeles'], dictar: ['dicta', 'voz'], voz: ['voz', 'dicta'],
    zoom: ['zoom', 'ampli', 'lupa'], copiar: ['copia'], pegar: ['pega'], cortar: ['corta'], guardar: ['guarda'],
    deshacer: ['deshace'], rehacer: ['rehace'], cerrar: ['cierra'], abrir: ['abre'], seleccionar: ['selecciona'],
    renombrar: ['renombra', 'nombre'], comentar: ['comenta'], comentario: ['comenta'], formatear: ['formato'],
    depurar: ['depura'], debug: ['depura'], breakpoint: ['interrupcion'], ejecutar: ['ejecuta'], compilar: ['compila'],
    mover: ['mueve'], duplicar: ['duplica'], cambiar: ['cambia'], minimizar: ['minimiza'], maximizar: ['maximiza'],
    bloquear: ['bloquea'], ir: ['ir', 'va'], linea: ['linea'], lineas: ['linea'], cursor: ['cursor'], cursores: ['cursor'],
    copilot: ['copilot'], ia: ['copilot', 'ia'], git: ['git'], vscode: ['vs code'], code: ['code'],
  };

  const KEY_NAMES = new Set([
    'win', 'ctrl', 'shift', 'alt', 'altgr', 'tab', 'esc', 'enter', 'espacio', 'supr', 'inicio', 'fin',
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
    keyboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M6 13.5h.01M18 13.5h.01M9 14.5h6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
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
  const stripEmoji = (s) => String(s).replace(EMOJI_RE, '').replace(/⊞/g, '').replace(/\s+/g, ' ').trim();
  const leadingEmoji = (s) => {
    const m = String(s).match(/^\s*((?:[\p{Extended_Pictographic}⊞][️‍]*)+)/u);
    return m ? m[1] : '';
  };
  const plain = (md) => stripEmoji(String(md).replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').replace(/<[^>]+>/g, ''));
  const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion';
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  const WIN_LOGO = '<span class="win-logo" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
  const iconHTML = (icon, cls = '') => (icon === 'win' ? `<span class="win-logo ${cls}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>` : `<span class="${cls}" aria-hidden="true">${icon}</span>`);

  const store = {
    get(key, fallback) { try { const v = localStorage.getItem('wug-' + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; } },
    set(key, value) { try { localStorage.setItem('wug-' + key, JSON.stringify(value)); } catch (e) { /* sin almacenamiento */ } },
  };

  const dirOf = (id) => (id.includes('/') ? id.slice(0, id.lastIndexOf('/')) : '');
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
    const target = resolvePath(dirOf(pageId), href.split('#')[0]);
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
  // Teclas dibujadas
  // ------------------------------------------------------------------------
  function kbd(escaped) {
    const t = escaped.trim();
    return t === 'Win' ? `<kbd>${WIN_LOGO}Win</kbd>` : `<kbd>${t}</kbd>`;
  }
  const joinPlus = (html) => html.replace(/<\/kbd>\s*\+\s*<kbd/g, '</kbd><span class="plus" aria-label="más">+</span><kbd');
  function isKeyName(raw) {
    const t = norm(unesc(raw).trim());
    if (!t) return false;
    if (KEY_NAMES.has(t) || /^f\d{1,2}$/.test(t)) return true;
    return [...t].length === 1;
  }
  const keysToHTML = (md) => joinPlus(marked.parseInline(md).replace(/<code>([^<]*)<\/code>/g, (m, c) => kbd(c)));
  const kbdify = (html) => joinPlus(html.replace(/<code>([^<]{1,16})<\/code>/g, (m, c) => (isKeyName(c) ? kbd(c) : m)));
  const rich = (md, pageId) => kbdify(rewriteHrefs(marked.parseInline(md), pageId));
  const cmdHTML = (md) => marked.parseInline(md).replace(/<code>([^<]*)<\/code>/g, (m, c) =>
    `<code>${c}</code><button class="mini-btn cmd-copy" data-copy="${c}" aria-label="Copiar ${c}" title="Copiar">${ICONS.copy}</button>`);

  // ------------------------------------------------------------------------
  // Teclado visual (distribución española)
  // ------------------------------------------------------------------------
  const K = (id, label, w = 1) => ({ id, label, w });
  const GAP = (w) => ({ gap: true, w });
  const letters = (s) => [...s].map((c) => K(c.toLowerCase(), c));
  const KB_MAIN = [
    [K('esc', 'Esc'), GAP(1), ...['f1', 'f2', 'f3', 'f4'].map((f) => K(f, f.toUpperCase())), GAP(0.5), ...['f5', 'f6', 'f7', 'f8'].map((f) => K(f, f.toUpperCase())), GAP(0.5), ...['f9', 'f10', 'f11', 'f12'].map((f) => K(f, f.toUpperCase()))],
    [K('º', 'º'), ...letters('1234567890'), K("'", "'"), K('¡', '¡'), K('retroceso', '⟵', 2)],
    [K('tab', 'Tab', 1.5), ...letters('QWERTYUIOP'), K('`', '`'), K('+', '+'), K('enter', 'Enter', 1.5)],
    [K('bloq mayus', 'Bloq Mayús', 1.75), ...letters('ASDFGHJKLÑ'), K('´', '´'), K('ç', 'Ç'), K('enter', '↵', 1.25)],
    [K('shift', '⇧ Shift', 1.25), K('<', '<'), ...letters('ZXCVBNM'), K(',', ','), K('.', '.'), K('-', '-'), K('shift-r', '⇧ Shift', 2.75)],
    [K('ctrl', 'Ctrl', 1.25), K('win', 'win', 1.25), K('alt', 'Alt', 1.25), K('espacio', 'Espacio', 6.25), K('altgr', 'AltGr', 1.25), K('win-r', 'win', 1.25), K('menu', 'Menú', 1.25), K('ctrl-r', 'Ctrl', 1.25)],
  ];
  const KB_NAV = [
    [K('imprpant', 'Impr Pant'), K('bloq despl', 'Bloq Despl'), K('pausa', 'Pausa')],
    [K('insert', 'Insert'), K('inicio', 'Inicio'), K('repag', 'RePág')],
    [K('supr', 'Supr'), K('fin', 'Fin'), K('avpag', 'AvPág')],
    [GAP(3)],
    [GAP(1), K('↑', '↑'), GAP(1)],
    [K('←', '←'), K('↓', '↓'), K('→', '→')],
  ];
  const KB_IDS = new Set([...KB_MAIN, ...KB_NAV].flat().filter((k) => !k.gap).map((k) => k.id));
  const keyId = (name) => {
    const l = String(name).trim().toLowerCase();
    return [...l].length > 1 ? l.normalize('NFD').replace(/[̀-ͯ]/g, '') : l;
  };
  const KEY_ALIASES = { 'tecla menu': 'menu', 'bloq mayus': 'bloq mayus', 'pausa': 'pausa' };
  const SYMBOLS = {
    ';': [',', '«;» se escribe con Shift + «,»'], ':': ['.', '«:» se escribe con Shift + «.»'],
    '/': ['7', '«/» se escribe con Shift + 7'], '?': ["'", '«?» se escribe con Shift + «\'»'],
    '=': ['0', '«=» se escribe con Shift + 0'], '_': ['-', '«_» se escribe con Shift + «-»'],
    '*': ['+', '«*» se escribe con Shift + «+»'], '\\': ['º', '«\\» se escribe con AltGr + º'],
    '[': ['`', '«[» se escribe con AltGr + «`»'], ']': ['+', '«]» se escribe con AltGr + «+»'],
  };

  // Convierte el Markdown de una celda de atajo en pasos y alternativas.
  function parseCombo(md) {
    const segs = [];
    const re = /`([^`]+)`|([^`]+)/g;
    let m;
    while ((m = re.exec(md))) segs.push(m[1] != null ? { k: m[1] } : { t: m[2] });
    if (!segs.some((s) => s.k)) return null;
    let alts = [{ keys: [] }];
    const steps = [alts];
    let pendingRange = false, mouse = '';
    const extra = [];
    for (const s of segs) {
      const alt = alts[alts.length - 1];
      if (s.k != null) {
        if (pendingRange && alt.keys.length) { const prev = alt.keys.pop(); alt.keys.push({ range: [prev.name, s.k] }); }
        else alt.keys.push({ name: s.k });
        pendingRange = false;
        continue;
      }
      const t = s.t;
      if (/clic|arrastr|rueda/i.test(t)) mouse = t.replace(/^[\s+]+|[\s+]+$/g, '');
      if (/^\s*…\s*$/.test(t)) { pendingRange = true; continue; }
      if (/^\s*der/i.test(t) && alt.keys.length) {
        const last = alt.keys[alt.keys.length - 1];
        if (last.name && ['shift', 'ctrl', 'win'].includes(keyId(last.name))) last.right = true;
      }
      const leftover = t.replace(/[+,/…]/g, ' ').replace(/(^|\s)o(\s|$)/g, ' ').replace(/\s+/g, ' ').trim();
      if (leftover && !/^(izq|der)\.?$/i.test(leftover)) extra.push(leftover);
      if (/,/.test(t)) { alts = [{ keys: [] }]; steps.push(alts); continue; }
      if (/(^|\s)(o|\/)(\s|$)/.test(t)) { alts.push({ keys: [] }); continue; }
    }
    const clean = steps.map((st) => {
      const list = st.filter((a) => a.keys.length);
      const base = list[0];
      for (const a of list.slice(1)) {
        if (a.keys.length === 1 && base && base.keys.length > 1) a.keys = [...base.keys.slice(0, -1), ...a.keys];
      }
      return list;
    }).filter((st) => st.length);
    return clean.length ? { steps: clean, mouse, extra: [...new Set(extra)] } : null;
  }

  function idsFor(k) {
    const notes = [];
    const resolve = (name, right) => {
      let id = keyId(name);
      id = KEY_ALIASES[id] || id;
      if (right && KB_IDS.has(id + '-r')) id += '-r';
      if (KB_IDS.has(id)) return id;
      const sym = SYMBOLS[name.trim()];
      if (sym) { notes.push(sym[1]); return sym[0]; }
      return null;
    };
    if (k.range) {
      const a = k.range[0].trim(), b = k.range[1].trim();
      const out = [];
      if (/^\d$/.test(a) && /^\d$/.test(b)) for (let i = +a; i <= +b; i++) out.push(String(i));
      return { ids: out, notes };
    }
    const id = resolve(k.name, k.right);
    return { ids: id ? [id] : [], notes, unknown: id ? null : k.name };
  }

  const keyLabelHTML = (k) => (k.range ? `${kbd(esc(k.range[0]))}…${kbd(esc(k.range[1]))}` : kbd(esc(k.name)));
  const comboHTML = (keys) => joinPlus(keys.map(keyLabelHTML).join(' + '));
  function listJoin(items) {
    if (items.length <= 1) return items.join('');
    return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1];
  }
  function instruction(keys) {
    const last = keys[keys.length - 1];
    const lastHTML = last.range ? `una tecla del ${kbd(esc(last.range[0]))} al ${kbd(esc(last.range[1]))}` : keyLabelHTML(last);
    if (keys.length === 1) return `Pulsa ${lastHTML}.`;
    const mods = keys.slice(0, -1).map(keyLabelHTML);
    return `Mantén pulsada${mods.length > 1 ? 's' : ''} ${listJoin(mods)}, pulsa ${lastHTML} y suelta todo.`;
  }

  function keyboardHTML(keys) {
    const hold = new Set(), press = new Set();
    const notes = [], unknown = [];
    keys.forEach((k, i) => {
      const r = idsFor(k);
      notes.push(...r.notes);
      if (r.unknown) unknown.push(r.unknown);
      for (const id of r.ids) (i === keys.length - 1 ? press : hold).add(id);
    });
    const keyEl = (k) => {
      if (k.gap) return `<span class="kb-gap" style="--w:${k.w}"></span>`;
      const cls = press.has(k.id) ? ' press' : hold.has(k.id) ? ' hold' : '';
      const label = k.label === 'win' ? `${WIN_LOGO}` : esc(k.label);
      return `<span class="kb-key${cls}" style="--w:${k.w}">${label}</span>`;
    };
    const rows = (layout) => layout.map((row) => `<div class="kb-row">${row.map(keyEl).join('')}</div>`).join('');
    const navIds = new Set(KB_NAV.flat().filter((k) => !k.gap).map((k) => k.id));
    const usesNav = [...hold, ...press].some((id) => navIds.has(id));
    return {
      html: `<div class="kb${usesNav ? '' : ' no-nav'}" role="img" aria-label="Teclado con las teclas del atajo resaltadas"><div class="kb-main">${rows(KB_MAIN)}</div><div class="kb-nav">${rows(KB_NAV)}</div></div>`,
      notes: [...new Set(notes)],
      unknown,
    };
  }

  // ------------------------------------------------------------------------
  // Procesado de páginas
  // ------------------------------------------------------------------------
  const state = {
    pages: new Map(),
    entries: new Map(),
    index: [],
    favs: new Set(store.get('favs', [])),
    level: store.get('level', 'all'),
    searchProduct: 'all',
    prevHash: '#/',
    lastHash: null,
  };

  function levelOf(md) {
    const t = norm(plain(md));
    if (t.startsWith('basic')) return 'basico';
    if (t.startsWith('inter')) return 'intermedio';
    if (t.startsWith('avanz')) return 'avanzado';
    return '';
  }

  function processPage(meta, md) {
    const tokens = marked.lexer(md);
    const page = { meta, title: meta.title, lead: '', blocks: [], entries: [] };
    const used = new Set();
    let h2 = '', h3 = '', seenH1 = false;
    for (const t of tokens) {
      if (t.type === 'space' || t.type === 'hr') continue;
      if (t.type === 'heading' && t.depth === 1 && !seenH1) { seenH1 = true; page.title = plain(t.text); continue; }
      if (t.type === 'paragraph' && /^\s*\[(⬅️|🏠)/u.test(t.text)) continue;
      if (t.type === 'paragraph' && !page.lead && page.blocks.length === 0) { page.lead = rich(t.text, meta.id); continue; }
      if (t.type === 'heading') {
        const text = plain(t.text);
        if (t.depth <= 2) { h2 = text; h3 = ''; } else h3 = text;
        let id = 's-' + slug(text), n = 2;
        while (used.has(id)) id = 's-' + slug(text) + '-' + n++;
        used.add(id);
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
        const mm = t.text.match(/^\s*\[!(\w+)\]\s*/);
        const type = mm && CALLOUTS[mm[1].toUpperCase()] ? mm[1].toUpperCase() : 'NOTE';
        page.blocks.push({ kind: 'callout', type, html: kbdify(rewriteHrefs(marked.parse(mm ? t.text.slice(mm[0].length) : t.text), meta.id)) });
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
    const find = (re) => heads.findIndex((h, i) => i > 0 && re.test(h));
    const levelCol = find(/^nivel/);
    const useCol = find(/^(cuando|uso|para que sirve)/);
    const tagCols = heads.map((h, i) => (i > 0 && /^(utilidad|donde)/.test(h) ? i : -1)).filter((i) => i > 0);
    let mainCol = find(/^(que hace|accion|abre|apunta)/);
    const others = heads.map((_, i) => i).filter((i) => i > 0 && i !== levelCol && i !== useCol && !tagCols.includes(i));
    if (mainCol < 0) mainCol = others[0] ?? -1;
    const extraCols = others.filter((i) => i !== mainCol);

    return t.rows.map((r) => {
      const keysMd = r[0].text;
      const mainMd = mainCol >= 0 ? r[mainCol].text : '';
      const useMd = useCol >= 0 ? r[useCol].text : '';
      const keysPlain = plain(keysMd);
      const mainPlain = plain(mainMd);
      let id = `${meta.id}|${keysPlain}|${mainPlain}`;
      while (state.entries.has(id)) id += '*';
      const extras = extraCols.map((i) => ({ label: plain(t.header[i].text), md: r[i].text }));
      const tags = tagCols.map((i) => plain(r[i].text)).filter(Boolean);
      const usePlain = plain(useMd);
      return {
        id, kind, page: meta.id, product: meta.product, h2, h3,
        level: levelCol >= 0 ? levelOf(r[levelCol].text) : '',
        keysMd, keysHTML: kind === 'keys' ? keysToHTML(keysMd) : cmdHTML(keysMd),
        mainHTML: rich(mainMd, meta.id),
        useHTML: useMd ? rich(useMd, meta.id) : '',
        extras: extras.map((x) => ({ label: x.label, html: rich(x.md, meta.id) })),
        tags, keysPlain, mainPlain,
        combo: kind === 'keys' ? parseCombo(keysMd) : null,
        keyToks: norm(keysPlain).split(/[\s+,…/]+/).filter(Boolean),
        keysN: norm(keysPlain), mainN: norm(mainPlain), useN: norm(usePlain),
        searchN: norm([keysPlain, mainPlain, usePlain, ...extras.map((x) => plain(x.md)), ...tags, h2, h3, meta.title].join(' ')),
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
      if (tok.length > 5 && /(ar|er|ir)$/.test(tok)) alts.add(tok.slice(0, -2)); // copiar → copi
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
          else if (e.useN.includes(a)) best = Math.max(best, 1.5);
          else if (e.searchN.includes(a)) best = Math.max(best, 1);
        }
      }
      if (!best) return 0;
      score += best;
    }
    if (keyHits.size) score += keyHits.size === new Set(e.keyToks).size ? 3 : -0.4 * (e.keyToks.length - keyHits.size);
    score += e.level === 'basico' ? 0.6 : e.level === 'intermedio' ? 0.3 : 0;
    return score + (e.product !== 'extras' ? 0.3 : 0);
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
  function highlight(root, query) {
    const words = [...new Set(query.flat())].filter((w) => [...w].length >= 3);
    if (!words.length) return;
    const fold = { a: '[aáàä]', e: '[eéèë]', i: '[iíìï]', o: '[oóòö]', u: '[uúùü]', n: '[nñ]' };
    const pattern = words.sort((a, b) => b.length - a.length)
      .map((w) => [...w].map((ch) => fold[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')).join('|');
    const re = new RegExp(`(${pattern})`, 'gi');
    for (const el of $$('.row-main, .row-use', root)) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        re.lastIndex = 0;
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
  const levelOk = (e) => state.level === 'all' || !e.level || e.level === state.level;

  function favButton(id) {
    const on = state.favs.has(id);
    const label = on ? 'Quitar de favoritos' : 'Guardar en favoritos';
    return `<button class="mini-btn fav-btn" data-fav="${esc(id)}" aria-pressed="${on}" aria-label="${label}" title="${label}">${ICONS.starOff}${ICONS.starOn}</button>`;
  }
  const levelBadge = (lv) => (lv ? `<span class="lvl lvl-${lv}">${LEVEL.get(lv).label}</span>` : '');

  function rowHTML(e, opts = {}) {
    const meta = META.get(e.page);
    const tags = e.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    const extras = e.extras.map((x) => `<div class="row-extra">${x.html}</div>`).join('');
    const where = [meta.title, e.h2, e.h3].filter(Boolean).join(' › ');
    const src = opts.showSource ? `<a class="row-src" href="#/p/${e.page}">${esc(where)}</a>` : '';
    const kb = e.combo ? `<button class="mini-btn kb-btn" data-kb="${esc(e.id)}" aria-label="Ver en el teclado cómo se pulsa" title="Ver en el teclado">${ICONS.keyboard}</button>` : '';
    return `<div class="row">
      <div class="row-keys"><div class="keys">${e.keysHTML}</div>${levelBadge(e.level)}</div>
      <div class="row-body">
        <div class="row-main">${tags}${e.mainHTML}</div>
        ${e.useHTML ? `<div class="row-use"><span class="use-icon" aria-hidden="true">💡</span><span>${e.useHTML}</span></div>` : ''}
        ${extras}${src}
      </div>
      <div class="row-actions">${kb}${favButton(e.id)}</div>
    </div>`;
  }
  const rowsHTML = (rows, opts) => `<div class="rows">${rows.map((e) => rowHTML(e, opts)).join('')}</div>`;

  function blockHTML(b) {
    switch (b.kind) {
      case 'heading':
        return `<h${b.depth} class="sec-h" id="${b.id}">${b.icon ? `<span class="h-icon" aria-hidden="true">${b.icon === '⊞' ? WIN_LOGO : b.icon}</span>` : ''}${esc(b.text)}</h${b.depth}>`;
      case 'rows': return rowsHTML(b.rows);
      case 'callout': {
        const c = CALLOUTS[b.type];
        return `<div class="callout ${c.cls}"><span class="callout-icon" aria-hidden="true">${c.icon}</span><div><div class="callout-title">${c.label}</div>${b.html}</div></div>`;
      }
      default: return `<div class="prose">${b.html}</div>`;
    }
  }

  // Aplica el filtro de nivel y quita secciones que se quedan vacías.
  function filteredBlocks(blocks) {
    if (state.level === 'all') return blocks;
    const out = [];
    const sections = [];
    let cur = { head: null, items: [] };
    for (const b of blocks) {
      if (b.kind === 'heading' && b.depth === 2) { sections.push(cur); cur = { head: b, items: [] }; }
      else cur.items.push(b);
    }
    sections.push(cur);
    for (const s of sections) {
      const items = [];
      let pendingH3 = null, hasRows = false, visible = 0;
      for (const b of s.items) {
        if (b.kind === 'heading') { pendingH3 = b; continue; }
        if (b.kind === 'rows') {
          hasRows = true;
          const rows = b.rows.filter(levelOk);
          if (!rows.length) { pendingH3 = null; continue; }
          visible += rows.length;
          if (pendingH3) { items.push(pendingH3); pendingH3 = null; }
          items.push({ kind: 'rows', rows });
          continue;
        }
        if (pendingH3) { items.push(pendingH3); pendingH3 = null; }
        items.push(b);
      }
      if (hasRows && !visible) continue;
      if (s.head) out.push(s.head);
      out.push(...items);
    }
    return out;
  }

  function levelFilterHTML(counts) {
    const opts = [['all', 'Todos'], ...LEVELS.map((l) => [l.id, l.label])];
    return `<div class="seg" role="radiogroup" aria-label="Filtrar por nivel">${opts.map(([id, label]) => {
      const n = counts ? (id === 'all' ? counts.all : counts[id] || 0) : null;
      return `<button role="radio" aria-checked="${state.level === id}" class="seg-btn${id !== 'all' ? ' seg-' + id : ''}" data-level="${id}">${label}${n != null ? `<span class="seg-n">${n}</span>` : ''}</button>`;
    }).join('')}</div>`;
  }
  function countLevels(entries) {
    const c = { all: entries.length };
    for (const e of entries) if (e.level) c[e.level] = (c[e.level] || 0) + 1;
    return c;
  }

  const pagesOf = (pid) => PAGES.filter((p) => p.product === pid && !p.hidden && state.pages.has(p.id));
  const countFor = (id) => (state.pages.get(id)?.entries.length || 0);
  const productEntries = (pid) => state.index.filter((e) => e.product === pid);

  function siteFooter() {
    return `<footer class="site-foot">
      <span>Pulsa <kbd>/</kbd> para buscar desde cualquier página.</span>
      <span>Licencia MIT · <a href="${REPO}" target="_blank" rel="noopener">Ver y mejorar en GitHub</a></span>
    </footer>`;
  }

  // ------------------------------------------------------------------------
  // Vistas
  // ------------------------------------------------------------------------
  const main = $('#main');
  const searchInput = $('#search');
  const setTitle = (t) => { document.title = t ? `${t} · ${SITE_NAME}` : `${SITE_NAME}: Windows 11, Visual Studio y VS Code`; };

  function renderNav() {
    const link = (href, icon, label, count, key) =>
      `<a class="nav-link" href="${href}" data-nav="${key}">${iconHTML(icon, 'nav-icon')}<span class="nav-label">${esc(label)}</span>${count ? `<span class="nav-count">${count}</span>` : ''}</a>`;
    let html = link('#/', '🏠', 'Inicio', 0, 'home');
    html += link('#/p/hotkeys/empieza-aqui', '🎓', 'Cómo usar los atajos', 0, 'p/hotkeys/empieza-aqui');
    html += link('#/practica', '🎯', 'Practicar', 0, 'practica');
    html += link('#/favoritos', '⭐', 'Mis favoritos', state.favs.size, 'favoritos');
    const groups = [
      { title: 'Windows 11', href: '#/w/windows', key: 'w/windows', products: ['windows'] },
      { title: 'Programación', products: ['vs', 'vscode'] },
      { title: 'Extras', href: '#/w/extras', key: 'w/extras', products: ['extras'] },
    ];
    for (const g of groups) {
      const pages = g.products.flatMap(pagesOf);
      if (!pages.length) continue;
      html += `<div class="nav-group">${g.href ? `<a class="nav-title" href="${g.href}" data-nav="${g.key}">${esc(g.title)}</a>` : `<span class="nav-title">${esc(g.title)}</span>`}`;
      html += pages.map((p) => link('#/p/' + p.id, p.icon, p.title, countFor(p.id), 'p/' + p.id)).join('');
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

  function productCards() {
    return `<div class="product-grid">${PRODUCTS.map((p) => {
      const n = productEntries(p.id).length;
      return `<a class="product-card product-${p.id}" href="#/w/${p.id}">
        ${iconHTML(p.icon, 'product-icon')}
        <span class="product-title">${esc(p.title)}</span>
        <span class="product-desc">${esc(p.desc)}</span>
        <span class="product-count">${n} atajos y comandos →</span>
      </a>`;
    }).join('')}</div>`;
  }

  function randomCard() {
    const pool = state.index.filter((e) => e.kind === 'keys' && e.product !== 'extras' && levelOk(e));
    const e = pool.length ? pick(pool) : null;
    if (!e) return '';
    const meta = META.get(e.page);
    return `<div class="feature" id="random-card">
      <h3>🎲 Atajo al azar</h3>
      <div class="feature-keys">${e.keysHTML}</div>
      <div class="feature-desc">${e.mainHTML}</div>
      ${e.useHTML ? `<div class="row-use"><span class="use-icon" aria-hidden="true">💡</span><span>${e.useHTML}</span></div>` : ''}
      <div class="feature-src">${iconHTML(meta.icon)} <a href="#/p/${e.page}">${esc(meta.title)}</a></div>
      <button class="btn" data-action="random">Otro atajo</button>
    </div>`;
  }

  function renderHome() {
    setTitle('');
    const summary = state.pages.get('hotkeys/README');
    let essentials = [], legend = '';
    if (summary) {
      const i = summary.blocks.findIndex((b) => b.kind === 'heading' && /imprescindibles/i.test(b.text));
      const rowsBlock = summary.blocks.slice(i + 1).find((b) => b.kind === 'rows');
      essentials = rowsBlock ? rowsBlock.rows : [];
      const j = summary.blocks.findIndex((b) => b.kind === 'heading' && /leyenda/i.test(b.text));
      if (j >= 0) legend = summary.blocks.slice(j + 1).filter((b) => b.kind !== 'heading').map(blockHTML).join('');
    }
    const total = state.index.filter((e) => e.kind === 'keys').length;
    main.innerHTML = `
      <section class="hero">
        <p class="eyebrow">Guía gratuita en español · Actualizada en noviembre de 2026</p>
        <h1>Trabaja más rápido con el teclado</h1>
        <p class="hero-sub">Más de ${Math.floor(total / 50) * 50} atajos de <b>Windows 11</b>, <b>Visual Studio 2026</b> y <b>VS Code</b>, explicados para que cualquiera pueda usarlos: qué hacen, cuándo usarlos y cómo se pulsan.</p>
        <div class="hero-search">
          <label for="hero-q" class="sr-only">¿Qué quieres hacer?</label>
          <input id="hero-q" type="search" autocomplete="off" placeholder="¿Qué quieres hacer? Ej.: copiar, captura, cerrar ventana…">
        </div>
        <div class="hero-chips"><span class="label">Ideas:</span>${SUGGESTIONS.map((s) => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>
      </section>

      <a class="start-banner" href="#/p/hotkeys/empieza-aqui">
        <span class="start-icon" aria-hidden="true">🎓</span>
        <span><b>¿Es tu primera vez con atajos?</b><br><span class="muted">Aprende en 5 minutos cómo se pulsan y dónde está cada tecla.</span></span>
        <span class="start-arrow" aria-hidden="true">→</span>
      </a>

      <h2 class="section-title">Elige qué quieres dominar</h2>
      ${productCards()}

      <h2 class="section-title">🏆 Los imprescindibles <a class="aside" href="#/practica">Ponte a prueba →</a></h2>
      <p class="muted section-sub">Si solo aprendes ${essentials.length} atajos, que sean estos. Pulsa ${ICONS.keyboard.replace('<svg', '<svg class="inline-ico"')} para ver en un teclado cómo se hace cada uno.</p>
      ${rowsHTML(essentials)}

      <h2 class="section-title">✨ Sigue aprendiendo</h2>
      <div class="feature-grid">
        ${randomCard()}
        <div class="feature">
          <h3>🎯 Modo práctica</h3>
          <p class="feature-desc muted">Te enseñamos lo que hace un atajo y tú intentas recordarlo. Empieza por el nivel Básico.</p>
          <a class="btn btn-primary" href="#/practica">Empezar a practicar</a>
        </div>
        <div class="feature">
          <h3>⭐ Tus favoritos</h3>
          <p class="feature-desc muted">Pulsa la estrella de cualquier atajo para guardarlo y tenerlo siempre a mano.</p>
          <a class="btn" href="#/favoritos">Ver favoritos${state.favs.size ? ` (${state.favs.size})` : ''}</a>
        </div>
      </div>

      ${legend ? `<details class="legend"><summary>🔤 ¿Cómo leer los atajos?</summary><div class="legend-body">${legend}</div></details>` : ''}
      ${siteFooter()}`;
  }

  function renderProduct(pid) {
    const pr = PRODUCT.get(pid);
    if (!pr) return renderNotFound();
    setTitle(pr.title);
    const pages = pagesOf(pid);
    const entries = productEntries(pid);
    const basics = entries.filter((e) => e.level === 'basico');
    const starters = [];
    for (const p of pages) starters.push(...basics.filter((e) => e.page === p.id).slice(0, pid === 'windows' ? 3 : 8));
    main.innerHTML = `
      <div class="crumbs"><a href="#/">Inicio</a> › ${esc(pr.title)}</div>
      <header class="page-head">
        ${iconHTML(pr.icon, 'page-icon')}
        <div><h1>${esc(pr.title)}</h1><p class="lead">${esc(pr.desc)} ${entries.length ? `${entries.length} atajos y comandos en ${plural(pages.length, 'sección', 'secciones')}.` : ''}</p></div>
      </header>
      <h2 class="section-title">Secciones</h2>
      <div class="cat-grid">${pages.map((p) => `
        <a class="cat-card" href="#/p/${p.id}">
          ${iconHTML(p.icon, 'cat-icon')}
          <span class="cat-title">${esc(p.title)}</span>
          <span class="cat-desc">${esc(p.desc || '')}</span>
          ${countFor(p.id) ? `<span class="cat-count">${countFor(p.id)} ${pid === 'extras' ? 'elementos' : 'atajos'}</span>` : '<span class="cat-count">Guía</span>'}
        </a>`).join('')}</div>
      ${starters.length ? `<h2 class="section-title">🟢 Empieza por estos</h2><p class="muted section-sub">Atajos de nivel básico: los que más vas a usar.</p>${rowsHTML(starters, { showSource: true })}` : ''}
      ${siteFooter()}`;
  }

  function renderPage(id) {
    const page = state.pages.get(id);
    if (!page || page.meta.hidden) return renderNotFound();
    const meta = page.meta;
    const pr = PRODUCT.get(meta.product);
    setTitle(meta.title);
    const blocks = filteredBlocks(page.blocks);
    const sections = blocks.filter((b) => b.kind === 'heading' && b.depth === 2);
    const hasLevels = page.entries.some((e) => e.level);
    const visibleCount = page.entries.filter(levelOk).length;
    const toc = sections.length > 1
      ? `<nav class="toc" aria-label="En esta página">${sections.map((s) => `<button class="chip" data-jump="${s.id}">${s.icon && s.icon !== '⊞' ? s.icon + ' ' : ''}${esc(s.text)}</button>`).join('')}</nav>`
      : '';
    const visible = PAGES.filter((p) => !p.hidden && state.pages.has(p.id));
    const idx = visible.findIndex((p) => p.id === id);
    const prev = visible[idx - 1], next = visible[idx + 1];

    main.innerHTML = `
      <div class="crumbs"><a href="#/">Inicio</a>${pr ? ` › <a href="#/w/${pr.id}">${esc(pr.title)}</a>` : ''}</div>
      <header class="page-head">
        ${iconHTML(meta.icon, 'page-icon')}
        <div><h1>${esc(page.title)}</h1>${page.lead ? `<p class="lead">${page.lead}</p>` : ''}</div>
      </header>
      ${hasLevels && !meta.noIndex ? `<div class="page-tools">${levelFilterHTML(countLevels(page.entries))}<span class="muted tools-info">${state.level === 'all' ? plural(page.entries.length, 'atajo', 'atajos') : `Mostrando ${visibleCount} de ${page.entries.length}`}</span></div>` : ''}
      ${toc}
      ${blocks.map(blockHTML).join('')}
      <a class="edit-link" href="${REPO}/edit/${BRANCH}/${meta.id}.md" target="_blank" rel="noopener">${ICONS.edit} ¿Falta algo o hay un error? Mejora esta página en GitHub</a>
      <nav class="page-foot" aria-label="Más secciones">
        ${prev ? `<a class="pager" href="#/p/${prev.id}"><small>← Anterior</small><span>${iconHTML(prev.icon)} ${esc(prev.title)}</span></a>` : '<span></span>'}
        ${next ? `<a class="pager next" href="#/p/${next.id}"><small>Siguiente →</small><span>${iconHTML(next.icon)} ${esc(next.title)}</span></a>` : ''}
      </nav>
      ${siteFooter()}`;
  }

  function renderSearch(q) {
    setTitle(`Buscar “${q}”`);
    const { query, results: all } = search(q);
    const byLevel = all.filter(levelOk);
    const results = byLevel.filter((e) => state.searchProduct === 'all' || e.product === state.searchProduct);
    const productChips = [['all', 'Todo', byLevel.length], ...PRODUCTS.map((p) => [p.id, p.title, byLevel.filter((e) => e.product === p.id).length])]
      .filter(([id, , n]) => id === 'all' || n > 0)
      .map(([id, label, n]) => `<button class="chip${state.searchProduct === id ? ' chip-on' : ''}" data-sp="${id}" aria-pressed="${state.searchProduct === id}">${esc(label)} <span class="seg-n">${n}</span></button>`).join('');
    const tools = `<div class="search-tools"><div class="hero-chips">${productChips}</div>${levelFilterHTML(countLevels(all))}</div>`;

    if (!results.length) {
      main.innerHTML = `
        <div class="result-head"><h1>Resultados para “${esc(q)}”</h1></div>
        ${all.length ? tools : ''}
        <div class="empty">
          <div class="big" aria-hidden="true">🔎</div>
          <h2>${all.length ? 'No hay resultados con estos filtros' : 'No encontramos nada'}</h2>
          <p class="muted">${all.length ? 'Prueba con <b>Todos</b> los niveles o con <b>Todo</b>.' : 'Prueba a escribir lo que quieres <em>hacer</em> (por ejemplo, "cerrar ventana") o el nombre de una tecla: <kbd>Win</kbd>, <kbd>Ctrl</kbd>, <kbd>F2</kbd>…'}</p>
          <div class="hero-chips center">${SUGGESTIONS.map((s) => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div>
        </div>`;
      return;
    }
    const LIMIT = 150;
    const shown = results.slice(0, LIMIT);
    const groups = new Map();
    for (const e of shown) {
      if (!groups.has(e.page)) groups.set(e.page, []);
      groups.get(e.page).push(e);
    }
    main.innerHTML = `
      <div class="result-head"><h1>Resultados para “${esc(q)}”</h1><span class="muted">${plural(results.length, 'atajo', 'atajos')}</span></div>
      ${tools}
      ${[...groups].map(([pid, rows]) => {
        const m = META.get(pid);
        const pr = PRODUCT.get(m.product);
        return `<h2 class="result-group">${iconHTML(m.icon)}<a href="#/p/${pid}">${pr && pr.id !== 'windows' && pr.title !== m.title ? esc(pr.title) + ' › ' : pr && pr.id === 'windows' ? 'Windows 11 › ' : ''}${esc(m.title)}</a> <span class="muted">· ${rows.length}</span></h2>${rowsHTML(rows)}`;
      }).join('')}
      ${results.length > LIMIT ? `<p class="muted">Se muestran los ${LIMIT} más relevantes. Añade más palabras para afinar.</p>` : ''}`;
    highlight(main, query);
  }

  function renderFavorites() {
    setTitle('Mis favoritos');
    const rows = [...state.favs].map((id) => state.entries.get(id)).filter(Boolean);
    main.innerHTML = rows.length
      ? `<div class="result-head"><h1>⭐ Mis favoritos</h1><span class="muted">${plural(rows.length, 'guardado', 'guardados')} en este navegador</span></div>
         <p class="muted section-sub">Practica solo tus favoritos en <a href="#/practica">Practicar</a> eligiendo "Mis favoritos".</p>
         ${rowsHTML(rows, { showSource: true })}${siteFooter()}`
      : `<div class="empty"><div class="big" aria-hidden="true">⭐</div><h2>Todavía no tienes favoritos</h2>
         <p class="muted">Pulsa la estrella que aparece junto a cualquier atajo para guardarlo aquí.</p>
         <p><a class="btn btn-primary" href="#/">Explorar atajos</a></p></div>`;
  }

  // ---- Práctica ----
  const practice = { product: store.get('practice-product', 'all'), level: store.get('practice-level', 'basico'), current: null, known: 0, total: 0, revealed: false };
  function practicePool() {
    return state.index.filter((e) => e.kind === 'keys' && e.product !== 'extras' && !e.mainHTML.includes('<kbd') &&
      (practice.product === 'all' ? true : practice.product === 'favs' ? state.favs.has(e.id) : e.product === practice.product) &&
      (practice.level === 'all' || e.level === practice.level));
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
    const pool = practicePool();
    if (!practice.current || !pool.includes(practice.current)) nextQuestion();
    const e = practice.current;
    const sel = (id, value, options) => `<select id="${id}">${options.map(([v, l]) => `<option value="${esc(v)}"${v === value ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    const meta = e ? META.get(e.page) : null;
    main.innerHTML = `
      <div class="result-head"><h1>🎯 Practicar</h1></div>
      <p class="muted">Lee lo que hace el atajo e intenta recordarlo (¡o pruébalo en tu PC!). Después, compruébalo.</p>
      <div class="practice-bar">
        <label>Qué: ${sel('practice-product', practice.product, [['all', 'Todo'], ...PRODUCTS.filter((p) => p.id !== 'extras').map((p) => [p.id, p.title]), ['favs', '⭐ Mis favoritos']])}</label>
        <label>Nivel: ${sel('practice-level', practice.level, [['all', 'Todos'], ...LEVELS.map((l) => [l.id, l.label])])}</label>
        <span class="score" aria-live="polite">${practice.total ? `Lo sabías: <b>${practice.known}</b> de ${practice.total}` : `${plural(pool.length, 'atajo', 'atajos')} para practicar`}</span>
      </div>
      ${e ? `<div class="practice-card">
        <div class="practice-src">${iconHTML(meta.icon)} ${esc(meta.title)}${e.h2 ? ' › ' + esc(e.h2) : ''} ${levelBadge(e.level)}</div>
        <div class="practice-q">${e.mainHTML}</div>
        ${e.useHTML ? `<div class="row-use"><span class="use-icon" aria-hidden="true">💡</span><span>${e.useHTML}</span></div>` : ''}
        ${practice.revealed
          ? `<div class="practice-a">${e.keysHTML}</div>
             ${e.combo ? `<div class="practice-instr">${e.combo.steps.map((st, i) => `${e.combo.steps.length > 1 ? `<b>Paso ${i + 1}:</b> ` : ''}${instruction(st[0].keys)}`).join('<br>')}</div>` : ''}
             <div class="practice-actions">
               <button class="btn btn-primary" data-action="knew">✓ Lo sabía</button>
               <button class="btn" data-action="didnt">✗ No lo sabía</button>
               ${e.combo ? `<button class="btn" data-kb="${esc(e.id)}">${ICONS.keyboard} Ver en el teclado</button>` : ''}
               ${favButton(e.id)}
             </div>`
          : `<div class="practice-actions">
               <button class="btn btn-primary" data-action="reveal">Mostrar atajo</button>
               <button class="btn" data-action="skip">Saltar</button>
             </div>`}
      </div>` : `<div class="empty"><h2>No hay atajos con estos filtros</h2><p class="muted">Elige otra opción o guarda algunos favoritos.</p></div>`}`;
    const focusBtn = $(practice.revealed ? '[data-action="knew"]' : '[data-action="reveal"]', main);
    if (focusBtn) focusBtn.focus({ preventScroll: true });
  }

  function renderNotFound() {
    setTitle('No encontrado');
    main.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">🧭</div><h2>Esta página no existe</h2><p><a class="btn btn-primary" href="#/">Volver al inicio</a></p></div>`;
  }

  // ---- Teclado visual (diálogo) ----
  const dialog = $('#kb-dialog');
  let dialogEntry = null, dialogTab = 0;
  function openKeyboard(id) {
    const e = state.entries.get(id);
    if (!e || !e.combo) return;
    dialogEntry = e;
    dialogTab = 0;
    renderKeyboard();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function renderKeyboard() {
    const e = dialogEntry;
    const { steps, mouse, extra } = e.combo;
    const tabs = steps.length > 1
      ? steps.map((st, i) => ({ label: `Paso ${i + 1}`, keys: st[0].keys }))
      : steps[0].map((a) => ({ label: comboHTML(a.keys), keys: a.keys }));
    const tab = tabs[Math.min(dialogTab, tabs.length - 1)];
    const board = keyboardHTML(tab.keys);
    const instr = steps.map((st, i) => {
      const alts = st.slice(1).map((a) => comboHTML(a.keys));
      return `<li>${steps.length > 1 ? `<b>Paso ${i + 1}:</b> ` : ''}${instruction(st[0].keys)}${alts.length ? `<div class="muted small">También: ${alts.join(' · ')}</div>` : ''}</li>`;
    }).join('');
    const notes = [
      ...(steps.length > 1 ? ['Es un atajo en dos pasos: haz el primero, suelta, y luego el segundo.'] : []),
      ...(mouse ? [`Además se usa el ratón: <b>${esc(mouse)}</b>.`] : []),
      ...extra.filter((x) => !/clic|arrastr|rueda/i.test(x)).map((x) => `Detalle: <b>${esc(x)}</b>.`),
      ...board.notes.map((n) => `En un teclado español, ${esc(n)}. La tecla real puede variar: compruébalo en el menú de la app.`),
      ...(board.unknown.length ? [`Algunas teclas (${board.unknown.map((u) => kbd(esc(u))).join(' ')}) no aparecen en el dibujo, por ejemplo las del teclado numérico.`] : []),
    ];
    $('#kb-body').innerHTML = `
      <div class="kb-head">
        <div>
          <div class="kb-title">${e.mainHTML}</div>
          <div class="kb-keys">${e.keysHTML}</div>
        </div>
        <button class="icon-btn" data-action="close-kb" aria-label="Cerrar">${ICONS.close}</button>
      </div>
      <ol class="kb-instr">${instr}</ol>
      ${tabs.length > 1 ? `<div class="kb-tabs" role="tablist">${tabs.map((t, i) => `<button role="tab" class="chip${i === dialogTab ? ' chip-on' : ''}" aria-selected="${i === dialogTab}" data-kbtab="${i}">${t.label}</button>`).join('')}</div>` : ''}
      <div class="kb-wrap">${board.html}</div>
      <div class="kb-legend"><span><i class="sw sw-hold"></i>Mantener pulsada</span><span><i class="sw sw-press"></i>Pulsar</span></div>
      ${notes.length ? `<ul class="kb-notes">${notes.map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
      ${e.useHTML ? `<div class="row-use"><span class="use-icon" aria-hidden="true">💡</span><span>${e.useHTML}</span></div>` : ''}`;
  }
  dialog.addEventListener('click', (ev) => { if (ev.target === dialog) dialog.close(); });

  // ------------------------------------------------------------------------
  // Enrutado
  // ------------------------------------------------------------------------
  const isSearchHash = (h) => h.startsWith('#/buscar');
  const queryFromHash = (h) => { const m = h.match(/[?&]q=([^&]*)/); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; };

  function route(force) {
    const h = location.hash || '#/';
    if (!force && h === state.lastHash) return;
    state.lastHash = h;
    closeNav();
    if (isSearchHash(h)) {
      const q = queryFromHash(h);
      if (searchInput.value.trim() !== q) searchInput.value = q;
      if (q) renderSearch(q); else renderHome();
    } else {
      state.prevHash = h;
      state.searchProduct = 'all';
      if (searchInput.value) searchInput.value = '';
      const path = h.replace(/^#\/?/, '');
      if (path.startsWith('p/')) renderPage(decodeURIComponent(path.slice(2)));
      else if (path.startsWith('w/')) renderProduct(path.slice(2));
      else if (path === 'favoritos') renderFavorites();
      else if (path === 'practica') renderPractice();
      else if (path === '' || path === '/') renderHome();
      else renderNotFound();
      window.scrollTo(0, 0);
    }
    markNav();
    afterRender();
  }
  function rerender() {
    const y = window.scrollY;
    state.lastHash = null;
    const h = location.hash || '#/';
    if (isSearchHash(h)) { renderSearch(queryFromHash(h)); markNav(); afterRender(); }
    else { route(true); window.scrollTo(0, y); }
  }

  function afterRender() {
    for (const a of $$('a[href^="http"]', main)) if (!a.target) { a.target = '_blank'; a.rel = 'noopener'; }
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
    const heroQ = $('#hero-q', main);
    if (heroQ) heroQ.addEventListener('input', () => { searchInput.value = heroQ.value; onSearchInput(); searchInput.focus(); });
  }

  function onSearchInput() {
    const q = searchInput.value.trim();
    const url = '#/buscar?q=' + encodeURIComponent(q);
    if (q) {
      if (isSearchHash(location.hash)) history.replaceState(null, '', url);
      else { history.pushState(null, '', url); window.scrollTo(0, 0); }
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
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
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
      const label = on ? 'Quitar de favoritos' : 'Guardar en favoritos';
      b.setAttribute('aria-label', label);
      b.title = label;
    }
    toast(on ? '⭐ Guardado en favoritos' : 'Quitado de favoritos');
    renderNav();
    if (location.hash === '#/favoritos' && !on) renderFavorites();
  }

  document.addEventListener('click', (ev) => {
    const t = ev.target;
    const fav = t.closest('[data-fav]');
    if (fav) { toggleFav(fav.dataset.fav); return; }
    const kb = t.closest('[data-kb]');
    if (kb) { openKeyboard(kb.dataset.kb); return; }
    const kbtab = t.closest('[data-kbtab]');
    if (kbtab) { dialogTab = +kbtab.dataset.kbtab; renderKeyboard(); return; }
    const copy = t.closest('[data-copy]');
    if (copy) { copyText(copy.dataset.copy); return; }
    const q = t.closest('[data-q]');
    if (q) { searchInput.value = q.dataset.q; onSearchInput(); return; }
    const lv = t.closest('[data-level]');
    if (lv) { state.level = lv.dataset.level; store.set('level', state.level); rerender(); return; }
    const sp = t.closest('[data-sp]');
    if (sp) { state.searchProduct = sp.dataset.sp; rerender(); return; }
    const jump = t.closest('[data-jump]');
    if (jump) { const el = document.getElementById(jump.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const action = t.closest('[data-action]');
    if (!action) return;
    const a = action.dataset.action;
    if (a === 'close-kb') dialog.close();
    else if (a === 'random') { const card = $('#random-card'); if (card) { card.outerHTML = randomCard(); const b = $('#random-card [data-action="random"]'); if (b) b.focus(); } }
    else if (a === 'reveal') { practice.revealed = true; renderPractice(); }
    else if (a === 'knew' || a === 'didnt') { practice.total++; if (a === 'knew') practice.known++; nextQuestion(); renderPractice(); }
    else if (a === 'skip') { nextQuestion(); renderPractice(); }
    else if (a === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('change', (ev) => {
    if (ev.target.id === 'practice-product') { practice.product = ev.target.value; store.set('practice-product', practice.product); practice.current = null; renderPractice(); }
    if (ev.target.id === 'practice-level') { practice.level = ev.target.value; store.set('practice-level', practice.level); practice.current = null; renderPractice(); }
  });

  document.addEventListener('keydown', (ev) => {
    const el = document.activeElement;
    const typing = el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
    if (dialog.open) return;
    if ((ev.key === '/' && !typing) || ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k')) {
      ev.preventDefault();
      searchInput.focus();
      searchInput.select();
    } else if (ev.key === 'Escape') {
      if (document.body.classList.contains('nav-open')) { closeNav(); return; }
      if (el === searchInput) { if (searchInput.value) { searchInput.value = ''; onSearchInput(); } else searchInput.blur(); }
    }
  });

  searchInput.addEventListener('input', onSearchInput);
  searchInput.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { ev.preventDefault(); searchInput.blur(); const first = $('.row', main); if (first) first.scrollIntoView({ block: 'center' }); }
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

  const topBtn = $('#top-btn');
  window.addEventListener('scroll', () => { topBtn.classList.toggle('show', window.scrollY > 900); }, { passive: true });

  const narrow = window.matchMedia('(max-width: 640px)');
  const setPlaceholder = () => { searchInput.placeholder = narrow.matches ? 'Buscar atajos…' : '¿Qué quieres hacer? Ej.: copiar, captura, Win + V'; };
  setPlaceholder();
  if (narrow.addEventListener) narrow.addEventListener('change', setPlaceholder);

  window.addEventListener('hashchange', () => route());
  window.addEventListener('popstate', () => route());

  // ------------------------------------------------------------------------
  // Arranque
  // ------------------------------------------------------------------------
  async function load() {
    if (typeof marked === 'undefined') { main.innerHTML = '<div class="empty"><h2>No se pudo cargar la web</h2></div>'; return; }
    const results = await Promise.allSettled(PAGES.map((p) =>
      fetch(encodeURI(p.id + '.md'), { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error(`${p.id}.md → HTTP ${r.status}`); return r.text(); })));
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        try { processPage(PAGES[i], r.value); } catch (err) { console.error('Error procesando', PAGES[i].id, err); }
      } else console.warn('No se pudo cargar', PAGES[i].id, r.reason);
    });
    if (!state.pages.size) {
      main.innerHTML = `<div class="empty"><div class="big" aria-hidden="true">⚠️</div><h2>No se pudo cargar la guía</h2>
        <p class="muted">Si la abres en local, usa un servidor web (por ejemplo, <code>python -m http.server</code>).</p>
        <p><a class="btn" href="${REPO}">Leer la guía en GitHub</a></p></div>`;
      return;
    }
    const before = state.favs.size;
    for (const id of [...state.favs]) if (!state.entries.has(id)) state.favs.delete(id);
    if (state.favs.size !== before) store.set('favs', [...state.favs]);
    renderNav();
    route(true);
  }
  load();
})();
