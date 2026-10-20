  /* ---------------- global shell (G1-G7) ---------------- */
  const nav = $('#nav'), navInd = $('#navInd'), brand = $('.brand', nav), sheet = $('#sheet'), menuBtn = $('#menuBtn');
  const EOs = 'cubic-bezier(.23,1,.32,1)';

  /* G7.3 smooth scroll: Lenis drives the native scroll, ScrollTrigger listens to it */
  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.5 });
    if (hasGsap) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  }

  /* G1.1 entrance: slides down 300ms after load, then the sigil spark pops */
  if (reduce) nav.classList.remove('pre');
  else setTimeout(() => {
    const an = nav.animate([{ opacity: 0, translate: '0 -100%' }, { opacity: 1, translate: '0 0' }], { duration: 500, easing: EOs, fill: 'forwards' });
    nav.classList.remove('pre');
    an.onfinish = () => { an.cancel(); brand.classList.add('pop'); const sp = $('.sig-spark', brand).getBoundingClientRect(); fxBurst(sp.left + sp.width / 2, sp.top + sp.height / 2, 6, 18, 380); setTimeout(() => brand.classList.remove('pop'), 650); };
  }, 300);

  /* G1.3 active route indicator: one brush stroke that springs between links */
  const ix = spring(300, 17), iw = spring(300, 17); let indRun = false, indSeen = false;
  const indTick = () => { if (indRun) return; indRun = true; let last = performance.now();
    const f = (n) => { const dt = Math.min(.032, (n - last) / 1000); last = n; const a = ix.step(dt), b = iw.step(dt);
      navInd.style.transform = `translateX(${ix.x.toFixed(2)}px) scaleX(${(Math.max(0, iw.x) / 40).toFixed(4)})`;
      if (a || b) requestAnimationFrame(f); else indRun = false; }; requestAnimationFrame(f); };
  function moveInd() {
    const a = $('#navLinks > li > a[aria-current]');
    if (!a || !a.offsetWidth) { navInd.classList.remove('on'); indSeen = false; return; }
    navInd.style.top = (a.offsetTop + a.offsetHeight - 3) + 'px';
    ix.t = a.offsetLeft - 4; iw.t = a.offsetWidth + 8;
    if (!indSeen || reduce) { ix.x = ix.t; iw.x = iw.t; ix.v = iw.v = 0; indSeen = true; }
    navInd.classList.add('on'); indTick();
  }
  addEventListener('resize', () => { indSeen = false; moveInd(); }, { passive: true });

  /* G1.3 sigil hover: outer glyph ring turns 30deg on a spring, spark brightens */
  if (fine && !reduce) {
    const ring = $('.sig-ring', brand), sr = spring(220, 14); let srRun = false;
    const st = () => { if (srRun) return; srRun = true; let last = performance.now();
      const f = (n) => { const dt = Math.min(.032, (n - last) / 1000); last = n; const m = sr.step(dt); ring.style.transform = `rotate(${sr.x.toFixed(2)}deg)`; if (m) requestAnimationFrame(f); else srRun = false; }; requestAnimationFrame(f); };
    brand.addEventListener('pointerenter', () => { sr.t = 30; brand.classList.add('hot'); st(); });
    brand.addEventListener('pointerleave', () => { sr.t = 0; brand.classList.remove('hot'); st(); });
    magnet($('#navCta'), { radius: 40, max: 6, keep: true });
  }

  /* Case studies dropdown (desktop) + expandable list (phone menu) */
  const ddLi = $('.has-dd', nav), ddBtn = $('#ddBtn'), dd = $('#navCases'); let ddT = 0;
  const ddOpen = (on) => { clearTimeout(ddT); ddLi.classList.toggle('open', on); ddBtn.setAttribute('aria-expanded', String(on));
    if (on && !reduce) $$('a', dd).forEach((a, k) => a.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 260, delay: 40 + k * 30, easing: EOs, fill: 'backwards' })); };
  if (fine) { ddLi.addEventListener('pointerenter', () => ddOpen(true)); ddLi.addEventListener('pointerleave', () => { ddT = setTimeout(() => ddOpen(false), 140); }); }
  ddBtn.addEventListener('click', (e) => { if (!fine) { e.preventDefault(); ddOpen(!ddLi.classList.contains('open')); } else ddOpen(false); });
  ddBtn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); ddOpen(true); $('a', dd).focus(); } });
  dd.addEventListener('keydown', (e) => { const L = $$('a', dd), i = L.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); L[Math.min(L.length - 1, i + 1)].focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); i <= 0 ? ddBtn.focus() : L[i - 1].focus(); } if (e.key === 'Escape') { ddOpen(false); ddBtn.focus(); } });
  ddLi.addEventListener('focusout', (e) => { if (!ddLi.contains(e.relatedTarget)) ddOpen(false); });
  dd.addEventListener('click', (e) => { if (e.target.closest('a')) ddOpen(false); });
  const shBtn = $('#shCasesBtn'), shList = $('#sheetCases');
  shBtn.onclick = () => { const on = shBtn.getAttribute('aria-expanded') !== 'true'; shBtn.setAttribute('aria-expanded', String(on)); shBtn.parentElement.classList.toggle('open', on);
    if (on && !reduce) $$('a', shList).forEach((a, k) => a.animate([{ opacity: 0, transform: 'translateX(-14px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: k * 35, easing: EOs, fill: 'backwards' })); };
  $$('#sheetCases a').forEach(a => a.addEventListener('click', () => { if (a.getAttribute('href') === (location.hash || '#home')) closeSheet(true); }));

  /* G1.2 frosted surface + directional hiding, G7.2 scroll progress */
  const prog = $('#progress'), progI = $('i', prog), ps = spring(200, 25); let pRun = false, lastY = scrollY;
  const progTick = () => {
    const max = document.documentElement.scrollHeight - innerHeight; ps.t = max > 0 ? Math.min(1, scrollY / max) : 0;
    if (reduce) { progI.style.transform = `translateX(${((ps.t - 1) * 100).toFixed(2)}%)`; prog.style.opacity = ps.t > .002 ? 1 : 0; return; }
    if (pRun) return; pRun = true; let last = performance.now();
    const f = (n) => { const dt = Math.min(.032, (n - last) / 1000); last = n; const m = ps.step(dt);
      progI.style.transform = `translateX(${((ps.x - 1) * 100).toFixed(2)}%)`; prog.style.opacity = ps.x > .002 ? 1 : 0;
      if (m) requestAnimationFrame(f); else pRun = false; }; requestAnimationFrame(f);
  };
  const onScroll = () => {
    const y = scrollY, d = y - lastY;
    nav.classList.toggle('solid', y > 40);
    if (y < 40 || sheet.classList.contains('open')) nav.classList.remove('hide');
    else if (d > 10 && y > 120) nav.classList.add('hide');
    else if (d < 0) nav.classList.remove('hide');
    lastY = y; progTick();
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', progTick, { passive: true });

  /* G2 mobile menu: burger morphs to X, diagonal sheet wipe, staggered links */
  const isOpen = () => sheet.classList.contains('open');
  const burgerBurst = () => { const r = $('.burger', menuBtn).getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 4, 22, 380); };
  function openSheet() {
    sheet.classList.remove('leaving'); sheet.classList.add('open'); nav.classList.add('menu-open'); nav.classList.remove('hide');
    menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.setAttribute('aria-label', 'Close menu');
    if (lenis) lenis.stop(); burgerBurst();
    setTimeout(() => { const f = $('#sheet a'); f && f.focus({ preventScroll: true }); }, 360);
  }
  function closeSheet(fast) {
    if (!isOpen()) return;
    menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open menu');
    if (lenis) lenis.start();
    if (fast === true) { sheet.classList.add('leaving'); setTimeout(() => { sheet.classList.remove('open', 'leaving'); nav.classList.remove('menu-open'); }, 120); }
    else { sheet.classList.remove('open'); setTimeout(() => { if (!isOpen()) nav.classList.remove('menu-open'); }, 350); }
  }
  menuBtn.onclick = () => { if (isOpen()) { burgerBurst(); closeSheet(); } else openSheet(); };
  $$('#sheet a').forEach(a => a.addEventListener('click', () => { if (a.getAttribute('href') === (location.hash || '#home')) closeSheet(true); }));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { closeSheet(); menuBtn.focus(); }
    if (e.key === 'Tab' && isOpen()) { const f = [menuBtn, ...$$('#sheet a')], i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
  });
  addEventListener('resize', () => { if (innerWidth >= 1024) closeSheet(true); }, { passive: true });

  /* G7.1 custom cursor: spark dot + spring-lagged ring, desktop only */
  if (fine && !reduce) {
    document.documentElement.classList.add('has-cur');
    const cur = $('#cur'), ring = $('.cur-ring', cur), dot = $('.cur-dot', cur), rx = spring(350, 25), ry = spring(350, 25);
    let seen = false, run = false;
    const tick = () => { if (run) return; run = true; let last = performance.now();
      const f = (n) => { const dt = Math.min(.032, (n - last) / 1000); last = n; const a = rx.step(dt), b = ry.step(dt);
        ring.style.translate = `${rx.x.toFixed(1)}px ${ry.x.toFixed(1)}px`; if (a || b) requestAnimationFrame(f); else run = false; }; requestAnimationFrame(f); };
    addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const x = e.clientX, y = e.clientY; dot.style.translate = `${x}px ${y}px`; rx.t = x; ry.t = y;
      if (!seen) { rx.x = x; ry.x = y; seen = true; }
      cur.classList.remove('out');
      const t = e.target.closest && e.target.closest('a,button,[role="button"],summary,.intent,.filter');
      cur.classList.toggle('link', !!t); tick();
    }, { passive: true });
    document.addEventListener('pointerout', (e) => { if (!e.relatedTarget) cur.classList.add('out'); });
    addEventListener('pointerdown', () => ring.animate([{ scale: 1 }, { scale: .8 }, { scale: 1 }], { duration: 240, easing: EOs }));
  }

  /* G5 shared system: primary-button magnet, HUD card tilt + spotlight + media zoom */
  function enhance(root) {
    if (!fine || reduce) return;
    $$('.btn-primary', root).forEach(b => { if (!b.closest('.mag,#navCta,.sig,.signal,.wr-cta,.hr-call')) magnet(b, { radius: 40, max: 7 }); });
    $$('.frame.ignite', root).forEach(c => {
      if (c.dataset.fx || c.closest('.door')) return; c.dataset.fx = '1';
      const sp = document.createElement('span'); sp.className = 'spot'; sp.setAttribute('aria-hidden', 'true'); c.appendChild(sp);
      c.classList.add('tilt'); c.parentElement.classList.add('tilt-host');
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mouse-x', (x * 100).toFixed(1) + '%'); c.style.setProperty('--mouse-y', (y * 100).toFixed(1) + '%');
        const rX = (.5 - y) * 10, rY = (x - .5) * 10, ang = Math.hypot(rX, rY);
        c.classList.add('tracking'); c.style.rotate = ang < .05 ? '' : `${rX.toFixed(3)} ${rY.toFixed(3)} 0 ${ang.toFixed(2)}deg`;
      });
      c.addEventListener('pointerleave', () => { c.classList.remove('tracking'); c.style.rotate = ''; });
    });
  }

  /* G4 footer: kanji drift, horizon rise, brush sign-off, rising embers */
  (function footer() {
    const foot = $('#foot'), fk = $('.foot-k', foot), fh = $('.foot-horizon', foot), cv = $('.foot-embers', foot);
    if (reduce || !hasGsap) { foot.classList.add('in'); fk.style.opacity = '.08'; fh.style.opacity = '.15'; return; }
    ScrollTrigger.create({ trigger: foot, start: 'top 90%', once: true, onEnter: () => {
      foot.classList.add('in');
      fh.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: .15, transform: 'none' }], { duration: 1400, easing: EOs, fill: 'forwards' });
    } });
    gsap.fromTo(fk, { y: 0, opacity: 0 }, { y: () => foot.offsetHeight * .25, opacity: .08, ease: 'none', scrollTrigger: { trigger: foot, start: 'top bottom', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
    const c = cv.getContext('2d'); let W = 0, H = 0, parts = [], on = false, id = 0, last = 0;
    const fit = () => { const dpr = Math.min(devicePixelRatio || 1, 2); W = foot.offsetWidth; H = foot.offsetHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const spawn = (p, fresh) => { p.x = Math.random() * W; p.y = H + (fresh ? Math.random() * 120 : 4); p.ph = Math.random() * 6.28; p.sp = 16 + Math.random() * 22; p.r = 1 + Math.random() * 1.8; p.amp = 6 + Math.random() * 12; p.y0 = H; return p; };
    const frame = (n) => { if (!on) return; const dt = Math.min(.05, (n - last) / 1000); last = n; c.clearRect(0, 0, W, H);
      parts.forEach(p => { p.y -= p.sp * dt; p.ph += dt * 1.6; const rise = H - p.y; if (rise > 120) spawn(p); const a = Math.max(0, 1 - rise / 120) * Math.min(1, rise / 14);
        const x = p.x + Math.sin(p.ph) * p.amp; const g = c.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4); g.addColorStop(0, `rgba(252,160,58,${(a * .9).toFixed(3)})`); g.addColorStop(1, 'rgba(250,116,2,0)'); c.fillStyle = g; c.fillRect(x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8); });
      id = requestAnimationFrame(frame); };
    new IntersectionObserver(([en]) => { if (en.isIntersecting && !on) { fit(); if (!parts.length) parts = Array.from({ length: 14 }, () => spawn({}, true)); on = true; last = performance.now(); id = requestAnimationFrame(frame); } else if (!en.isIntersecting) { on = false; cancelAnimationFrame(id); } }).observe(foot);
    addEventListener('resize', () => { if (on) fit(); }, { passive: true });
  })();

