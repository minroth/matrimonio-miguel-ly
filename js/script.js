/* ==========================================================
   Lógica de la web. Los textos viven en js/config.js
   ========================================================== */
(function () {
  'use strict';

  const C = window.BODA;
  if (!C) { console.error('No se encontró js/config.js'); return; }

  /* ---------- Utilidades ---------- */
  const $  = (s, r = document) => r.querySelector(s);   const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = n => String(n).padStart(2, '0');

  // Crea elementos sin usar innerHTML (así el texto siempre es seguro)
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  async function copy(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = h('textarea', { style: 'position:fixed;opacity:0' });
      ta.value = text; document.body.append(ta); ta.select();
      try { document.execCommand('copy'); } catch (__) { /* nada */ }
      ta.remove();
    }
    toast(msg || 'Copiado');
  }

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) { /* nada */ } }
  };

  /* ---------- Fecha ----------
     Se lee directamente del texto ISO para que todos vean la hora local del evento,
     sin importar en qué país estén. */
  const DOW = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
  const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const DOW_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MES_LARGO = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const mt = C.fecha.iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  const [Y, Mo, D, H, Mi] = mt.slice(1).map(Number);
  const dow = new Date(Date.UTC(Y, Mo - 1, D)).getUTCDay();
  const hora12 = `${pad(H % 12 || 12)}:${pad(Mi)}`;
  const ampm = H >= 12 ? 'PM' : 'AM';
  const fechaLarga = `${DOW_LARGO[dow]} ${D} de ${MES_LARGO[Mo - 1]} de ${Y}`;
  const inicio = new Date(C.fecha.iso);
  const fin = new Date(inicio.getTime() + (C.fecha.duracionHoras || 5) * 3600e3);
  const nombres = `${C.novios[0]} & ${C.novios[1]}`;

  /* ---------- Portada ---------- */
  document.title = `${nombres} · ${D} de ${MES_LARGO[Mo - 1]} de ${Y}`;
  $('#n1').textContent = C.novios[0];
  $('#n2').textContent = C.novios[1];
  $('#mensaje').textContent = C.mensaje;

  $('#datebox').append(
    h('span', { class: 'dow', text: DOW[dow] }),
    h('span', { class: 'mid' },
      h('span', { class: 'm', text: MES[Mo - 1] }),
      h('span', { class: 'd', text: pad(D) }),
      h('span', { class: 'y', text: Y })),
    h('span', { class: 'hour' }, hora12, h('br'), ampm)
  );

  ['', '2'].forEach(s => {
    $('#lugarNombre' + s).textContent = C.lugar.nombre;
    $('#lugarDir' + s).textContent = C.lugar.direccion;
  });

  /* ---------- Lugar y mapas ---------- */
  const q = encodeURIComponent(C.lugar.busqueda);
  const urlMapa = `https://www.google.com/maps/search/?api=1&query=${q}`;
  $('#btnMapa').href = urlMapa;
  $('#btnMapa2').href = urlMapa;
  $('#btnWaze').href = `https://waze.com/ul?q=${q}&navigate=yes`;
  $('#mapa').src = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
  if (C.lugar.indicaciones) {
    const n = $('#lugarIndic'); n.textContent = C.lugar.indicaciones; n.hidden = false;
  }

  /* ---------- Calendario ---------- */
  const utc = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const descripcion = `${nombres} te invitan a celebrar su matrimonio. ${C.lugar.nombre}, ${C.lugar.direccion}`;

  $('#btnGoogleCal').href =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent('Matrimonio ' + nombres)}` +
    `&dates=${utc(inicio)}/${utc(fin)}` +
    `&location=${encodeURIComponent(C.lugar.nombre + ', ' + C.lugar.direccion)}` +
    `&details=${encodeURIComponent(descripcion)}`;

  $('#btnIcs').addEventListener('click', () => {
    const esc = s => s.replace(/[\\;,]/g, m => '\\' + m).replace(/\n/g, '\\n');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Matrimonio ' + nombres + '//ES',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      `UID:${utc(inicio)}@matrimonio`, `DTSTAMP:${utc(new Date())}`,
      `DTSTART:${utc(inicio)}`, `DTEND:${utc(fin)}`,
      'SUMMARY:' + esc('Matrimonio ' + nombres),
      'LOCATION:' + esc(C.lugar.nombre + ', ' + C.lugar.direccion),
      'DESCRIPTION:' + esc(descripcion),
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const a = h('a', { href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), download: 'matrimonio.ics' });
    document.body.append(a); a.click(); a.remove();
    toast('Evento descargado');
  });

  /* ---------- Cuenta regresiva ---------- */
  (function countdown() {
    const box = $('#countdown');
    const units = [['d', 'días'], ['h', 'horas'], ['m', 'min'], ['s', 'seg']];
    const nums = {};
    units.forEach(([k, label]) => {
      nums[k] = h('span', { class: 'cd-num', text: '00' });
      box.append(h('div', { class: 'cd-cell' }, nums[k], h('span', { class: 'cd-lbl', text: label })));
    });
    let id;
    function tick() {
      const diff = inicio - Date.now();
      if (diff <= 0) {
        box.replaceChildren(h('p', { class: 'cd-done', text: -diff < 12 * 3600e3 ? '¡Hoy es el día!' : '¡Gracias por acompañarnos!' }));
        clearInterval(id); return;
      }
      const s = Math.floor(diff / 1000);
      nums.d.textContent = Math.floor(s / 86400);
      nums.h.textContent = pad(Math.floor(s % 86400 / 3600));
      nums.m.textContent = pad(Math.floor(s % 3600 / 60));
      nums.s.textContent = pad(s % 60);
    }
    tick(); id = setInterval(tick, 1000);
  })();

  /* ---------- Dress code ---------- */
  (function dress() {
    const d = C.dressCode;
    $('#dcTitulo').textContent = d.titulo;
    $('#dcTexto').append(...d.parrafos.map(t => h('p', { text: t })));
    $('#dcCierre').textContent = d.cierre;
    const name = $('#paletteName');
    const pal = $('#palette');
    if (!d.paleta || !d.paleta.length) { pal.remove(); name.remove(); return; }
    d.paleta.forEach(c => {
      const b = h('button', {
        class: 'swatch', type: 'button', role: 'listitem',
        'aria-label': c.nombre, 'aria-pressed': 'false', title: c.nombre,
        style: `background:${c.color}`
      });
      b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') === 'true';
        $$('.swatch', pal).forEach(x => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', String(!on));
        name.textContent = on ? '\u00a0' : c.nombre;
      });
      pal.append(b);
    });
  })();

  /* ---------- Regalo y votación ---------- */
  (function regalo() {
    const g = C.regalo;
    $('#rgTitulo').textContent = g.titulo;
    $('#rgIntro').append(...g.intro.map(t => h('p', { text: t })));

    // Datos bancarios
    const b = g.banco;
    const rows = [
      ['Titular', b.titular], ['Banco', b.banco], ['Tipo', b.tipo],
      ['N°', b.numero, 'Número copiado'], ['RUT', b.rut, 'RUT copiado'], ['Correo', b.correo, 'Correo copiado']
    ].filter(r => r[1]);
    const box = $('#bank');
    rows.forEach(([k, val, msg]) => {
      box.append(h('div', { class: 'bank-row' },
        h('span', { class: 'k', text: k }),
        msg
          ? h('button', { class: 'v', type: 'button', title: 'Toca para copiar', text: val, onclick: () => copy(val, msg) })
          : h('span', { class: 'v', text: val })));
    });
    const todo = rows.map(r => `${r[0]}: ${r[1]}`).join('\n');
    box.append(h('div', { class: 'btn-row' },
      h('button', { class: 'btn', type: 'button', text: 'Copiar todos los datos', onclick: () => copy(todo, 'Datos copiados') })));
  })();

  /* ---------- Transporte ---------- */
  (function transporte() {
    const t = C.transporte;
    const sec = $('#transporte');
    if (!t || !t.activo) { sec.remove(); return; }

    $('#trTitulo').textContent = t.titulo;
    $('#trIntro').append(...(t.intro || []).map(p => h('p', { text: p })));

    // Botón al formulario de Google
    if (t.formulario && t.formulario.activo && t.formulario.url) {
      $('#trForm').hidden = false;
      $('#trFormTexto').textContent = t.formulario.texto;
      const a = $('#trFormBtn');
      a.href = t.formulario.url;
      a.textContent = t.formulario.boton || 'Completar formulario';
    }

    const priv = t.privado;
    if (!priv || !priv.activo || !priv.cifrado) { $('#trPrivado').remove(); $('#trDivider').remove(); return; }
    if (!('crypto' in window) || !window.crypto.subtle) {
      $('#trPrivado').replaceChildren(h('p', { class: 'note', text: 'Esta parte necesita ver la página por https:// o en un servidor local para funcionar.' }));
      return;
    }

    $('#trPrivTitulo').textContent = priv.titulo;
    $('#trPrivTexto').textContent = priv.texto;
    $('#trClaveLabel').textContent = priv.placeholder;
    $('#trClave').placeholder = priv.placeholder;
    $('#trVer').textContent = priv.boton || 'Ver';
    $('#trBuscar').placeholder = priv.buscarPlaceholder || 'Buscar…';

    function b64ToBuf(b64) {
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return arr.buffer;
    }

    async function descifrar(password) {
      const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: b64ToBuf(priv.cifrado.salt), iterations: 150000, hash: 'SHA-256' },
        baseKey, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
      );
      const plano = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64ToBuf(priv.cifrado.iv) }, key, b64ToBuf(priv.cifrado.data));
      return JSON.parse(new TextDecoder().decode(plano));
    }

    function pintarTablas(pasajeros) {
      const cont = $('#trTablas');
      cont.replaceChildren();
      const grupos = new Map();
      pasajeros.forEach(p => {
        const k = p.vehiculo || 'Sin asignar';
        if (!grupos.has(k)) grupos.set(k, []);
        grupos.get(k).push(p);
      });
      grupos.forEach((lista, nombreVeh) => {
        const salidas = [...new Set(lista.map(p => p.saleDesde).filter(Boolean))].join(' · ');
        const grp = h('div', { class: 'veh-group', 'data-veh': '1' },
          h('h4', { class: 'sub', style: 'margin-top:2.2rem' }, nombreVeh + (salidas ? ' — sale desde ' + salidas : '')),
          h('ul', { class: 'veh-list' }, lista.map(p => h('li', { class: 'veh-row', 'data-name': p.nombre.toLowerCase() },
            h('span', { class: 'vn', text: p.nombre }),
            p.nota ? h('span', { class: 'vx', text: p.nota }) : null))));
        cont.append(grp);
      });
    }

    $('#trForm2').addEventListener('submit', async e => {
      e.preventDefault();
      const err = $('#trError');
      err.hidden = true;
      const pass = $('#trClave').value;
      if (!pass) return;
      try {
        const pasajeros = await descifrar(pass);
        pintarTablas(pasajeros);
        $('#trResultado').hidden = false;
        $('#trForm2').hidden = true;
        $('#trBuscar').focus();
      } catch (_) {
        err.textContent = priv.error;
        err.hidden = false;
      }
    });

    $('#trBuscar').addEventListener('input', e => {       const q = e.target.value.trim().toLowerCase();       $$('.veh-row', $('#trTablas')).forEach(row => { row.hidden = q && !row.dataset.name.includes(q); });       $$('.veh-group', $('#trTablas')).forEach(g => { g.hidden = $$('.veh-row', g).every(r => r.hidden); });
    });
  })();

  // NOTA: La sección de confirmación de asistencia (rsvp) fue eliminada por completo.

  /* ---------- Secciones extra ---------- */
  (function extras() {
    const cont = $('#extras');
    const last = {};   // último bloque insertado tras cada sección, para respetar el orden

    const builders = {
      texto: x => {
        const frag = document.createDocumentFragment();
        x.parrafos.forEach(t => frag.append(h('p', { text: t })));
        
        // Renderizar código QR centrado
        if (x.qr) {
          frag.append(h('div', { style: 'margin: 1.5rem auto; text-align: center;' },
            h('img', { src: x.qr, alt: 'Código QR álbum de fotos', style: 'display: block; margin: 0 auto; max-width: 160px; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);' })
          ));
        }

        // Renderizar botón de enlace centrado
        if (x.enlace) {
          frag.append(h('div', { style: 'margin-top: 1.2rem; text-align: center;' },
            h('a', { class: 'btn primary', href: x.enlace.url, target: '_blank', rel: 'noopener', text: x.enlace.texto })
          ));
        }

        return frag;
      },

      cronograma: x => h('ol', { class: 'timeline' },
        x.items.map(i => h('li', {},
          h('span', { class: 't', text: i.hora }),
          h('div', {}, h('span', { class: 'e', text: i.titulo }), i.texto ? h('span', { class: 'x', text: i.texto }) : null)))),

      faq: x => h('div', { class: 'faq' },
        x.items.map(i => h('details', {}, h('summary', { text: i.p }), h('p', { text: i.r })))),

      galeria: x => {
        if (!x.fotos || !x.fotos.length) return null;
        const lb = $('#lightbox');
        return h('div', { class: 'gallery' }, x.fotos.map(f => h('button', {
          type: 'button', 'aria-label': 'Ampliar: ' + (f.alt || 'foto'),
          onclick: () => { $('img', lb).src = f.src; $('img', lb).alt = f.alt || ''; lb.showModal(); }
        }, h('img', { src: f.src, alt: f.alt || '', loading: 'lazy' }))));
      }
    };

    (C.extras || []).filter(x => x.activo).forEach(x => {
      const build = builders[x.tipo];
      if (!build) { console.warn('Tipo de sección desconocido:', x.tipo); return; }
      const body = build(x);
      if (!body) return;
      const sec = h('section', { class: 'sheet', id: x.id, 'data-nav': x.nav || x.titulo },
        h('div', { class: 'sheet-inner' },
          h('h2', { class: 'title', text: x.titulo }),
          h('div', { class: 'divider' }),
          body));
      const ref = x.despuesDe && document.getElementById(last[x.despuesDe] || x.despuesDe);
      if (ref) { ref.after(sec); last[x.despuesDe] = x.id; } else cont.append(sec);
    });

    // Lightbox
    const lb = $('#lightbox');
    $('.lb-close', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  })();

  /* ---------- Cierre ---------- */
  $('#cierre').textContent = C.cierre;
  $('#pie').textContent = `${nombres} · ${pad(D)}.${pad(Mo)}.${Y}`;

  /* ---------- Navegación ---------- */
  const sheets = $$('.sheet[data-nav]');
  const nav = $('#navLinks');   sheets.forEach(s => nav.append(h('a', { href: '#' + s.id, text: s.dataset.nav, 'data-for': s.id })));    if ('IntersectionObserver' in window) {     const links = $$('a', nav);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => {
          const on = a.dataset.for === en.target.id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          if (on && nav.scrollWidth > nav.clientWidth) {
            nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sheets.forEach(s => io.observe(s));
  }

  /* ---------- Ramas botánicas ---------- */
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function leaf(x, y, ang, sc, col) {
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(0)}) scale(${sc.toFixed(2)})">` +
      `<path d="M0 0C6 -9 18 -9 28 0C18 9 6 9 0 0Z" fill="${col}" fill-opacity=".88"/>` +
      `<path d="M2 0L25 0" stroke="#fff" stroke-opacity=".38" stroke-width=".8"/></g>`;
  }

  function flower(x, y, dir, k, r) {
    const tx = x + dir * 15 * k, ty = y - 13 * k;
    let s = `<path d="M${x.toFixed(1)} ${y.toFixed(1)}Q${(x + dir * 4 * k).toFixed(1)} ${(y - 9 * k).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}" stroke="#8d8f6a" stroke-width="1" fill="none"/>`;
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2 + r();
      s += `<circle cx="${(tx + Math.cos(a) * 3.6 * k).toFixed(1)}" cy="${(ty + Math.sin(a) * 3.6 * k).toFixed(1)}" r="${(2.6 * k).toFixed(1)}" fill="#e4d6ba" stroke="#b9a781" stroke-width=".5"/>`;
    }
    return s + `<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${(1.5 * k).toFixed(1)}" fill="#b5875a"/>`;
  }

  function sprigSVG(w, hh, seed) {
    const r = rng(seed);
    const cols = ['#7b8459', '#8a9268', '#a2a883', '#6a7550', '#c9bb9b', '#d8cbb0'];
    const k = w / 84;
    const X = y => w * 0.5 + Math.sin(y / 95 + seed) * w * 0.2;
    let d = `M${X(hh).toFixed(1)} ${hh}`;
    for (let y = hh - 8; y >= 8; y -= 8) d += `L${X(y).toFixed(1)} ${y}`;
    let s = `<path d="${d}" fill="none" stroke="#8d8f6a" stroke-width="1.4" stroke-linecap="round"/>`;
    let side = 1;
    for (let y = hh - 22; y > 34; y -= 26 + r() * 12) {
      const x = X(y);
      const ang = side > 0 ? -(30 + r() * 30) : -(150 - r() * 30);
      s += leaf(x, y, ang, (0.8 + r() * 0.65) * k, cols[Math.floor(r() * 4)]);
      if (r() < 0.55) s += leaf(x, y + 5, side > 0 ? -(155 - r() * 25) : -(25 + r() * 25), (0.5 + r() * 0.4) * k, cols[4 + Math.floor(r() * 2)]);
      if (r() < 0.22) s += flower(x, y - 4, -side, k, r);
      side *= -1;
    }
    const top = X(8);
    s += leaf(top, 12, -95, 0.9 * k, cols[0]) + leaf(top, 16, -135, 0.6 * k, cols[2]) + leaf(top, 16, -50, 0.6 * k, cols[1]);
    return `<svg width="${w}" height="${hh}" viewBox="0 0 ${w} ${hh}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
  }

  const lastH = new WeakMap();
  function drawSprigs(sheet, force) {
    const hh = Math.round(sheet.offsetHeight);
    const w = Math.round(Math.max(38, Math.min(84, window.innerWidth * 0.1)));
    const key = hh + 'x' + w;
    if (!force && lastH.get(sheet) === key) return;
    lastH.set(sheet, key);
    const idx = $$('.sheet').indexOf(sheet);
    $('.sprig', sheet).innerHTML = sprigSVG(w, hh, idx * 7 + 0);$('.sprig.right', sheet).innerHTML = sprigSVG(w, hh, idx * 7 + 3);
  }

  $$('.sheet').forEach(sh => {     sh.prepend(h('div', { class: 'sprig left', 'aria-hidden': 'true' }), h('div', { class: 'sprig right', 'aria-hidden': 'true' }));     drawSprigs(sh, true);   });    if ('ResizeObserver' in window) {     const ro = new ResizeObserver(es => es.forEach(e => drawSprigs(e.target)));     $$
('.sheet').forEach(sh => ro.observe(sh));
  } else {
    window.addEventListener('resize', () => $$('.sheet').forEach(sh => drawSprigs(sh)));   }    if (document.fonts && document.fonts.ready) {     document.fonts.ready.then(() => $$('.sheet').forEach(sh => drawSprigs(sh)));
  }
})();