(() => {
  document.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const T = (t) => `<em class="tbd">${t}</em>`;

  /* ---------------- case data (facts only; gaps marked) ---------------- */
  const CAT = { growth: 'Growth', product: 'Product', transformation: 'Transformation', ventures: 'Ventures' };
  const CASES = [
    { slug: 'apple-gadgets', mpos: 82, art: { 0: { img: 'img/u-apple-s1.webp', live: 'routes' }, 1: { img: 'img/u-apple-s2.webp', live: 'panels' }, 2: { img: 'img/u-apple-s3.webp', live: 'lanterns' } }, cat: 'growth', img: 'img/u-apple.webp', live: 'flame', title: 'Apple Gadgets', big: '2.3x', bigLabel: 'Revenue, BDT 312 crore to 720 crore in one year',
      role: 'Consulting Head of Business Development', period: 'Jan to Dec 2025', team: null,
      context: 'A consumer electronics retailer in Bangladesh brought me in as consulting Head of Business Development for a full year.',
      problem: null,
      owned: ['Business development strategy', 'Brand and integrated marketing strategy', 'Brand and customer-communication guidelines'], teamDid: null,
      steps: [['Set the growth strategy', 'Defined where new revenue would come from and what the business would focus on.'], ['Built the brand and marketing system', 'An integrated marketing strategy, with brand and customer-communication guidelines the team could use daily.'], ['Ran it for the year', null]],
      results: [['2.3x', 'Revenue growth in one year'], ['720', 'BDT crore revenue, up from 312'], ['12', 'Months as BD Head']], lessons: null },
    { slug: 'ai-idp', mpos: 80, art: { 0: { img: 'img/u-idp-s1.webp', live: 'letters' }, 1: { img: 'img/u-idp-s2.webp', live: 'signals' }, 2: { img: 'img/u-idp-s3.webp', live: 'review' }, 3: { img: 'img/u-idp-s4.webp', live: 'vault' } }, cat: 'product', img: 'img/u-idp.webp', live: 'forge', title: 'AI document processing for banks', big: '95%', bigLabel: 'English field extraction at proof of concept, ~85% for Bangla',
      role: 'Product lead, BRAC IT', period: 'Proof of concept, 2026', team: null,
      context: 'Bank branches still capture account-opening forms by hand before keying them into the core banking system. I am building an AI document processing platform that sits between branch intake and core banking.',
      problem: 'Handwritten Bangla and English forms, retyped by hand, under strict data-sovereignty rules.', flare: ['retyped by hand', 'data-sovereignty'],
      owned: ['Product vision and positioning for regulated industries', 'Proof-of-concept scope and demo', 'Pitch to a bank CTO for account-opening automation'], teamDid: null,
      steps: [['Upload and extract', 'A scanned form goes in; AI extracts each field in English, Bangla and Banglish.'], ['Score every field', 'Per-field confidence with a red, amber and green signal, so staff check only what needs checking.'], ['Keep a human in the loop', 'Staff correct low-confidence fields in a predetermined capture screen.'], ['Deploy inside the bank', 'On-premise and air-gapped options for data sovereignty, plus a no-code template builder.']],
      results: [['~95%', 'English extraction accuracy at POC'], ['~85%', 'Bangla extraction accuracy at POC'], ['3', 'Languages: English, Bangla, Banglish']], lessons: null },
    { slug: 'nextlab', mpos: 78, art: { 0: { img: 'img/u-nl-s1.webp', live: 'cubes' }, 1: { img: 'img/u-nl-s2.webp', live: 'circuit' }, 2: { img: 'img/u-nl-s3.webp', live: 'streams', flat: true }, 3: { img: 'img/u-nl-s4.webp', live: 'streams' }, 4: { img: 'img/u-nl-s5.webp', live: 'globe' } }, cat: 'transformation', img: 'img/u-nextlab.webp', live: 'scaffold', title: 'NextLab Solutions', big: '5', bigLabel: 'Northstar clients won while rebuilding the company',
      role: 'Consultant, acting Chief Business & Transformation Officer', period: 'Nov 2024 to Mar 2026', team: null,
      context: 'A software company that needed its portfolio, people and processes rebuilt while it kept selling.',
      problem: null,
      owned: ['Software product portfolio audit', 'Workforce redesign', 'Hiring the full leadership bench', 'Organisation-wide SOPs', 'New client acquisition'], teamDid: null,
      steps: [['Audit the portfolio', 'Reviewed every software product to decide what to keep, fix or stop.'], ['Redesign the workforce', 'Reshaped teams and roles around the products that mattered.'], ['Hire the leadership bench', 'Recruited the full leadership team.'], ['Write the operating system', 'Authored the SOPs the organisation now runs on.'], ['Win northstar clients', 'Closed five anchor clients.']],
      results: [['5', 'Northstar clients won'], ['17', 'Months as acting CBTO'], ['Full', 'Leadership bench hired']], lessons: null },
    { slug: 'tripploy', mpos: 82, art: { 0: { img: 'img/u-tp-s1.webp', live: 'tickets' }, 1: { img: 'img/u-tp-s2.webp', live: 'bridges' }, 2: { img: 'img/u-tp-s3.webp', live: 'stage' }, 3: { img: 'img/u-tp-s4.webp', live: 'sea' } }, cat: 'growth', img: 'img/u-tripploy.webp', live: 'fireflies', title: 'Tripploy', big: '3x', bigLabel: 'Sales after rebuilding the platform, CRM and partnerships',
      role: 'Growth and transformation consultant', period: 'Mar to Dec 2024', team: null,
      context: 'A travel and study-abroad business that needed growth and a modern OTA platform and CRM.',
      problem: null,
      owned: ['Growth strategy', 'OTA platform and CRM transformation', 'University partnerships', 'Brand ambassador programme', 'Malaysia market-entry roadmap'], teamDid: null,
      steps: [['Rebuild the platform', 'Moved sales onto an OTA platform and CRM built for the funnel.'], ['Open partnerships', 'Closed MOUs with universities in the UK, Malaysia, Australia and New Zealand.'], ['Add reach', 'Onboarded brand ambassadors Zee and Tamim Mridha.'], ['Plan the next market', 'Wrote the Malaysia market-entry roadmap.']],
      results: [['3x', 'Sales'], ['4', 'Countries with university MOUs'], ['10', 'Months']], lessons: null },
    { slug: 'team-qreative', mpos: 80, art: { 0: { img: 'img/u-tq-s1.webp', live: 'brushline' }, 1: { img: 'img/u-tq-s2.webp', live: 'dust' }, 2: { img: 'img/u-tq-s3.webp', live: 'paint' } }, cat: 'growth', img: 'img/u-qreative.webp', live: 'ink', title: 'Team Qreative', big: '3x', bigLabel: 'Lead-to-sales conversion',
      role: 'Creative director, pitch and sales-enablement consultant', period: 'Jan 2023 to Jun 2025', team: null,
      context: 'A creative agency selling to international clients.',
      problem: null,
      owned: ['Creative direction', 'Elevator pitch and sales enablement'], teamDid: null,
      steps: [['Sharpen the pitch', 'Rewrote how the agency explained itself to buyers.'], ['Equip the sales team', 'Sales-enablement material built around that pitch.'], ['Direct the work', 'Creative direction across international client projects.']],
      results: [['3x', 'Lead-to-sales conversion'], ['30+', 'International client projects'], ['~$35k', 'Project revenue (USD)']], lessons: null },
    { slug: 'banking-chatbot', mpos: 75, art: { 0: { img: 'img/u-bk-s1.webp', live: 'gates' }, 1: { img: 'img/u-bk-s2.webp', live: 'dome' }, 2: { img: 'img/u-bk-s3.webp', live: 'key' }, 3: { img: 'img/u-bk-s4.webp', live: 'scale' } }, cat: 'product', img: 'img/u-bank.webp', live: 'aura', title: 'Agentic AI assistant for a bank', big: '7', bigLabel: 'Working days to prove a two-tier banking assistant',
      role: 'Business analyst and PoC scope lead, BRAC IT', period: '2026', team: null,
      context: 'A Tier-1 Bangladeshi bank ran an RFP for a bilingual customer-service chatbot and an agentic AI banking platform, with a seven-day proof of concept.',
      problem: 'Real AI help for customers, inside Bangladesh Bank rules, without making the bank dependent on a vendor.', flare: ['Bangladesh Bank rules', 'dependent on a vendor'], door: 'partner',
      owned: ['PoC scope: public chatbot plus logged-in agentic assistant', 'Compliance design against Bangladesh Bank rules', 'Admin panel so the bank feeds new products without the vendor', 'BRD/PRD and token-cost optimisation'], teamDid: ['SRS and build of the dual-face architecture'],
      steps: [['Split into two tiers', 'A public no-login chatbot for cards, products, outlets and ATMs, and an assistant for authenticated customers.'], ['Design for the regulator', 'For sensitive actions such as a PIN change, the agent prepares the work and returns a secure link to finish on the bank\'s own channel.'], ['Hand control to the bank', 'An admin panel to add new products and mark discontinued ones so the model stops offering them.'], ['Keep costs down', 'Designed the flows to minimise LLM token spend.']],
      results: [['2', 'Tiers: public and authenticated'], ['7', 'Day PoC plan'], ['0', 'Vendor dependency for content updates']], lessons: null },
    { slug: 'discovery-playbook', mpos: 81, art: { 0: { img: 'img/u-pb-s1.webp', live: 'doors' }, 1: { img: 'img/u-pb-s2.webp', live: 'dial' }, 2: { img: 'img/u-pb-s3.webp', live: 'stones' } }, cat: 'product', img: 'img/u-playbook.webp', live: 'mist', title: 'BA discovery playbook system', door: 'partner', big: '8', bigLabel: 'Discovery session types in one framework',
      role: 'Creator, for the BA team at BRAC IT', period: '2026', team: null,
      context: 'Discovery sessions depended on who ran them. I built a system so every analyst starts from the same playbook.',
      problem: null,
      owned: ['8-type discovery framework', 'Scoring app built in Next.js', 'Detailed HTML playbooks'], teamDid: null,
      steps: [['Classify the session', 'Eight discovery types, each with its own goals and questions.'], ['Score readiness', 'A Next.js app that scores a project and recommends the session type.'], ['Run the playbook', 'Step-by-step HTML playbooks; Program Discovery alone runs 11 steps across 5 phases.']],
      results: [['8', 'Discovery types'], ['11', 'Steps in Program Discovery'], ['5', 'Phases']], lessons: null },
    { slug: 'ventures', mpos: 66, art: { 0: { img: 'img/u-vn-s1.webp', live: 'orbits' }, 1: { img: 'img/u-vn-s2.webp', live: 'ledger' }, 2: { img: 'img/u-vn-s3.webp', live: 'cells' } }, cat: 'ventures', img: 'img/u-ventures.webp', live: 'feathers', title: 'NexNomad and NexBook', big: '3', bigLabel: 'Ventures built alongside the day job',
      role: 'Founder; Co-founder & CMO at NexAI Analytics', period: 'Ongoing', team: null,
      context: 'Building products myself keeps my specifications honest.',
      problem: null,
      owned: ['NexNomad: AI travel platform, founder', 'NexBook: AI-native ERP at NexAI Analytics', 'AI-Driven Data Analysis course, instructor'], teamDid: null,
      steps: [['NexNomad', 'Phase 1 is the itinerary loop: generate, refine, save, on React, Node, PostgreSQL and a self-hosted vLLM layer.'], ['NexBook', 'An AI-native ERP positioned as a CFO\'s CFO: forecasting and decision support on top of core finance.'], ['AI-Driven Data Analysis', 'Ten recorded classes on automating Excel with AI-written VBA.']],
      results: [['3', 'Ventures'], ['10', 'Course classes'], ['Day 1', 'Self-hosted inference']], lessons: null }
  ];
  const bySlug = Object.fromEntries(CASES.map(c => [c.slug, c]));

  /* user art is split into a background plate and a cut-out figure so each can move on its own (no layers under reduced motion) */
  const LY = (c) => !reduce && !c.flat && c.img.startsWith('img/u-');
  const lyImgs = (c, cls = '', lazy = true) => LY(c)
    ? `<img${cls ? ` class="${cls}"` : ''} src="${c.img.replace('.webp', '-bg.webp')}" data-full="${c.img}" alt=""${lazy ? ' loading="lazy"' : ''}><img class="${cls ? cls + ' ' : ''}lv-fg" src="${c.img.replace('.webp', '-fg.webp')}" alt="" aria-hidden="true"${lazy ? ' loading="lazy"' : ''}>`
    : `<img${cls ? ` class="${cls}"` : ''} src="${c.img}" alt=""${lazy ? ' loading="lazy"' : ''}>`;
  const card = (c, wide) => `
    <a class="case-card frame ignite${wide ? ' wide' : ''}" href="#case-${c.slug}" data-cat="${c.cat}"${c.live ? ` data-live="${c.live}"` : ''} style="--c:var(--cat-${c.cat})">
      <span class="corner tl"></span><span class="corner br"></span><span class="flare" aria-hidden="true"></span>
      <div class="media">${lyImgs(c)}<div class="big">${c.big}<small>${c.bigLabel}</small></div></div>
      <div class="meta"><span class="cat">${CAT[c.cat]}</span><h3>${c.title}</h3><p class="role">${c.role}</p></div>
    </a>`;

  $('#panTrack').insertAdjacentHTML('beforeend', ['apple-gadgets', 'ai-idp', 'nextlab'].map(s => card(bySlug[s])).join(''));
  $('#workGrid').innerHTML = CASES.map((c, i) => card(c, i % 4 === 0 || i % 4 === 3)).join('');

  /* ---------- live user-art effects (registry shared by work cards and case heroes) ----------
     each kind: n particles, mk(W,H,init) -> particle, draw(p,dt,W,H,c,sp,surge); sp = speed multiplier */
  const R = Math.random;
  const glow = (c, x, y, r, rgb, a) => { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${rgb},${a.toFixed(3)})`); g.addColorStop(1, `rgba(${rgb},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); };
  let st0 = null; /* context of the effect currently drawing (hero or card) */
  /* map image-space fractions to canvas pixels when the art is cover-cropped (step pictures) */
  const MX = (x, W) => st0 && st0.sx ? (x - st0.ox) / st0.sx * W : x * W, MY = (y, H) => st0 && st0.sy ? (y - st0.oy) / st0.sy * H : y * H, MS = () => st0 && st0.sx ? 1 / st0.sx : 1;
  const LIVE = {
    /* ventures: black feathers fall, red embers rise */
    feathers: { n: 30, mk: (W, H, init) => R() < .45 ? { f: 1, x: R() * W * 1.1, y: init ? R() * H : -30, v: 14 + R() * 22, ph: R() * 6.28, rot: R() * 6.28, vr: R() - .5, s: (6 + R() * 10) * Math.max(1, H / 420) }
                                                    : { f: 0, x: R() * W, y: init ? R() * H : H + 8, v: 14 + R() * 26, ph: R() * 6.28, r: .8 + R() * 1.5 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.f) { p.y += p.v * sp * dt; p.x -= p.v * .4 * sp * dt; p.rot += p.vr * sp * dt; if (p.y > H + 30 || p.x < -40) Object.assign(p, LIVE.feathers.mk(W, H, false), { f: 1, x: R() * W * 1.1 + W * .1, y: -30, v: 14 + R() * 22, rot: R() * 6.28, vr: R() - .5, s: (6 + R() * 10) * Math.max(1, H / 420) });
          c.save(); c.translate(p.x + Math.sin(p.ph) * 10, p.y); c.rotate(p.rot + Math.sin(p.ph * 1.3) * .5); c.globalAlpha = .75; c.fillStyle = '#0b0607'; c.strokeStyle = `rgba(214,40,40,${(.25 + su * .5).toFixed(2)})`; c.lineWidth = 1;
          c.beginPath(); c.ellipse(0, 0, p.s * .28, p.s, 0, 0, 6.283); c.fill(); c.stroke(); c.restore(); }
        else { p.y -= p.v * sp * dt; if (p.y < -8) { p.y = H + 8; p.x = R() * W; } glow(c, p.x + Math.sin(p.ph * 1.6) * 6, p.y, p.r * 4, '255,70,60', Math.min(1, (.35 + .45 * Math.abs(Math.sin(p.ph * 2.2))) * (1 + su))); } } },
    /* banking chatbot: red-black aura wisps curl up, ash flakes drift, hover cuts silver slashes */
    aura: { n: 34, mk: (W, H, init) => R() < .4 ? { k: 0, x: W * (.45 + R() * .55), y: init ? R() * H : H + 20, v: 20 + R() * 30, ph: R() * 6.28, len: 30 + R() * 60, w: 2 + R() * 4 }
                                                : { k: 1, x: R() * W, y: init ? R() * H : -10, v: 10 + R() * 18, ph: R() * 6.28, rot: R() * 6.28, s: 2 + R() * 4 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.k === 0) { p.y -= p.v * sp * dt; if (p.y < -p.len) Object.assign(p, LIVE.aura.mk(W, H, false), { k: 0, y: H + 20 });
          const a = Math.min(1, p.y / H * 1.4) * (.45 + su * .4); c.strokeStyle = `rgba(200,24,40,${a.toFixed(3)})`; c.lineWidth = p.w; c.lineCap = 'round';
          c.beginPath(); for (let i = 0; i <= 8; i++) { const t = i / 8, yy = p.y + t * p.len, xx = p.x + Math.sin(p.ph * 2 + t * 4) * (8 + t * 10); i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke();
          c.strokeStyle = `rgba(10,4,8,${(a * .9).toFixed(3)})`; c.lineWidth = p.w * .45; c.stroke(); }
        else { p.y += p.v * sp * dt; p.x += Math.sin(p.ph) * 12 * dt - 6 * sp * dt; p.rot += dt * sp; if (p.y > H + 10) Object.assign(p, LIVE.aura.mk(W, H, false), { k: 1, y: -10 });
          c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillStyle = 'rgba(12,10,14,.85)'; c.fillRect(-p.s, -p.s * .5, p.s * 2, p.s); c.restore(); } },
      fx: (st, dt, W, H, c) => { if (st.cut === undefined) st.cut = 0; st.cut = Math.max(0, st.cut - dt * 2.2); if (st.cut <= 0) return;
        const a = st.cut; c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(235,235,255,${(a * .8).toFixed(3)})`; c.lineWidth = 2;
        (st.cuts || []).forEach(k => { c.beginPath(); c.moveTo(k[0] * W, k[1] * H); c.lineTo(k[2] * W, k[3] * H); c.stroke(); }); c.restore(); },
      hit: (st) => { st.cut = 1; st.cuts = Array.from({ length: 3 }, () => { const x = .35 + R() * .5, y = .1 + R() * .5; return [x, y, x - .25 - R() * .15, y + .35 + R() * .2]; }); } },
    /* playbook: teal mist ribbons stream sideways, glowing motes, hover makes the mist spin faster */
    mist: { n: 30, mk: (W, H, init) => R() < .5 ? { k: 0, x: init ? R() * W : W + 80, y: H * (.2 + R() * .75), v: 18 + R() * 26, ph: R() * 6.28, len: 80 + R() * 140, w: 6 + R() * 14 }
                                               : { k: 1, x: W * (.4 + R() * .6), y: init ? R() * H : H + 6, v: 8 + R() * 16, ph: R() * 6.28, r: 1 + R() * 2 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.k === 0) { p.x -= p.v * sp * dt; if (p.x < -p.len - 40) Object.assign(p, LIVE.mist.mk(W, H, false), { k: 0, x: W + 80 });
          const a = (.12 + su * .12) * Math.min(1, Math.max(0, (p.x / W - .15) * 3)); c.strokeStyle = `rgba(190,240,235,${a.toFixed(3)})`; c.lineWidth = p.w; c.lineCap = 'round';
          c.beginPath(); for (let i = 0; i <= 10; i++) { const t = i / 10, xx = p.x + t * p.len, yy = p.y + Math.sin(p.ph * 1.4 + t * 5) * (10 + su * 14); i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); }
        else { p.y -= p.v * sp * dt; if (p.y < -6) Object.assign(p, LIVE.mist.mk(W, H, false), { k: 1, y: H + 6 }); glow(c, p.x + Math.sin(p.ph * 1.2) * 14, p.y, p.r * 5, '120,240,220', Math.min(1, (.3 + .5 * Math.abs(Math.sin(p.ph * 1.8))) * (1 + su))); } } },
    /* Apple Gadgets: the burning map; embers rise from the scroll, the flame glow flickers, hover flares it */
    flame: { n: 40, mk: (W, H, init) => ({ x: W * (.52 + R() * .24), y: init ? H * (.15 + R() * .5) : H * (.42 + R() * .14), v: 24 + R() * 40, ph: R() * 6.28, r: .9 + R() * 1.8, life: init ? R() : 1 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; p.y -= p.v * sp * dt; p.x += Math.sin(p.ph * 1.7) * 14 * dt; p.life -= dt * .35 * sp;
        if (p.life <= 0 || p.y < -8) Object.assign(p, LIVE.flame.mk(W, H, false));
        glow(c, p.x, p.y, p.r * 4.5, '255,150,50', Math.max(0, Math.min(1, p.life * 1.2)) * (.7 + su * .3)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; const f = .5 + .25 * Math.sin(st.t * 9) + .15 * Math.sin(st.t * 23) + (st.su || 0) * .6; st.su = Math.max(0, (st.su || 0) - dt * 1.5);
        c.save(); c.globalCompositeOperation = 'lighter'; glow(c, W * .63, H * .32, Math.min(W, H) * (.22 + (st.su || 0) * .1), '255,120,30', .22 * f); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* AI document processing: the anvil throws blue sparks with gravity, paper forms drift up and away */
    forge: { n: 46, mk: (W, H, init, o) => { const ox = o && o.hero ? .74 : .57, oy = o && o.hero ? .7 : .82; if (R() < .12) return { k: 1, ox, x: W * (ox - .08 - R() * .12), y: init ? H * (oy - .1 - R() * .45) : H * (oy - .12), vx: -(8 + R() * 18), vy: -(10 + R() * 22), rot: R() * 6.28, vr: (R() - .5) * 1.5, s: 7 + R() * 9, life: init ? R() : 1 };
        const a = -Math.PI * (.55 + R() * .35), v = 90 + R() * 160; return { k: 0, ox, x: W * ox, y: H * oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: init ? R() * .8 : .6 + R() * .5, r: .7 + R() * 1.2 }; },
      draw: (p, dt, W, H, c, sp, su) => {
        if (p.k === 1) { p.x += p.vx * sp * dt; p.y += p.vy * sp * dt; p.rot += p.vr * dt; p.life -= dt * .12 * sp; if (p.life <= 0 || p.y < -20) Object.assign(p, LIVE.forge.mk(W, H, false, st0));
          c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.globalAlpha = Math.min(1, p.life * 2) * .4; c.shadowColor = 'rgba(140,210,255,.9)'; c.shadowBlur = 8; c.fillStyle = 'rgba(225,238,255,.95)'; c.fillRect(-p.s * .7, -p.s, p.s * 1.4, p.s * 2);
          c.fillStyle = 'rgba(80,140,220,.6)'; for (let i = 0; i < 3; i++) c.fillRect(-p.s * .5, -p.s * .6 + i * p.s * .5, p.s, 1); c.restore(); return; }
        p.vy += 260 * dt; p.x += p.vx * sp * dt; p.y += p.vy * dt; p.life -= dt * sp; if (p.life <= 0 || p.y > H + 10) Object.assign(p, LIVE.forge.mk(W, H, false, st0));
        const a = Math.max(0, Math.min(1, p.life * 1.6)); c.strokeStyle = `rgba(150,215,255,${a.toFixed(3)})`; c.lineWidth = p.r; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x - p.vx * .025, p.y - p.vy * .025); c.stroke(); },
      fx: (st, dt, W, H, c) => { st.su = Math.max(0, (st.su || 0) - dt * 2); st.t = (st.t || 0) + dt; const pulse = Math.max(0, Math.sin(st.t * 3.1)) ** 8;
        c.save(); c.globalCompositeOperation = 'lighter'; glow(c, W * (st.hero ? .74 : .57), H * (st.hero ? .7 : .82), Math.min(W, H) * (.12 + st.su * .14), '140,210,255', .35 * pulse + st.su * .5); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* NextLab: violet build-sparks climb the scaffold, gold current flickers along it, hover surges the current */
    scaffold: { n: 36, mk: (W, H, init) => ({ x: W * (.4 + R() * .55), y: init ? R() * H : H + 6, v: 20 + R() * 34, ph: R() * 6.28, r: .8 + R() * 1.6, g: R() < .3 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; p.y -= p.v * sp * dt; if (p.y < -6) Object.assign(p, LIVE.scaffold.mk(W, H, false));
        glow(c, p.x + Math.sin(p.ph * 2) * 4, p.y, p.r * 4, p.g ? '255,200,90' : '190,140,255', (.45 + .45 * Math.abs(Math.sin(p.ph * 2.4))) * (1 + su * .6)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.6); st.cd = (st.cd || 0) - dt;
        if (st.cd <= 0) { st.cd = .25 + R() * .9 - st.su * .2; const x = W * (.45 + R() * .45), y = H * (.15 + R() * .6), pts = [[x, y]]; for (let i = 0; i < 6; i++) pts.push([pts[i][0] + (R() - .5) * 40, pts[i][1] + 14 + R() * 18]); st.bolt = { pts, life: .18 + st.su * .2 }; }
        if (st.bolt && st.bolt.life > 0) { st.bolt.life -= dt; c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(255,214,120,${Math.min(1, st.bolt.life * 5).toFixed(3)})`; c.lineWidth = 1.6; c.beginPath(); st.bolt.pts.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.stroke(); c.restore(); } },
      hit: (st) => { st.su = 1; st.cd = 0; } },
    /* Tripploy: fireflies wander out of the lantern across the harbour; the lantern breathes; hover releases a swarm */
    fireflies: { n: 34, mk: (W, H, init, o) => { const lx = o && o.hero ? .62 : .59, ly = o && o.hero ? .4 : .43; return { lx, ly, x: init ? W * R() * .8 : W * lx, y: init ? H * (.1 + R() * .6) : H * ly, vx: -(10 + R() * 30), vy: -(4 + R() * 14), ph: R() * 6.28, r: .9 + R() * 1.6, life: init ? R() * 6 : 6 + R() * 4 }; },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; p.life -= dt; p.x += (p.vx + Math.sin(p.ph * 1.3) * 18) * sp * dt; p.y += (p.vy + Math.cos(p.ph) * 12) * dt;
        if (p.life <= 0 || p.x < -10 || p.y < -10) Object.assign(p, LIVE.fireflies.mk(W, H, false, st0));
        glow(c, p.x, p.y, p.r * 5, '255,200,90', Math.max(0, Math.min(1, p.life)) * (.35 + .55 * Math.abs(Math.sin(p.ph * 3))) * (1 + su * .5)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.3); const f = .55 + .2 * Math.sin(st.t * 2.2) + .08 * Math.sin(st.t * 13) + st.su * .5;
        c.save(); c.globalCompositeOperation = 'lighter'; glow(c, W * (st.hero ? .62 : .59), H * (st.hero ? .4 : .43), Math.min(W, H) * (.16 + st.su * .08), '255,170,60', .3 * f); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* Team Qreative: ink birds lift off the scroll and fly up-left, embers drift, hover releases a flock */
    ink: { n: 30, mk: (W, H, init) => R() < .55 ? { k: 0, x: init ? W * (.25 + R() * .4) : W * (.48 + R() * .1), y: init ? H * (.1 + R() * .5) : H * (.55 + R() * .1), vx: -(18 + R() * 30), vy: -(14 + R() * 22), ph: R() * 6.28, s: 5 + R() * 7, life: init ? R() * 5 : 5 + R() * 3 }
                                              : { k: 1, x: W * (.35 + R() * .6), y: init ? R() * H : H + 6, v: 14 + R() * 26, ph: R() * 6.28, r: .8 + R() * 1.4 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.k === 0) { p.life -= dt; p.x += p.vx * sp * dt; p.y += p.vy * sp * dt + Math.sin(p.ph * 2) * 6 * dt; if (p.life <= 0 || p.x < -20 || p.y < -20) Object.assign(p, LIVE.ink.mk(W, H, false), { k: 0 });
          const f = Math.sin(p.ph * 9) * .9, a = Math.min(1, p.life) * .85; c.save(); c.translate(p.x, p.y); c.globalAlpha = a; c.strokeStyle = '#120d0a'; c.lineWidth = Math.max(1.4, p.s * .28); c.lineCap = 'round';
          c.beginPath(); c.moveTo(-p.s, -f * p.s * .6); c.quadraticCurveTo(-p.s * .4, -p.s * .2, 0, 0); c.quadraticCurveTo(p.s * .4, -p.s * .2, p.s, -f * p.s * .6); c.stroke(); c.restore(); }
        else { p.y -= p.v * sp * dt; if (p.y < -6) Object.assign(p, LIVE.ink.mk(W, H, false), { k: 1, y: H + 6 }); glow(c, p.x + Math.sin(p.ph * 1.5) * 8, p.y, p.r * 4, '255,140,60', (.3 + .4 * Math.abs(Math.sin(p.ph * 2))) * (1 + su * .5)); } },
      hit: (st) => { st.su = 1; } },
    /* Apple Gadgets step 1: light pulses race along the routes on the strategy table, the pen tip glows */
    routes: { n: 18, mk: (W, H, init) => ({ t: R(), v: .08 + R() * .1, dir: R() < .5 ? 1 : -1, lane: R(), r: 1.6 + R() * 1.6 }),
      draw: (p, dt, W, H, c, sp, su) => { p.t = (p.t + p.v * p.dir * sp * dt + 1) % 1; const a = p.t * 6.283, rx = W * (.29 + p.lane * .05), ry = H * (.12 + p.lane * .03), cx = W * .49, cy = H * .73;
        const x = cx + Math.cos(a) * rx + Math.sin(a * 3) * W * .02, y = cy + Math.sin(a) * ry; glow(c, x, y, p.r * 5, '255,170,70', .75 + su * .25);
        const x2 = cx + Math.cos(a - p.dir * .08) * rx + Math.sin((a - p.dir * .08) * 3) * W * .02, y2 = cy + Math.sin(a - p.dir * .08) * ry; c.strokeStyle = `rgba(255,190,90,${(.35 + su * .3).toFixed(2)})`; c.lineWidth = p.r * .8; c.beginPath(); c.moveTo(x2, y2); c.lineTo(x, y); c.stroke(); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.4); c.save(); c.globalCompositeOperation = 'lighter';
        glow(c, W * .41, H * .66, Math.min(W, H) * (.05 + st.su * .05), '255,200,110', .5 + .3 * Math.sin(st.t * 6)); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* Apple Gadgets step 2: holographic brand panels orbit him, glints run across them; hover spins the orbit faster */
    panels: { n: 16, mk: (W, H, init) => ({ a: R() * 6.283, v: .25 + R() * .25, rx: .2 + R() * .12, ry: .3 + R() * .12, y0: .35 + R() * .25, w: 14 + R() * 18, h: 10 + R() * 12 }),
      draw: (p, dt, W, H, c, sp, su) => { p.a += p.v * sp * dt; const cx = W * .6, x = cx + Math.cos(p.a) * W * p.rx, y = H * p.y0 + Math.sin(p.a) * H * p.ry * .35, front = Math.sin(p.a) > 0, k = front ? 1 : .45, sc = Math.max(.35, .7 + Math.sin(p.a) * .3);
        c.save(); c.translate(x, y); c.globalAlpha = (.35 + su * .3) * k; c.strokeStyle = 'rgba(150,215,255,.95)'; c.fillStyle = 'rgba(120,190,255,.12)'; c.lineWidth = 1;
        c.beginPath(); c.rect(-p.w * sc / 2, -p.h * sc / 2, p.w * sc, p.h * sc); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,190,110,.9)'; c.fillRect(-p.w * sc / 2 + 2, -p.h * sc / 2 + 2, Math.max(2, p.w * sc * .3), 1.5); c.restore(); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.5); const g = (st.t * .35) % 1;
        c.save(); c.globalCompositeOperation = 'lighter'; glow(c, W * (.35 + g * .55), H * (.42 + Math.sin(st.t) * .05), Math.min(W, H) * .08, '140,210,255', .25 + st.su * .3); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Apple Gadgets step 3: lantern light flickers, warm bokeh drifts down the street, steam rises from the stall */
    lanterns: { n: 40, mk: (W, H, init) => R() < .7 ? { k: 0, x: R() * W, y: init ? R() * H * .9 : -10, v: 4 + R() * 10, ph: R() * 6.28, r: 2 + R() * 4 } : { k: 1, x: W * (.08 + R() * .12), y: init ? H * (.3 + R() * .3) : H * .58, v: 14 + R() * 16, ph: R() * 6.28, r: 6 + R() * 10, life: init ? R() : 1 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.k === 0) { p.y += p.v * sp * dt; p.x += Math.sin(p.ph * .7) * 6 * dt; if (p.y > H + 10) Object.assign(p, LIVE.lanterns.mk(W, H, false), { k: 0, y: -10 });
          glow(c, p.x, p.y, p.r * 2.4, '255,170,80', (.18 + .14 * Math.sin(p.ph * 2)) * (1 + su)); }
        else { p.y -= p.v * dt; p.x += Math.sin(p.ph) * 8 * dt; p.r += dt * 6; p.life -= dt * .35; if (p.life <= 0) Object.assign(p, LIVE.lanterns.mk(W, H, false), { k: 1, y: H * .58, r: 6 + R() * 8, life: 1 });
          glow(c, p.x, p.y, p.r, '235,235,240', Math.max(0, p.life) * .18); } },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.4); const f = .5 + .2 * Math.sin(st.t * 3.1) + .1 * Math.sin(st.t * 11.7) + st.su * .5;
        c.save(); c.globalCompositeOperation = 'lighter'; [[.04, .12], [.28, .3], [.82, .15], [.95, .2]].forEach((q, i) => glow(c, W * q[0], H * q[1], Math.min(W, H) * .12, '255,140,50', .16 * f * (1 + .3 * Math.sin(st.t * 2 + i)))); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* AI document processing step 1: handwritten letters lift off the form as glowing glyphs and drift away */
    letters: { n: 34, mk: (W, H, init) => ({ x: MX(.3 + R() * .12, W), y: MY(.3 + R() * .3, H), vx: 20 + R() * 50, vy: -(6 + R() * 26), ph: R() * 6.28, life: init ? R() * 3 : 3 + R() * 2, ch: 'abcdefghknpqrxzAEHKMQSZ'[(R() * 23) | 0], s: 9 + R() * 9 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; p.life -= dt * sp; p.x += p.vx * sp * dt; p.y += (p.vy + Math.sin(p.ph * 2) * 10) * dt; if (p.life <= 0 || p.x > W + 20) Object.assign(p, LIVE.letters.mk(W, H, false));
        c.save(); c.font = `${p.s}px serif`; c.fillStyle = `rgba(160,220,255,${(Math.min(1, p.life) * (.6 + su * .3)).toFixed(3)})`; c.shadowColor = 'rgba(120,200,255,.9)'; c.shadowBlur = 8; c.fillText(p.ch, p.x, p.y); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* step 2: field lights blink red, amber and green across the confidence wall; hover sweeps them to green */
    signals: { n: 22, mk: (W, H, init) => ({ x: MX(R() < .5 ? .14 + R() * .3 : .66 + R() * .28, W), y: MY(.12 + R() * .75, H), t: R() * 3, p: 1 + R() * 2.5, col: R() < .3 ? '255,80,70' : R() < .55 ? '255,190,60' : '90,240,140' }),
      draw: (p, dt, W, H, c, sp, su) => { p.t += dt * sp; const on = (p.t % p.p) < p.p * .45, col = su > .2 ? '90,240,140' : p.col; if (on || su > .2) glow(c, p.x, p.y, 7 + su * 5, col, .65); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * .9); const y = H * ((st.t * .18) % 1);
        c.fillStyle = 'rgba(140,210,255,.07)'; c.fillRect(0, y - 2, W, 4); },
      hit: (st) => { st.su = 1; } },
    /* step 3: a scan line reads the shared document row by row, ticks appear as fields are confirmed */
    review: { n: 14, mk: (W, H, init) => ({ x: W * (.25 + R() * .5), y: init ? R() * H : H + 6, v: 8 + R() * 12, ph: R() * 6.28, r: 1 + R() * 1.4 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt; p.y -= p.v * sp * dt; if (p.y < -6) Object.assign(p, LIVE.review.mk(W, H, false)); glow(c, p.x + Math.sin(p.ph) * 6, p.y, p.r * 4, '150,215,255', .4); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); const x0 = MX(.44, W), x1 = MX(.64, W), y0 = MY(.5, H), y1 = MY(.78, H), q = (st.t * .35) % 1, y = y0 + (y1 - y0) * q;
        c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = 'rgba(150,220,255,.55)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y - (x1 - x0) * .12); c.stroke();
        for (let i = 0; i < 4; i++) { const yi = y0 + (y1 - y0) * (i + .5) / 4; if (yi < y) glow(c, x1 - 6, yi - (x1 - x0) * .12 * .9, 5, '110,240,150', .7); } c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* step 4: light rings orbit the secured core, sparks circle it; hover spins the rings up */
    vault: { n: 24, mk: (W, H, init) => ({ a: R() * 6.283, v: .6 + R() * .9, rx: .1 + R() * .12, tilt: .2 + R() * .3, r: 1 + R() * 1.6 }),
      draw: (p, dt, W, H, c, sp, su) => { p.a += p.v * sp * dt; const cx = MX(.3, W), cy = MY(.5, H), k = MS(), x = cx + Math.cos(p.a) * W * p.rx * k, y = cy + Math.sin(p.a) * W * p.rx * p.tilt * k; glow(c, x, y, p.r * 5, '140,215,255', .7 * (Math.sin(p.a) > 0 ? 1 : .4)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2.5); st.su = Math.max(0, (st.su || 0) - dt * 1.2); const cx = MX(.3, W), cy = MY(.5, H), k = MS();
        c.save(); c.globalCompositeOperation = 'lighter'; glow(c, cx, cy, Math.min(W, H) * k * (.1 + .02 * Math.sin(st.t * 3)), '160,225,255', .35 + (st.su || 0) * .3);
        [[.2, .28, 1], [.15, .4, -1.3]].forEach(([r, tl, d]) => { c.strokeStyle = 'rgba(150,215,255,.4)'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(cx, cy, W * r * k, W * r * tl * k, st.t * .4 * d, st.t * d, st.t * d + 2.4); c.stroke(); }); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* NextLab step 1: product cubes float in the gallery, one at a time flashes gold as it is chosen */
    cubes: { n: 18, mk: (W, H, init) => ({ x: MX(R() < .5 ? .03 + R() * .3 : .62 + R() * .35, W), y: MY(.08 + R() * .7, H), ph: R() * 6.28, s: 6 + R() * 10, g: 0 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; p.g = Math.max(0, p.g - dt * .6); if (R() < dt * .08 * (1 + su * 6)) p.g = 1; const y = p.y + Math.sin(p.ph * .8) * 6, s = p.s;
        c.save(); c.translate(p.x, y); c.rotate(Math.sin(p.ph * .5) * .3); const col = p.g > .05 ? `255,200,90` : `170,220,255`; c.strokeStyle = `rgba(${col},${(.35 + p.g * .6).toFixed(2)})`; c.fillStyle = `rgba(${col},${(.06 + p.g * .25).toFixed(2)})`; c.lineWidth = 1;
        c.fillRect(-s, -s, s * 2, s * 2); c.strokeRect(-s, -s, s * 2, s * 2); c.restore(); if (p.g > .05) glow(c, p.x, y, s * 3, '255,200,90', p.g * .5); },
      hit: (st) => { st.su = 1; } },
    /* NextLab step 2: current runs from his hands down into the circuit layers and spreads along the traces */
    circuit: { n: 22, mk: (W, H, init) => { const L = R() < .5; return { t: init ? R() : 0, v: .35 + R() * .5, x0: MX(L ? .27 : .73, W), y0: MY(.22, H), x1: MX(.5 + (R() - .5) * .03, W), y1: MY(.62, H), x2: MX(.15 + R() * .7, W), y2: MY(.6 + R() * .3, H), r: 1.2 + R() * 1.4 }; },
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt; if (p.t >= 2) Object.assign(p, LIVE.circuit.mk(W, H, false));
        const q = p.t < 1 ? p.t : p.t - 1, a = p.t < 1 ? [p.x0, p.y0, p.x1, p.y1] : [p.x1, p.y1, p.x2, p.y2], x = a[0] + (a[2] - a[0]) * q, y = p.t < 1 ? a[1] + (a[3] - a[1]) * q : a[1] + (a[3] - a[1]) * Math.min(1, q * 2);
        glow(c, x, y, p.r * 5, p.t < 1 ? '255,245,220' : '255,190,90', .8 * (1 - (p.t >= 1 ? q * .7 : 0)) * (1 + su * .4)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; c.save(); c.globalCompositeOperation = 'lighter'; glow(c, MX(.5, W), MY(.62, H), Math.min(W, H) * .07 * MS(), '255,230,180', .35 + .2 * Math.sin(st.t * 5) + (st.su || 0) * .3); c.restore(); st.su = Math.max(0, (st.su || 0) - dt * 1.5); },
      hit: (st) => { st.su = 1; } },
    /* NextLab steps 3-4: ribbons of orange and cyan light stream out from his hands across the server hall */
    streams: { n: 14, mk: (W, H, init) => ({ y: MY(.35 + R() * .45, H), amp: 10 + R() * 26, ph: R() * 6.28, sp: .6 + R() * 1, w: 1 + R() * 2.2, col: R() < .6 ? '255,190,100' : '120,220,255', dir: R() < .5 ? -1 : 1 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += p.sp * sp * dt * 2; c.strokeStyle = `rgba(${p.col},${(.22 + su * .25).toFixed(2)})`; c.lineWidth = p.w; c.beginPath();
        const cx = MX(.5, W); for (let i = 0; i <= 24; i++) { const t = i / 24, x = cx + p.dir * t * W * .6, y = p.y + Math.sin(p.ph + t * 7) * p.amp * (.3 + t); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
        const t = (p.ph * .15) % 1, x = cx + p.dir * t * W * .6, y = p.y + Math.sin(p.ph + t * 7) * p.amp * (.3 + t); glow(c, x, y, 6 + su * 4, p.col, .8); } },

    /* NextLab step 5: the shield-globe turns, client nodes on it pulse, light streams pass through; hover lights them all */
    globe: { n: 26, mk: (W, H, init) => ({ lon: R() * 6.283, lat: (R() - .5) * 2.4, v: .25 + R() * .2, r: 1.4 + R() * 1.6, star: R() < .2 }),
      draw: (p, dt, W, H, c, sp, su) => { p.lon += p.v * sp * dt; const cx = MX(.5, W), cy = MY(.5, H), R0 = Math.min(W, H) * .42 * MS(), z = Math.cos(p.lon) * Math.cos(p.lat * .6);
        if (z < -.2) return; const x = cx + Math.sin(p.lon) * Math.cos(p.lat * .6) * R0, y = cy + Math.sin(p.lat * .6) * R0, a = (.35 + z * .5) * (p.star ? 1 : .7) * (1 + su * .6);
        glow(c, x, y, p.r * (p.star ? 7 : 4), p.star ? '255,200,110' : '140,235,255', Math.min(1, a)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.3); const cx = MX(.5, W), cy = MY(.5, H), R0 = Math.min(W, H) * .42 * MS();
        c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(140,235,255,${(.14 + st.su * .2).toFixed(2)})`; c.lineWidth = 1;
        for (let i = 0; i < 3; i++) { const k = Math.cos(st.t * .25 + i * 1.05); c.beginPath(); c.ellipse(cx, cy, Math.abs(k) * R0, R0, 0, 0, 6.283); c.stroke(); } c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* Tripploy step 1: tickets, planes and stamps drift in from the edges and snap into the booking panel */
    tickets: { n: 18, mk: (W, H, init) => { const a = R() * 6.283; return { a, d: init ? R() : 1, v: .18 + R() * .2, s: 5 + R() * 6, k: R() < .5 }; },
      draw: (p, dt, W, H, c, sp, su) => { p.d -= p.v * sp * dt; if (p.d <= 0) Object.assign(p, LIVE.tickets.mk(W, H, false)); const cx = MX(.5, W), cy = MY(.55, H), r = p.d * Math.max(W, H) * .6, x = cx + Math.cos(p.a) * r, y = cy + Math.sin(p.a) * r * .7;
        c.save(); c.translate(x, y); c.rotate(p.a); c.globalAlpha = Math.min(1, (1 - p.d) * 2) * .8; c.strokeStyle = p.k ? 'rgba(130,200,255,.95)' : 'rgba(255,190,100,.95)'; c.lineWidth = 1.2;
        if (p.k) { c.strokeRect(-p.s, -p.s * .55, p.s * 2, p.s * 1.1); } else { c.beginPath(); c.moveTo(p.s, 0); c.lineTo(-p.s, -p.s * .5); c.lineTo(-p.s * .5, 0); c.lineTo(-p.s, p.s * .5); c.closePath(); c.stroke(); } c.restore();
        if (p.d < .08) glow(c, cx, cy, 14 + su * 8, '140,210,255', .5); },
      hit: (st) => { st.su = 1; } },
    /* Tripploy step 2: pulses of light run along the bridges from him out to each university island */
    bridges: { n: 16, mk: (W, H, init) => { const T = [[.14, .4], [.33, .27], [.68, .27], [.87, .4]][(R() * 4) | 0]; return { t: init ? R() : 0, v: .25 + R() * .3, tx: T[0], ty: T[1] }; },
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt; if (p.t >= 1) Object.assign(p, LIVE.bridges.mk(W, H, false)); const sx = .5, sy = .55, mx = (sx + p.tx) / 2, my = Math.min(sy, p.ty) - .08, q = p.t;
        const x = (1 - q) * (1 - q) * sx + 2 * (1 - q) * q * mx + q * q * p.tx, y = (1 - q) * (1 - q) * sy + 2 * (1 - q) * q * my + q * q * p.ty; glow(c, MX(x, W), MY(y, H), 8 + su * 5, '255,215,140', .85); },
      fx: (st, dt, W, H, c) => { st.su = Math.max(0, (st.su || 0) - dt * 1.4); },
      hit: (st) => { st.su = 1; } },
    /* Tripploy step 3: stage beams sway, confetti sparks fall, crowd lights twinkle; hover adds a burst */
    stage: { n: 40, mk: (W, H, init) => R() < .55 ? { k: 0, x: R() * W, y: init ? R() * H * .7 : -6, v: 20 + R() * 30, ph: R() * 6.28, s: 2 + R() * 3 } : { k: 1, x: MX(R(), W), y: MY(.5 + R() * .25, H), ph: R() * 6.28, f: 1 + R() * 3 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.k === 0) { p.y += p.v * sp * dt; p.x += Math.sin(p.ph * 2) * 10 * dt; if (p.y > H * .8) Object.assign(p, LIVE.stage.mk(W, H, false), { k: 0, y: -6 }); c.save(); c.translate(p.x, p.y); c.rotate(p.ph * 3); c.fillStyle = 'rgba(255,190,100,.85)'; c.fillRect(-p.s, -p.s * .4, p.s * 2, p.s * .8); c.restore(); }
        else glow(c, p.x, p.y, 3, '255,230,180', (.3 + .5 * Math.max(0, Math.sin(p.ph * p.f))) * (1 + su)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; c.save(); c.globalCompositeOperation = 'lighter';
        [[.18, 1], [.82, -1]].forEach(([x, d]) => { const a = Math.sin(st.t * .6) * .12 * d, x0 = MX(x, W), len = H * 1.1; c.save(); c.translate(x0, 0); c.rotate(a + d * .35); const g = c.createLinearGradient(0, 0, 0, len); g.addColorStop(0, 'rgba(255,190,110,.22)'); g.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(-6, 0); c.lineTo(6, 0); c.lineTo(70, len); c.lineTo(-70, len); c.fill(); c.restore(); });
        c.restore(); } },
    /* Tripploy step 4: sunlight glints sparkle on the water, seabirds glide, the sun glows */
    sea: { n: 36, mk: (W, H, init) => R() < .85 ? { k: 0, x: MX(R(), W), y: MY(.62 + R() * .25, H), ph: R() * 6.28, f: 1 + R() * 3 } : { k: 1, x: init ? R() * W : -20, y: MY(.15 + R() * .2, H), v: 18 + R() * 20, ph: R() * 6.28, s: 4 + R() * 3 },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp;
        if (p.k === 0) glow(c, p.x, p.y, 3 + su * 2, '255,240,200', Math.max(0, Math.sin(p.ph * p.f)) * .8);
        else { p.x += p.v * sp * dt; if (p.x > W + 20) Object.assign(p, LIVE.sea.mk(W, H, false), { k: 1, x: -20 }); const f = Math.sin(p.ph * 6) * .8; c.strokeStyle = 'rgba(40,40,50,.6)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(p.x - p.s, p.y - f * p.s * .5); c.quadraticCurveTo(p.x - p.s * .3, p.y - p.s * .3, p.x, p.y); c.quadraticCurveTo(p.x + p.s * .3, p.y - p.s * .3, p.x + p.s, p.y - f * p.s * .5); c.stroke(); } },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.3); c.save(); c.globalCompositeOperation = 'lighter'; glow(c, MX(.63, W), MY(.45, H), Math.min(W, H) * .18 * MS(), '255,210,150', .22 + .06 * Math.sin(st.t * 1.5) + st.su * .2); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Team Qreative step 1: sparks peel off the glowing brush stroke, ink flecks fly from the scribble cloud */
    brushline: { n: 40, mk: (W, H, init) => { const q = R(); return R() < .7 ? { k: 0, q, x: MX(.3 + q * .7, W), y: MY(.62 + Math.sin(q * 5) * .08 - q * .12, H), vx: (R() - .3) * 40, vy: -(10 + R() * 30), life: init ? R() : 1, r: .8 + R() * 1.4 } : { k: 1, x: MX(.1 + R() * .2, W), y: MY(.25 + R() * .4, H), vx: -(10 + R() * 30), vy: (R() - .5) * 30, life: init ? R() : 1, s: 1.5 + R() * 2.5 }; },
      draw: (p, dt, W, H, c, sp, su) => { p.life -= dt * .7 * sp; p.x += p.vx * sp * dt; p.y += p.vy * sp * dt; if (p.life <= 0) Object.assign(p, LIVE.brushline.mk(W, H, false));
        if (p.k === 0) glow(c, p.x, p.y, p.r * 4, '255,170,80', p.life * (.8 + su * .2)); else { c.fillStyle = `rgba(10,8,8,${(p.life * .85).toFixed(2)})`; c.beginPath(); c.arc(p.x, p.y, p.s, 0, 6.283); c.fill(); } },
      hit: (st) => { st.su = 1; } },

    /* Team Qreative step 2: dust drifts through the window light, the handed-out scrolls pulse warm */
    dust: { n: 40, mk: (W, H, init) => ({ x: MX(.1 + R() * .85, W), y: init ? R() * H : -4, v: 4 + R() * 9, ph: R() * 6.28, r: .7 + R() * 1.3 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt; p.y += p.v * sp * dt; p.x += Math.sin(p.ph * .6) * 5 * dt; if (p.y > H + 4) Object.assign(p, LIVE.dust.mk(W, H, false)); glow(c, p.x, p.y, p.r * 3.5, '255,210,150', .5 * (.5 + .5 * Math.sin(p.ph * 1.7))); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.3); c.save(); c.globalCompositeOperation = 'lighter';
        [[.08, .82], [.15, .7], [.22, .68], [.28, .62], [.4, .66]].forEach(([x, y], i) => glow(c, MX(x, W), MY(y, H), 14 * MS(), '255,170,80', .22 + .14 * Math.sin(st.t * 2.5 + i) + st.su * .3)); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Team Qreative step 3: paint flecks keep flying in an arc from his raised hand across the canvases */
    paint: { n: 34, mk: (W, H, init) => { const cols = ['255,120,40', '40,190,190', '245,235,215', '20,20,25']; return { t: init ? R() : 0, v: .3 + R() * .4, a0: Math.PI * (1.05 + R() * .3), rr: .22 + R() * .12, col: cols[(R() * 4) | 0], s: 2 + R() * 3, sp: R() * 6.28 }; },
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt; if (p.t >= 1) Object.assign(p, LIVE.paint.mk(W, H, false)); const a = p.a0 - p.t * Math.PI * .9, cx = MX(.55, W), cy = MY(.42, H), r = Math.min(W, H) * p.rr * MS() * 1.6, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * .6;
        c.save(); c.translate(x, y); c.rotate(p.sp + p.t * 6); c.globalAlpha = Math.min(1, (1 - p.t) * 2) * .9; c.fillStyle = `rgb(${p.col})`; c.fillRect(-p.s, -p.s * .5, p.s * 2, p.s); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Banking step 1: the open gate's light breathes, the seal ring on the closed gate turns, motes float */
    gates: { n: 20, mk: (W, H, init) => ({ x: MX(.08 + R() * .2, W), y: MY(.3 + R() * .55, H), ph: R() * 6.28, r: .8 + R() * 1.4 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; p.x += Math.sin(p.ph) * 4 * dt; p.y -= 6 * dt; if (p.y < MY(.25, H)) p.y = MY(.85, H); glow(c, p.x, p.y, p.r * 4, '170,230,255', .5); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.3); c.save(); c.globalCompositeOperation = 'lighter';
        glow(c, MX(.12, W), MY(.55, H), Math.min(W, H) * .2 * MS(), '170,235,255', .18 + .08 * Math.sin(st.t * 1.6) + st.su * .2);
        const cx = MX(.78, W), cy = MY(.47, H), r = Math.min(W, H) * .06 * MS(); c.strokeStyle = 'rgba(120,220,255,.7)'; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, r, st.t, st.t + 1.8); c.stroke(); c.beginPath(); c.arc(cx, cy, r * .65, -st.t * 1.4, -st.t * 1.4 + 2.4); c.stroke(); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Banking step 2: glints run across the hexagon dome, beams from the book shimmer */
    dome: { n: 22, mk: (W, H, init) => ({ a: Math.PI * (1.05 + R() * .9), rr: .55 + R() * .45, ph: R() * 6.28, f: .5 + R() * 1.2 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * sp; const cx = MX(.75, W), cy = MY(.66, H), R0 = Math.min(W, H) * .42 * MS(), x = cx + Math.cos(p.a) * R0 * p.rr, y = cy + Math.sin(p.a) * R0 * p.rr * .95; glow(c, x, y, 6, '150,240,255', Math.max(0, Math.sin(p.ph * p.f)) * (.7 + su * .3)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.3); c.save(); c.globalCompositeOperation = 'lighter'; const bx = MX(.72, W), by = MY(.7, H);
        for (let i = 0; i < 4; i++) { const a = -Math.PI * (.3 + i * .12), l = Math.min(W, H) * .35 * MS(); c.strokeStyle = `rgba(150,240,255,${(.12 + .1 * Math.sin(st.t * 3 + i) + st.su * .2).toFixed(2)})`; c.lineWidth = 1.5; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + Math.cos(a) * l, by + Math.sin(a) * l); c.stroke(); } c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Banking step 3: sparks trail from the key, the console lights up cell by cell as control passes over */
    key: { n: 20, mk: (W, H, init) => ({ x: MX(.56, W), y: MY(.6, H), vx: (R() - .5) * 30, vy: 10 + R() * 25, life: init ? R() : 1, r: .8 + R() * 1.2 }),
      draw: (p, dt, W, H, c, sp, su) => { p.life -= dt * .8 * sp; p.x += p.vx * dt; p.y += p.vy * dt; if (p.life <= 0) Object.assign(p, LIVE.key.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, '160,240,255', p.life * .8); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); const n = 8, k = Math.floor(st.t * 3) % (n + 4); c.save(); c.globalCompositeOperation = 'lighter';
        for (let i = 0; i < n; i++) if (i < k) glow(c, MX(.2 + i * .05, W), MY(.84 + (i % 2) * .04, H), 9 * MS(), '120,230,255', .35); glow(c, MX(.56, W), MY(.6, H), 18 * MS(), '170,240,255', .5 + .2 * Math.sin(st.t * 4)); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* Banking step 4: the scale settles level and sends soft ripples across the floor grid; coins glint in the pans */
    scale: { n: 10, mk: (W, H, init) => ({ pan: R() < .5 ? 0 : 1, ox: (R() - .5) * .05, ph: R() * 6.28 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * 2 * sp; const [x, y] = p.pan ? [.82, .66] : [.49, .7]; glow(c, MX(x + p.ox, W), MY(y, H), 5 * MS(), '255,220,140', Math.max(0, Math.sin(p.ph)) * .8); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0)); st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter'; const cx = MX(.66, W), cy = MY(.84, H);
        for (let i = 0; i < 3; i++) { const k = ((st.t * .35 + i / 3) % 1), r = Math.min(W, H) * (.05 + k * .4) * MS(); c.strokeStyle = `rgba(130,220,255,${((1 - k) * (.45 + st.su * .3)).toFixed(2)})`; c.lineWidth = 1.5; c.beginPath(); c.ellipse(cx, cy, r, r * .22, 0, 0, 6.283); c.stroke(); } c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Playbook step 1: the eight doors brighten one after another, mist rolls across the courtyard floor */
    doors: { n: 16, mk: (W, H, init) => ({ x: init ? R() * W : -60, y: MY(.75 + R() * .22, H), v: 8 + R() * 14, r: 30 + R() * 50 }),
      draw: (p, dt, W, H, c, sp, su) => { p.x += p.v * sp * dt; if (p.x > W + 60) Object.assign(p, LIVE.doors.mk(W, H, false)); glow(c, p.x, p.y, p.r * MS(), '220,245,245', .1); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        const D = [[.07, .4, '235,240,255'], [.2, .45, '120,240,220'], [.36, .33, '255,200,110'], [.45, .33, '200,150,255'], [.6, .4, '150,240,160'], [.73, .4, '255,170,110'], [.9, .42, '160,200,255']], k = Math.floor(st.t * 1.2) % D.length;
        D.forEach(([x, y, col], i) => glow(c, MX(x, W), MY(y, H), 30 * MS(), col, i === k ? .4 : .06 + st.su * .2)); glow(c, MX(.22, W), MY(.41, H), 12 * MS(), '160,255,235', .5 + .2 * Math.sin(st.t * 4)); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Playbook step 2: sparks trail off the needle as it settles in the green, dust drifts in the lamp light */
    dial: { n: 26, mk: (W, H, init) => ({ x: MX(.65, W), y: MY(.59, H), vx: (R() - .2) * 40, vy: -20 - R() * 40, life: init ? R() : 1, r: .6 + R() }),
      draw: (p, dt, W, H, c, sp, su) => { p.life -= dt * .9 * sp; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 25 * dt; if (p.life <= 0) Object.assign(p, LIVE.dial.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, '180,255,170', p.life * .8); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        glow(c, MX(.67, W), MY(.52, H), 40 * MS(), '120,230,120', .18 + .08 * Math.sin(st.t * 2) + st.su * .3); glow(c, MX(.92, W), MY(.42, H), 30 * MS(), '255,200,120', .15 + .05 * Math.sin(st.t * 7)); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Playbook step 3: stepping stones light up in turn along the path, motes fall through the sunbeams */
    stones: { n: 24, mk: (W, H, init) => ({ x: MX(.2 + R() * .6, W), y: init ? R() * H : -4, v: 6 + R() * 10, ph: R() * 6.28, r: .7 + R() }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt; p.y += p.v * sp * dt; p.x += Math.sin(p.ph) * 4 * dt; if (p.y > H) Object.assign(p, LIVE.stones.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, '255,240,190', .45); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        const P = [[.68, .85], [.83, .7], [.85, .6], [.82, .53], [.17, .73], [.25, .77]]; P.forEach(([x, y], i) => { const a = Math.max(0, Math.sin(st.t * 1.6 - i * .9)); glow(c, MX(x, W), MY(y, H), 22 * MS(), '255,220,150', .1 + a * .35 + st.su * .2); }); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Ventures step 1: little planes of light circle the globe on tilted orbits */
    orbits: { n: 7, mk: (W, H, init) => ({ a: R() * 6.28, v: .5 + R() * .5, rx: .17 + R() * .12, ry: .05 + R() * .05, tilt: -.25 + R() * .4 }),
      draw: (p, dt, W, H, c, sp, su) => { p.a += p.v * sp * dt * (1 + su * 2); const cx = MX(.4, W), cy = MY(.53, H), s = MS(), u = Math.cos(p.a) * W * p.rx * s, v = Math.sin(p.a) * W * p.ry * s, x = cx + u * Math.cos(p.tilt) - v * Math.sin(p.tilt), y = cy + u * Math.sin(p.tilt) + v * Math.cos(p.tilt);
        if (Math.sin(p.a) < -.2 && Math.hypot(x - cx, y - cy) < W * .07 * s) return; glow(c, x, y, 6, '150,255,240', .9); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter'; glow(c, MX(.4, W), MY(.53, H), 50 * MS(), '120,240,230', .2 + .08 * Math.sin(st.t * 1.5) + st.su * .3); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* Ventures step 2: coins and chart glints float up from the papers and fly into the book of light */
    ledger: { n: 22, mk: (W, H, init) => ({ t: init ? R() : 0, v: .25 + R() * .3, j: (R() - .5) * .08, gold: R() < .5, r: 1 + R() * 1.4 }),
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt * (1 + su); if (p.t >= 1) Object.assign(p, LIVE.ledger.mk(W, H, false)); const t = p.t, x = MX(.4 + .33 * t + p.j, W), y = MY(.66 - .3 * Math.sin(t * Math.PI * .75) + p.j * .5, H);
        glow(c, x, y, p.r * 4, p.gold ? '255,210,130' : '130,240,240', Math.sin(t * Math.PI) * .85); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter'; glow(c, MX(.73, W), MY(.47, H), 45 * MS(), '120,240,230', .2 + .07 * Math.sin(st.t * 2) + st.su * .3); glow(c, MX(.12, W), MY(.4, H), 40 * MS(), '255,190,120', .12 + .03 * Math.sin(st.t * 9)); c.restore(); },
      hit: (st) => { st.su = 1; } },

    /* Ventures step 3: spreadsheet cells lift off the grid and rise into the glowing chart above his hand */
    cells: { n: 22, mk: (W, H, init) => ({ x0: .05 + R() * .45, y0: .3 + R() * .35, t: init ? R() : 0, v: .2 + R() * .25, s: 2 + R() * 3, warm: R() < .6 }),
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt; if (p.t >= 1) Object.assign(p, LIVE.cells.mk(W, H, false)); const e = p.t * p.t * (3 - 2 * p.t), x = MX(p.x0 + (.5 - p.x0) * e, W), y = MY(p.y0 + (.13 - p.y0) * e, H);
        c.save(); c.globalAlpha = Math.sin(p.t * Math.PI) * .8; c.fillStyle = p.warm ? 'rgb(255,190,130)' : 'rgb(130,240,230)'; c.fillRect(x - p.s, y - p.s * .6, p.s * 2, p.s * 1.2); c.restore(); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter'; glow(c, MX(.53, W), MY(.15, H), 40 * MS(), '255,200,140', .18 + .07 * Math.sin(st.t * 2) + st.su * .3); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* page art: embers rise through the frame (hire file, consulting header, growth track) */
    embers: { n: 24, mk: (W, H, init) => ({ x: R() * W, y: init ? R() * H : H + 6, v: 14 + R() * 26, ph: R() * 6.28, r: .7 + R() * 1.3, life: 1 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * 2; p.y -= p.v * sp * dt; p.x += Math.sin(p.ph) * 8 * dt; if (p.y < -6) Object.assign(p, LIVE.embers.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, '255,150,60', (.45 + .3 * Math.sin(p.ph * 1.7)) * Math.min(1, p.y / H * 2)); } },
    /* page art: product track, wireframe squares drift up and a scan line passes over the build */
    wire: { n: 14, mk: (W, H, init) => ({ x: R() * W, y: init ? R() * H : H + 8, v: 8 + R() * 14, s: 3 + R() * 5, ph: R() * 6.28 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt; p.y -= p.v * sp * dt; if (p.y < -10) Object.assign(p, LIVE.wire.mk(W, H, false)); c.save(); c.strokeStyle = `rgba(147,197,253,${(.35 + .25 * Math.sin(p.ph * 2)).toFixed(2)})`; c.lineWidth = 1; c.strokeRect(p.x - p.s, p.y - p.s, p.s * 2, p.s * 2); c.restore(); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); const y = (st.t * .18 % 1.2 - .1) * H; const g = c.createLinearGradient(0, y - 16, 0, y + 2); g.addColorStop(0, 'rgba(59,130,246,0)'); g.addColorStop(1, 'rgba(147,197,253,.12)'); c.fillStyle = g; c.fillRect(0, y - 16, W, 18); },
      hit: (st) => { st.su = 1; } },
    /* page art: partner bridge, teal motes rise out of the canyon mist, dusk dust drifts */
    motes: { n: 22, mk: (W, H, init) => ({ x: R() * W, y: init ? R() * H : H + 6, v: 6 + R() * 14, ph: R() * 6.28, r: .8 + R() * 1.4, teal: R() < .65 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt; p.y -= p.v * sp * dt; p.x += Math.sin(p.ph) * 6 * dt; if (p.y < -6) Object.assign(p, LIVE.motes.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, p.teal ? '110,240,225' : '255,200,130', .5 * (.6 + .4 * Math.sin(p.ph * 2))); } },
    /* page art: About chapter 1, current runs along circuit traces in right-angle steps */
    circuitry: { n: 12, mk: (W, H, init) => ({ x: R() * W, y: H * (.3 + R() * .7), d: (R() * 4) | 0, k: 0, seg: 20 + R() * 40, life: init ? R() : 1, tr: [] }),
      draw: (p, dt, W, H, c, sp, su) => { const v = 60 * sp * dt, D = [[1, 0], [0, -1], [-1, 0], [0, 1]][p.d]; p.x += D[0] * v; p.y += D[1] * v; p.k += v; if (p.k > p.seg) { p.k = 0; p.seg = 20 + R() * 40; p.d = (p.d + (R() < .5 ? 1 : 3)) % 4; }
        p.tr.push([p.x, p.y]); if (p.tr.length > 14) p.tr.shift(); p.life -= dt * .35 * sp; if (p.life <= 0 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) { Object.assign(p, LIVE.circuitry.mk(W, H, false)); return; }
        c.save(); c.strokeStyle = `rgba(90,230,255,${(.5 * Math.min(1, p.life * 2)).toFixed(2)})`; c.lineWidth = 1.2; c.beginPath(); p.tr.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.restore(); glow(c, p.x, p.y, 5, '140,240,255', .8 * Math.min(1, p.life * 2)); } },

    /* About chapter 2: data points rise slowly in columns, gold and cyan */
    columns: { n: 30, mk: (W, H, init) => ({ x: W * (.06 + ((R() * 7) | 0) * .085) + (R() - .5) * 6, y: init ? R() * H : H + 4, v: 8 + R() * 16, r: .8 + R() * 1.2, gold: R() < .45 }),
      draw: (p, dt, W, H, c, sp, su) => { p.y -= p.v * sp * dt; if (p.y < -4) Object.assign(p, LIVE.columns.mk(W, H, false)); glow(c, p.x, p.y, p.r * 3.5, p.gold ? '255,210,120' : '120,230,255', .55 * Math.min(1, p.y / H * 3)); } },
    /* About chapter 4: birds glide across the dawn sky */
    birds: { n: 5, mk: (W, H, init) => ({ x: init ? R() * W : -20, y: H * (.08 + R() * .3), v: 18 + R() * 22, s: 4 + R() * 4, ph: R() * 6.28, f: 5 + R() * 3 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += p.f * dt; p.x += p.v * sp * dt; p.y += Math.sin(p.ph * .3) * 3 * dt; if (p.x > W + 20) Object.assign(p, LIVE.birds.mk(W, H, false)); const w = Math.sin(p.ph) * p.s * .6;
        c.save(); c.strokeStyle = 'rgba(30,22,20,.75)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(p.x - p.s, p.y - w); c.quadraticCurveTo(p.x - p.s * .4, p.y - w * .3, p.x, p.y); c.quadraticCurveTo(p.x + p.s * .4, p.y - w * .3, p.x + p.s, p.y - w); c.stroke(); c.restore(); } },
    /* Work header, footer, message sent: motes in every door colour drift up */
    prism: { n: 26, mk: (W, H, init) => { const C = ['250,140,60', '110,170,255', '190,140,255', '255,200,110', '110,230,210', '255,110,110', '255,240,220']; return { x: R() * W, y: init ? R() * H : H + 6, v: 6 + R() * 14, ph: R() * 6.28, r: .8 + R() * 1.3, col: C[(R() * C.length) | 0] }; },
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt; p.y -= p.v * sp * dt; p.x += Math.sin(p.ph) * 5 * dt; if (p.y < -6) Object.assign(p, LIVE.prism.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, p.col, .5 * (.6 + .4 * Math.sin(p.ph * 2))); } },

    /* How I work 1: the eight session cards glow in turn, the picked one pulses, embers lift off the table */
    cards: { n: 22, mk: (W, H, init) => ({ x: W * (.08 + R() * .84), y: init ? H * (.5 + R() * .5) : H * .92, v: 10 + R() * 18, ph: R() * 6.28, r: .7 + R() * 1.2 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * 2; p.y -= p.v * sp * dt; p.x += Math.sin(p.ph) * 5 * dt; if (p.y < H * .35) Object.assign(p, LIVE.cards.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, '255,170,80', .5 * Math.min(1, (p.y / H - .35) * 3)); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        const P = [[.2, .58], [.26, .51], [.37, .67], [.48, .7], [.62, .68], [.74, .67], [.82, .58], [.33, .46]], k = Math.floor(st.t * 1.4) % 8;
        P.forEach(([x, y], i) => glow(c, W * x, H * y, 26, '255,190,100', i === 7 ? .3 + .15 * Math.sin(st.t * 4) : i === k ? .32 : .05 + st.su * .2)); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* How I work 2: pulses travel the threads from the pen to the blueprint, the page glints, the lamp flickers */
    threads: { n: 10, mk: (W, H, init) => ({ t: init ? R() : 0, v: .35 + R() * .3, off: (R() - .5) * .06 }),
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt; if (p.t >= 1) Object.assign(p, LIVE.threads.mk(W, H, false)); const t = p.t, x = W * (.6 + .3 * t), y = H * (.45 + .08 * t + Math.sin(t * Math.PI) * -.05 + p.off);
        glow(c, x, y, 6, '255,190,110', Math.sin(t * Math.PI) * .9); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        glow(c, W * .58, H * .22, 50, '255,200,120', .14 + .05 * Math.sin(st.t * 9) + st.su * .2); glow(c, W * .66, H * .43, 10, '255,230,180', .5 + .3 * Math.sin(st.t * 6));
        const gy = H * (.28 + (st.t * .08 % .3)); glow(c, W * .52, gy, 8, '255,220,170', .35); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* How I work 3: orange, blue and gold light keeps flowing along the ribbons into the one braided line */
    braid: { n: 30, mk: (W, H, init) => { const s = (R() * 3) | 0; return { s, t: init ? R() : 0, v: .25 + R() * .25, r: .8 + R() * 1.2 }; },
      draw: (p, dt, W, H, c, sp, su) => { p.t += p.v * sp * dt; if (p.t >= 1) Object.assign(p, LIVE.braid.mk(W, H, false)); const t = p.t; let x, y, col;
        if (p.s === 0) { x = W * (0 + .48 * t); y = H * (.88 - .16 * t); col = '255,150,70'; } else if (p.s === 1) { x = W * (1 - .48 * t); y = H * (.8 - .08 * t); col = '120,190,255'; } else { x = W * (.5 + Math.sin(t * 12) * .02); y = H * (.98 - .32 * t); col = '255,235,190'; }
        glow(c, x, y, p.r * 4, col, Math.sin(t * Math.PI) * .9); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; c.save(); c.globalCompositeOperation = 'lighter'; glow(c, W * .5, H * .64, 30, '255,230,180', .25 + .1 * Math.sin(st.t * 3)); c.restore(); } },
    /* How I work 4: the stepping stones light up toward the gate, the gate breathes, sparks drift into it */
    launch: { n: 18, mk: (W, H, init) => ({ x: W * (.05 + R() * .5), y: init ? R() * H : H + 4, v: 12 + R() * 16, r: .8 + R() }),
      draw: (p, dt, W, H, c, sp, su) => { p.y -= p.v * sp * dt; p.x += (W * .29 - p.x) * .25 * dt; if (p.y < H * .3) Object.assign(p, LIVE.launch.mk(W, H, false)); glow(c, p.x, p.y, p.r * 4, '255,170,80', .55); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt * (1 + (st.su || 0) * 2); st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        glow(c, W * .29, H * .38, 60, '255,160,70', .18 + .07 * Math.sin(st.t * 1.6) + st.su * .2);
        for (let i = 0; i < 6; i++) { const a = Math.max(0, Math.sin(st.t * 2 - i * .7)); glow(c, W * (.27 + i * .006), H * (.95 - i * .065), 22 - i * 2, '255,200,120', a * .3); }
        glow(c, W * .46, H * .52, 12, '255,210,140', .4 + .3 * Math.sin(st.t * 5)); c.restore(); },
      hit: (st) => { st.su = 1; } },
    /* How I work 5: data points twinkle along the graph, the bars glow up to the target, the gauge breathes */
    dash: { n: 12, mk: (W, H, init) => ({ i: (R() * 8) | 0, ph: R() * 6.28, f: 1 + R() * 2 }),
      draw: (p, dt, W, H, c, sp, su) => { p.ph += dt * p.f * sp; const P = [[.66, .39], [.69, .36], [.72, .37], [.75, .32], [.78, .33], [.81, .28], [.84, .3], [.87, .25]], [x, y] = P[p.i]; glow(c, W * x, H * y, 6, '150,240,255', Math.max(0, Math.sin(p.ph)) * .9); },
      fx: (st, dt, W, H, c) => { st.t = (st.t || 0) + dt; st.su = Math.max(0, (st.su || 0) - dt * 1.2); c.save(); c.globalCompositeOperation = 'lighter';
        const g = (Math.sin(st.t * 1.2) + 1) / 2; for (let i = 0; i < 6; i++) glow(c, W * (.47 + i * .033), H * (.6 - g * .1 * (i / 5)), 12, '140,230,255', .15 + st.su * .2);
        glow(c, W * .63, H * .69, 26, '120,255,170', .18 + .08 * Math.sin(st.t * 2)); c.restore(); },
      hit: (st) => { st.su = 1; } },
  };
  /* run a LIVE effect on a canvas while it is on screen; returns {surge()} */
  const runLive = (cv, kind, scale = 1, onClean, hero = false, aspect = null) => {
    const L = LIVE[kind]; if (!L || reduce) return { surge() {} };
    const c = cv.getContext('2d'); const st = { hero }; let W = 0, H = 0, on = false, id = 0, last = 0, su = 0, ps = [];
    const fit = () => { const dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const A = aspect && aspect(); if (A && W && H) { const a = W / H; if (a < A) { st.sx = a / A; st.ox = (1 - st.sx) / 2; st.sy = 1; st.oy = 0; } else { st.sy = A / a; st.oy = (1 - st.sy) / 2; st.sx = 1; st.ox = 0; } } };
    const fr = (t) => { if (!on) return; const dt = Math.min(.05, (t - last) / 1000); last = t; su = Math.max(0, su - dt * 1.4); const sp = 1 + su * 2.6;
      c.clearRect(0, 0, W, H); st0 = st; ps.forEach(p => L.draw(p, dt, W, H, c, sp, su)); if (L.fx) L.fx(st, dt, W, H, c); id = requestAnimationFrame(fr); };
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting && !on) { fit(); if (!ps.length) { st0 = st; ps = Array.from({ length: Math.round(L.n * scale) }, () => L.mk(W, H, true, st)); } on = true; last = performance.now(); id = requestAnimationFrame(fr); } else if (!e.isIntersecting) { on = false; cancelAnimationFrame(id); } });
    ob.observe(cv); const rs = () => { if (on) fit(); }; addEventListener('resize', rs);
    if (onClean) onClean(() => { on = false; cancelAnimationFrame(id); ob.disconnect(); removeEventListener('resize', rs); });
    return { surge() { su = 1; if (L.hit) L.hit(st); } };
  };
  $('#navCases').innerHTML = `<span class="dd-head mono">8 episodes<i></i><span lang="ja">事例</span></span>` + CASES.map((c, i) => `<a role="menuitem" href="#case-${c.slug}" style="--c:var(--cat-${c.cat})"><span class="dd-n mono">${String(i + 1).padStart(2, '0')}</span><span class="dd-t">${c.title}</span><span class="dd-c mono">${CAT[c.cat]}</span></a>`).join('') + `<a class="dd-all" href="#work">All work <svg class="ico"><use href="#i-arrow-right"/></svg></a>`;
  $('#sheetCases').innerHTML = '<div class="shc-in">' + CASES.map((c, i) => `<a href="#case-${c.slug}" style="--c:var(--cat-${c.cat})"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${c.title}</a>`).join('') + '</div>';
  $('#consultGrid').innerHTML = ['apple-gadgets', 'tripploy', 'nextlab'].map((s, i) => card(bySlug[s], i === 0)).join('');
  /* pointer depth: plate drifts against the pointer, figure follows it, so the scene reads in 3D */
  function depth(host, bgEl, fgEl, amp) { if (!fgEl || !fine || reduce) return null;
    const mv = (e) => { const r = host.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      bgEl.style.translate = `${(-nx * amp * .5).toFixed(1)}px ${(-ny * amp * .4).toFixed(1)}px`; fgEl.style.translate = `${(nx * amp).toFixed(1)}px ${(ny * amp * .6).toFixed(1)}px`; };
    const lv = () => { bgEl.style.translate = ''; fgEl.style.translate = ''; };
    host.addEventListener('pointermove', mv); host.addEventListener('pointerleave', lv);
    return () => { host.removeEventListener('pointermove', mv); host.removeEventListener('pointerleave', lv); }; }
  /* page art (hire file, consulting, partner, about): split the picture into plate + figure, add the living layer */
  $$('[data-live] > img[data-lv]').forEach(im => { if (reduce) return; const host = im.parentElement;
    const flat = im.dataset.lv === 'flat'; let fg = null;
    if (!flat) { fg = im.cloneNode(); fg.removeAttribute('data-lv'); fg.alt = ''; fg.setAttribute('aria-hidden', 'true'); fg.classList.add('lv-fg'); fg.src = im.getAttribute('src').replace('.webp', '-fg.webp');
      im.src = im.getAttribute('src').replace('.webp', '-bg.webp'); im.after(fg); }
    const cv = document.createElement('canvas'); cv.className = 'art-live pg-live'; cv.setAttribute('aria-hidden', 'true'); host.appendChild(cv);
    const fx = runLive(cv, host.dataset.live, .8); if (fg && !host.closest('.ct')) depth(host, im, fg, 10);
    (host.closest('.ct, .cf, .tm-stage, .origin-stage, .wr-stage, .art') || host).addEventListener('pointerenter', () => fx.surge()); });
  /* work cards: live layer + hover surge (like the path doors) */
  $$('.case-card[data-live]').forEach(cardEl => {
    if (reduce) return; const media = $('.media', cardEl); if (!media) return;
    const cv = document.createElement('canvas'); cv.className = 'card-live'; cv.setAttribute('aria-hidden', 'true'); media.insertBefore(cv, $('.big', media));
    const fx = runLive(cv, cardEl.dataset.live, .8); depth(cardEl, $('.media img', cardEl), $('.media .lv-fg', cardEl), 14);
    cardEl.addEventListener('pointerenter', () => { fx.surge(); cardEl.classList.add('surge'); setTimeout(() => cardEl.classList.remove('surge'), 420); });
  });

  const renderCase = (c) => {
    const i = CASES.indexOf(c), next = CASES[(i + 1) % CASES.length], ep = String(i + 1).padStart(2, '0');
    const DOORS = { consulting: ['consulting', 'Discuss a consulting engagement'], hire: ['hire', "Let's talk about your team's role"], partner: ['partner', 'Augment your delivery pipeline'] };
    const door = DOORS[c.door || { growth: 'consulting', transformation: 'consulting', product: 'hire', ventures: 'hire' }[c.cat]];
    const STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 14.2 9.8 22.5 12 14.2 14.2 12 22.5 9.8 14.2 1.5 12 9.8 9.8Z" fill="currentColor"/></svg>';
    const num = (v) => { const m = String(v).match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/); return m ? `${m[1]}<span class="cnt" data-to="${m[2]}" data-dec="${(m[2].split('.')[1] || '').length}">${m[2]}</span>${m[3]}` : v; };
    let prob = c.problem || '';
    (c.flare || []).forEach(w => { prob = prob.replace(w, `<span class="fw">${w}</span>`); });
    $('#caseRoot').innerHTML = `
      <header class="case-hero c1" data-cat="${c.cat}"${c.mpos ? ` style="--mpos:${c.mpos}%"` : ''}${c.live ? ` data-live="${c.live}"` : ''}><div class="c1-bg">${lyImgs(c, 'bg', false)}${c.live ? '<canvas class="c1-live" aria-hidden="true"></canvas>' : ''}</div><div class="c1-shade"></div>
        <div class="wrap c1-grid">
          <div class="c1-main">
            <span class="c1-ep" lang="ja" aria-hidden="true">第${ep}話</span>
            <a class="back c1-back" href="#work"><svg class="ico"><use href="#i-arrow-right"/></svg> All work</a>
            <span class="mono c1-eb" style="color:var(--cat-${c.cat})">Case study<i></i>${CAT[c.cat]} · Episode ${i + 1}</span>
            <h1 class="d-l c1-title"><span class="c1-line"><span>${c.title}</span></span></h1>
            <div class="c1-metric"><b>${num(c.big)}</b><span>${c.bigLabel}</span></div>
          </div>
          <dl class="c1-hud"><span class="corner tl"></span><span class="corner br"></span>
            <div><dt>Role</dt><dd>${c.role}</dd></div>
            <div><dt>Timeline</dt><dd>${c.period}</dd></div>
            <div><dt>Team size</dt><dd>${c.team || T('team size')}</dd></div>
            <div><dt>Engagement</dt><dd>${CAT[c.cat]}</dd></div>
          </dl>
        </div>
      </header>
      <section class="sec c2"><div class="wrap c2-grid">
        <div class="c2-text"><span class="c-eb mono">01 / Context</span><p class="lede">${c.context}</p></div>
        <aside class="c2-side"><span class="mono">Category</span><b>${CAT[c.cat]}</b><span class="mono">When</span><b>${c.period}</b></aside>
      </div></section>
      <section class="c3" aria-label="The problem"><canvas class="c3-ash" aria-hidden="true"></canvas><div class="c3-fog" aria-hidden="true"></div><div class="c3-vig" aria-hidden="true"></div>
        <div class="wrap c3-in"><span class="c-eb mono c3-eb">02 / The bottleneck<i></i><span lang="ja">課題</span></span>
          <blockquote class="c3-q">${c.problem ? prob : T('the core problem, in one or two lines')}</blockquote></div>
      </section>
      <section class="sec c4"><div class="wrap"><span class="c-eb mono">03 / Ownership</span>
        <div class="c4-grid">
          <div class="c4-own"><span class="corner tl"></span><span class="corner br"></span><span class="c4-floor" aria-hidden="true"></span><img class="c4-cameo" src="img/p3.webp" alt="" aria-hidden="true">
            <div class="c4-h"><h3>What I owned</h3><span class="mono">Lead</span></div>
            <ul class="c4-list">${c.owned.map(x => `<li>${STAR}<span>${x}</span></li>`).join('')}</ul></div>
          <div class="c4-team"><div class="c4-h"><h3>What the team did</h3><span class="mono">Collaboration</span></div>
            ${c.teamDid ? `<ul class="c4-list dim">${c.teamDid.map(x => `<li><i></i><span>${x}</span></li>`).join('')}</ul>` : `<p>${T('team contribution')}</p>`}</div>
        </div></div></section>
      <section class="sec" style="padding-top:0"><div class="wrap"><span class="c-eb mono">04 / Execution</span><h2 class="h2" style="margin-bottom:48px">Approach</h2>
        <div class="steps2" id="caseSteps"><svg class="steps-line" aria-hidden="true"><path class="base"/><path class="ink" filter="url(#rough)"/></svg>
          ${c.steps.map((st, k) => `<div class="st2${k % 2 ? ' flip' : ''}"><i class="st2-node" aria-hidden="true"></i><div class="st2-t"><span class="n">Step ${k + 1}</span><h3>${st[0]}</h3><p>${st[1] || T('what you did here')}</p></div><figure class="st2-art" data-title="Step ${k + 1} · ${st[0]}"${c.art && c.art[k] ? ` data-live="${c.art[k].live}"` : ''}><span class="corner tl"></span><span class="corner br"></span>${c.art && c.art[k] ? `<div class="st2-img has-art">${lyImgs(c.art[k])}<canvas class="art-live" aria-hidden="true"></canvas></div><span class="art-badge mono">0${k + 1}</span>` : `<div class="st2-img"><span class="art-k">0${k + 1}</span><span class="art-t">To add: step artifact</span></div>`}</figure></div>`).join('')}
        </div></div></section>
      <section class="sec results c6"><canvas class="c6-embers" aria-hidden="true"></canvas><div class="wrap"><span class="c-eb mono">05 / Payoff</span><h2 class="h2" style="margin-bottom:48px">Results</h2>
        <div class="results-grid">${c.results.map(r => `<div class="stat c6-card"><div class="num">${num(r[0])}</div><p>${r[1]}</p></div>`).join('')}</div></div></section>
      <section class="sec c7"><div class="wrap"><div class="c7-card"><span class="c-eb mono">06 / Retrospective<i></i><span lang="ja">反省</span></span><h2 class="h2">What I'd do differently</h2><div class="c7-body"><p class="body-copy">${c.lessons || T('two or three honest lessons')}</p></div></div></div></section>
      <section class="sec c8" style="padding-top:0"><div class="wrap c8-grid">
        <a class="next-case frame c8-next" href="#case-${next.slug}"><img src="${next.img}" alt=""><span class="mono c8-eb">Next episode<i></i><span lang="ja">次の話</span></span><h2 class="h2">${next.title}</h2><span class="link">Read the case <svg class="ico"><use href="#i-arrow-right"/></svg></span></a>
        <div><span class="signal c8-sig"><a class="btn btn-primary sig-go c8-go" href="#contact" data-intent="${door[0]}">${STAR}${door[1]} <svg class="ico"><use href="#i-arrow-right"/></svg></a></span></div>
      </div></section>`;
  };

  /* ---------------- hero frame scrub ---------------- */
  const FRAMES = 120, imgs = new Array(FRAMES);
  let lastFrame = -1, heroReady = false;
  const canvas = $('#heroCanvas'), ctx = canvas.getContext('2d');
  const pad = (n) => String(n).padStart(3, '0');
  const poster = $('#heroPoster');
  // where the frame sits inside the canvas (shared by the canvas draw and the static poster beneath it)
  const placePoster = () => { if (!poster || poster.style.visibility === 'hidden') return; const cw = canvas.clientWidth, ch = canvas.clientHeight; if (!cw) return;
    const iw = poster.naturalWidth || 1280, ih = poster.naturalHeight || 720, sc = Math.max(cw / iw, ch / ih) * 1.16, dw = iw * sc, dh = ih * sc;
    Object.assign(poster.style, { width: dw + 'px', height: dh + 'px', left: Math.min(0, Math.max(cw - dw, cw * .66 - dw * .5)) + 'px', top: Math.max(ch - dh, -dh * .03) + 'px' }); };
  if (poster) poster.addEventListener('load', placePoster);
  const sizeCanvas = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr); canvas.height = Math.round(canvas.clientHeight * dpr);
    placePoster(); lastFrame = -1; drawFrame(curFrame);
  };
  let curFrame = 0;
  function drawFrame(i) {
    curFrame = i;
    let img = imgs[i];
    if (!img || !img.complete || !img.naturalWidth) { for (let k = i; k >= 0; k--) { if (imgs[k] && imgs[k].complete && imgs[k].naturalWidth) { img = imgs[k]; break; } } }
    if (!img || i === lastFrame) return;
    lastFrame = i;
    const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
    const mobile = canvas.clientWidth < 768;
    const s = Math.max(cw / iw, ch / ih) * (mobile ? 1.12 : 1.16);
    const dw = iw * s, dh = ih * s;
    // desktop: push the avatar right of the copy column; mobile: avatar centred above the copy
    const dx = mobile ? cw * 0.5 - dw * 0.5 : Math.min(0, Math.max(cw - dw, cw * 0.66 - dw * 0.5));
    const dy = mobile ? Math.min(0, ch * 0.32 - dh * 0.32) : Math.max(ch - dh, -dh * 0.03);
    ctx.drawImage(img, dx, dy, dw, dh);
    if (!canvas.classList.contains('drawn')) { canvas.classList.add('drawn'); if (poster) setTimeout(() => { poster.style.visibility = 'hidden'; }, reduce ? 0 : 420); }
  }
  const loadFrames = () => {
    const order = [];
    for (let i = 0; i < FRAMES; i += 8) order.push(i);
    for (let i = 0; i < FRAMES; i++) if (!order.includes(i)) order.push(i);
    order.forEach((i, n) => {
      const im = new Image(); im.decoding = 'async';
      im.onload = () => { if (i === 0 || (i <= curFrame && !heroReady)) { heroReady = i === 0 || heroReady; lastFrame = -1; drawFrame(curFrame); } };
      setTimeout(() => { im.src = `frames/f${pad(i + 1)}.webp`; }, n < 15 ? 0 : 60 + n * 8);
      imgs[i] = im;
    });
  };
  loadFrames();
  addEventListener('resize', () => { if (!$('[data-page="home"]').hidden) sizeCanvas(); }, { passive: true });

  /* scroll-scrubbed video background for a page hero: frames on desktop (pinned), clip once on phones, still frame for reduced motion */
  function vidBg(hero, base, mp4, still, triggers, cleanups, opt = {}) {
    const FX = opt.fx || .62;
    const cv = $('.vb-cv', hero), poster = $('.ab-poster', hero), v = $('.vb-v', hero);
    if (reduce) { poster.src = still; return; }
    if (hasGsap && innerWidth >= 768) {
      hero.classList.add('vscrub');
      const AF = 120, PER = 10, NS = AF / PER, x = cv.getContext('2d'), sheets = new Array(NS); let last = -1, cur = 0;
      const ok = (im) => im && im.complete && im.naturalWidth;
      const draw = (i) => { cur = i; let f = i;
        if (!ok(sheets[Math.floor(f / PER)])) { f = -1; for (let k = i; k >= 0; k--) if (ok(sheets[Math.floor(k / PER)])) { f = k; break; } }
        if (f < 0 || f === last) return; last = f; const sh = sheets[Math.floor(f / PER)];
        const iw = sh.naturalWidth, ih = sh.naturalHeight / PER, cw = cv.width, ch = cv.height, sc = Math.max(cw / iw, ch / ih) * 1.15, dw = iw * sc, dh = ih * sc;
        const dx = Math.min(opt.fx ? cw * .5 : 0, Math.max(cw - dw, cw * FX - dw * .5)), dy = Math.min(0, Math.max(ch - dh, (ch - dh) * .4)), sy = (f % PER) * ih;
        if (dx > 0) x.drawImage(sh, 0, sy, 3, ih, 0, dy, dx + 2, dh);
        x.drawImage(sh, 0, sy, iw, ih, dx, dy, dw, dh); cv.classList.add('drawn'); };
      const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(cv.clientWidth * dpr); cv.height = Math.round(cv.clientHeight * dpr); last = -1; draw(cur); };
      for (let k = 0; k < NS; k++) { const im = new Image(); im.decoding = 'async'; im.onload = () => { last = -1; draw(cur); };
        setTimeout(() => { im.src = `${base}${String(k + 1).padStart(2, '0')}.webp`; }, k < 3 ? 0 : 120 * k); sheets[k] = im; }
      requestAnimationFrame(size); addEventListener('resize', size, { passive: true }); cleanups.push(() => removeEventListener('resize', size));
      triggers.push(ScrollTrigger.create({ trigger: hero, start: 'top top', end: '+=170%', pin: true, scrub: true, anticipatePin: 1,
        onUpdate: (s) => { draw(Math.min(AF - 1, Math.floor(s.progress * AF))); if (opt.onP) opt.onP(s.progress); } }));
      if (opt.onP) opt.onP(0);
    } else {
      v.src = mp4; v.muted = true; v.addEventListener('playing', () => v.classList.add('on'), { once: true });
      const pl = v.play(); if (pl && pl.catch) pl.catch(() => {}); cleanups.push(() => v.pause());
    }
  }
  /* ---------------- small motion helpers ---------------- */
  const io = (els, fn, opts = { threshold: 0.35 }) => {
    const ob = new IntersectionObserver((ents) => ents.forEach(e => { if (e.isIntersecting) { fn(e.target); ob.unobserve(e.target); } }), opts);
    els.forEach(el => ob.observe(el)); return ob;
  };
  let revealBase = 120, lenis = null, quietUntil = 0;
  const reveal = (root) => {
    const lines = $$('.rv', root);
    if (reduce) { lines.forEach(l => l.classList.add('in')); return; }
    const above = lines.filter(l => l.getBoundingClientRect().top < innerHeight * 0.9);
    above.forEach((l, k) => setTimeout(() => { l.classList.add('in'); if (l.querySelector('.accent') && root.dataset.page !== 'work') setTimeout(() => burst(l.querySelector('.accent')), 620); }, revealBase + k * 110));
    lines.filter(l => !above.includes(l)).forEach(l => l.classList.add('in', 'now')); // below the fold: visible at rest
  };
  function burst(el) {
    if (reduce || !el || !el.animate) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    for (let k = 0; k < 12; k++) {
      const p = document.createElement('i');
      const sz = 3 + Math.random() * 4;
      p.style.cssText = `position:fixed;left:${r.right - 8}px;top:${r.top + r.height * 0.45}px;width:${sz}px;height:${sz}px;background:${k % 3 ? '#FA7402' : '#FCA03A'};pointer-events:none;z-index:40;transform:rotate(45deg)`;
      document.body.appendChild(p);
      const a = (Math.random() * 1.6 - 0.8) - Math.PI / 2 + (Math.random() > .5 ? 0.9 : -0.2), d = 40 + Math.random() * 70;
      p.animate([{ transform: 'translate(0,0) rotate(45deg)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) rotate(45deg) scale(.3)`, opacity: 0 }], { duration: 520 + Math.random() * 260, easing: 'cubic-bezier(.23,1,.32,1)' }).onfinish = () => p.remove();
    }
  }
  const countUp = (root) => io($$('[data-count]', root), (el) => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    if (reduce) { el.textContent = to.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1200;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4); el.textContent = (to * e).toFixed(dec); if (p < 1) requestAnimationFrame(step); };
    el.textContent = (0).toFixed(dec); requestAnimationFrame(step);
  }, { threshold: 0.6 });

  // embers in closing scenes, paused off-screen
  const embers = (cv) => {
    if (reduce) return;
    const c = cv.getContext('2d'); let w, h, run = false, parts = [];
    const fit = () => { w = cv.width = cv.clientWidth; h = cv.height = cv.clientHeight; };
    const spawn = () => ({ x: Math.random() * w, y: h + 10, v: .3 + Math.random() * .7, s: 1 + Math.random() * 2.2, d: Math.random() * 2 - 1, a: .4 + Math.random() * .5 });
    const tick = () => { if (!run) return; c.clearRect(0, 0, w, h); if (parts.length < 34) parts.push(spawn());
      parts.forEach(p => { p.y -= p.v; p.x += Math.sin(p.y / 60) * .3 + p.d * .15; p.a -= .0016; c.fillStyle = `rgba(250,${120 + (p.s * 20 | 0)},20,${Math.max(p.a, 0)})`; c.fillRect(p.x, p.y, p.s, p.s); });
      parts = parts.filter(p => p.a > 0 && p.y > -10); requestAnimationFrame(tick); };
    new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) { fit(); tick(); } }).observe(cv);
  };

  /* ---------------- per-page setup ---------------- */
  let triggers = [], cleanups = [];
  const killPage = () => { triggers.forEach(t => t.kill()); triggers = []; cleanups.forEach(f => f()); cleanups = []; };

  /* ---------------- springs, loops, fx overlay, cursors ---------------- */
  const spring = (k = 200, d = 15) => { const s = { x: 0, v: 0, t: 0 }; s.step = (dt) => { const f = -k * (s.x - s.t) - d * s.v; s.v += f * dt; s.x += s.v * dt; return Math.abs(s.v) > .01 || Math.abs(s.x - s.t) > .01; }; return s; };
  const loop = (fn) => { let on = true, last = performance.now(), id = 0; const t = (n) => { if (!on) return; const dt = Math.min(.032, (n - last) / 1000); last = n; fn(dt); id = requestAnimationFrame(t); }; id = requestAnimationFrame(t); return () => { on = false; cancelAnimationFrame(id); }; };
  const fx = document.createElement('canvas'); fx.id = 'fx'; fx.setAttribute('aria-hidden', 'true'); document.body.appendChild(fx);
  const fctx = fx.getContext('2d'); let fparts = [], fxRun = false;
  const fxFit = () => { const dpr = Math.min(devicePixelRatio || 1, 2); fx.width = innerWidth * dpr; fx.height = innerHeight * dpr; fctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  fxFit(); addEventListener('resize', fxFit, { passive: true });
  function fxBurst(x, y, n = 12, dist = 40, dur = 450) {
    if (reduce || performance.now() < quietUntil) return;
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, sp = dist * 4.7 * (.75 + Math.random() * .5); fparts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, dur: dur * (.8 + Math.random() * .4), s: 2 + Math.random() * 2.6 }); }
    if (fxRun) return; fxRun = true; let last = performance.now();
    const t = (now) => { const dt = Math.min(.032, (now - last) / 1000); last = now; fctx.clearRect(0, 0, innerWidth, innerHeight);
      const drag = Math.pow(.02, dt);
      fparts.forEach(p => { p.life += dt * 1000; p.vx *= drag; p.vy = p.vy * drag + 160 * dt; p.x += p.vx * dt; p.y += p.vy * dt; const al = Math.max(0, 1 - p.life / p.dur);
        fctx.fillStyle = `rgba(250,${110 + (p.s * 25 | 0)},20,${al})`; fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(.785); fctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); fctx.restore(); });
      fparts = fparts.filter(p => p.life < p.dur);
      if (fparts.length) requestAnimationFrame(t); else { fxRun = false; fctx.clearRect(0, 0, innerWidth, innerHeight); } };
    requestAnimationFrame(t);
  }
  const viewCursor = document.createElement('div'); viewCursor.className = 'view-cursor'; viewCursor.setAttribute('aria-hidden', 'true'); viewCursor.innerHTML = '<span>View</span>'; document.body.appendChild(viewCursor);
  const trail = document.createElement('div'); trail.className = 'trail'; trail.setAttribute('aria-hidden', 'true'); trail.innerHTML = '<img alt="" src="img/p2.webp">'; document.body.appendChild(trail);
  // magnetic pull using the CSS translate property so it composes with entrance transforms
  function magnet(el, { radius = 60, max = 8, k = 200, d = 15, keep = false } = {}) {
    if (!fine || reduce || !el) return;
    const sx = spring(k, d), sy = spring(k, d);
    const mv = (e) => { const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy;
      const near = Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;
      sx.t = near ? Math.max(-max, Math.min(max, dx * .2)) : 0; sy.t = near ? Math.max(-max, Math.min(max, dy * .3)) : 0; };
    addEventListener('pointermove', mv, { passive: true });
    const stop = loop((dt) => { const a = sx.step(dt), b = sy.step(dt); if (a || b) el.style.translate = `${sx.x.toFixed(2)}px ${sy.x.toFixed(2)}px`; });
    if (!keep) cleanups.push(() => { removeEventListener('pointermove', mv); stop(); el.style.translate = ''; });
  }

  // a hand-drawn vertical brush path through node centres
  const wobble = (x, ys) => { if (!ys.length) return ''; let d = `M${x} ${ys[0].toFixed(1)}`; for (let k = 1; k < ys.length; k++) { const a = ys[k - 1], b = ys[k], m = (b - a) / 3, w = k % 2 ? 2.2 : -2.2; d += ` C${(x + w).toFixed(1)} ${(a + m).toFixed(1)} ${(x - w).toFixed(1)} ${(b - m).toFixed(1)} ${x} ${b.toFixed(1)}`; } return d; };
  // deliverable inspection lightbox with zoom
  const lb = $('#lightbox'), lbDoc = $('#lbDoc'); let lbZ = 1, lbFrom = null;
  lb.style.backdropFilter = 'blur(16px)';
  const setZ = (z) => { lbZ = Math.max(.5, Math.min(2.5, Math.round(z * 4) / 4)); lbDoc.style.setProperty('--z', lbZ); $('#lbZ').textContent = Math.round(lbZ * 100) + '%'; };
  let lbList = [], lbI = 0;
  const fillDoc = (d) => { lbFrom = d; lbDoc.innerHTML = ''; const c = d.cloneNode(true); c.removeAttribute('style'); c.tabIndex = -1; c.removeAttribute('aria-label'); lbDoc.appendChild(c); $('#lbTitle').textContent = d.dataset.title || $('.doc-head .mono', d).textContent; };
  function openDoc(d, list) {
    lbList = list || $$('.doc', d.parentElement); lbI = lbList.indexOf(d); fillDoc(d); setZ(1); lb.hidden = false; if (lenis) lenis.stop();
    if (!reduce) { lb.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
      const a = d.getBoundingClientRect(), bx = lbDoc.getBoundingClientRect(), sc = a.width / Math.max(1, bx.width);
      lbDoc.animate([{ transform: `translate(${(a.left + a.width / 2 - (bx.left + bx.width / 2)).toFixed(1)}px,${(a.top - bx.top).toFixed(1)}px) scale(${sc.toFixed(3)})` }, { transform: 'scale(1)' }], { duration: 350, easing: 'cubic-bezier(.23,1,.32,1)' }); }
    $('#lbX').focus(); }
  const flip = (dir) => { if (!lbList.length || lb.hidden) return; lbI = (lbI + dir + lbList.length) % lbList.length; fillDoc(lbList[lbI]);
    if (!reduce) { lbDoc.classList.remove('wipe-in'); void lbDoc.offsetWidth; lbDoc.classList.add('wipe-in'); } };
  $('#lbPrev').onclick = () => flip(-1); $('#lbNext').onclick = () => flip(1);
  addEventListener('keydown', (e) => { if (lb.hidden) return; if (e.key === 'ArrowRight') flip(1); if (e.key === 'ArrowLeft') flip(-1); });
  let swX = null; lb.addEventListener('pointerdown', (e) => { swX = e.clientX; }); lb.addEventListener('pointerup', (e) => { if (swX !== null && Math.abs(e.clientX - swX) > 60) flip(e.clientX < swX ? 1 : -1); swX = null; });
  let lbClosing = false;
  const closeDoc = () => {
    if (lb.hidden || lbClosing) return; lbClosing = true; if (lenis) lenis.start();
    const src = lbList[lbI] || lbFrom;
    const done = () => { lb.hidden = true; lbClosing = false; lb.getAnimations().forEach(a => a.cancel()); lbDoc.getAnimations().forEach(a => a.cancel()); if (src) src.focus({ preventScroll: true }); };
    if (reduce || !src) { lb.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' }).onfinish = done; return; }
    const a = src.getBoundingClientRect(), bx = lbDoc.getBoundingClientRect(), sc = a.width / Math.max(1, bx.width) * lbZ;
    lbDoc.animate([{ transform: `scale(${lbZ})`, opacity: 1 }, { transform: `translate(${(a.left + a.width / 2 - (bx.left + bx.width / 2)).toFixed(1)}px,${(a.top - bx.top).toFixed(1)}px) scale(${sc.toFixed(3)})`, opacity: .2 }], { duration: 250, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' });
    lb.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: 50, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' }).onfinish = done;
  };
  /* OP-04 placeholder CTAs: press + pop tag so they never read as broken links */
  const phTip = document.createElement('span'); phTip.className = 'ph-tip mono'; phTip.setAttribute('role', 'status'); document.body.appendChild(phTip); let phT = 0;
  const phFire = (btn) => { if (!reduce) btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)', offset: .5 }, { transform: 'scale(1)' }], { duration: 240, easing: 'cubic-bezier(.23,1,.32,1)' });
    const r = btn.getBoundingClientRect(); phTip.textContent = `[ ${btn.dataset.tip} ]`; phTip.style.left = (r.left + r.width / 2) + 'px'; phTip.style.top = (r.top - 10) + 'px';
    clearTimeout(phT); phTip.getAnimations().forEach(a => a.cancel()); phTip.classList.add('on');
    if (!reduce) phTip.animate([{ opacity: 0, transform: 'translate(-50%,-100%) translateY(4px) scale(.96)' }, { opacity: 1, transform: 'translate(-50%,-100%) scale(1)' }], { duration: 150, delay: 120, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards' });
    phT = setTimeout(() => { const out = phTip.animate([{ opacity: 1, transform: 'translate(-50%,-100%)' }, { opacity: 0, transform: 'translate(-50%,-100%) translateY(4px)' }], { duration: reduce ? 1 : 120, easing: 'ease-out', fill: 'forwards' }); out.onfinish = () => { phTip.classList.remove('on'); out.cancel(); }; }, 1600); };
  $$('.ph').forEach(btn => { btn.addEventListener('click', () => phFire(btn)); btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); phFire(btn); } }); });
  addEventListener('scroll', () => { if (phTip.classList.contains('on')) { phTip.classList.remove('on'); clearTimeout(phT); } }, { passive: true });
  $('#lbIn').onclick = () => setZ(lbZ + .25); $('#lbOut').onclick = () => setZ(lbZ - .25); $('#lbX').onclick = closeDoc;
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.id === 'lbView') closeDoc(); });
  addEventListener('keydown', (e) => { if (lb.hidden) return; if (e.key === 'Escape') closeDoc(); if (e.key === '+' || e.key === '=') setZ(lbZ + .25); if (e.key === '-') setZ(lbZ - .25); });

  const SETUP = {
    home(root) {
      const mobile = innerWidth < 768, desk = innerWidth >= 1024;
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)';
      const copy = $('#heroCopy'), badge = $('.hero-badge', root), name1 = $('.clipline>span', root);
      const rah = $('#rahman'), rt = $('#rahman text'), surge = $('#heroSurge'), flash = $('#heroFlash'), cue = $('#scrollCue');
      const fitRahman = () => { try { const b = rt.getBBox(); if (b.width) { const cap = 150 * .86, top = 128 - cap - 4, hgt = cap + 10; rah.setAttribute('viewBox', `${b.x - 4} ${top} ${b.width + 14} ${hgt}`); rah.style.height = (hgt / 150).toFixed(3) + 'em'; } } catch (e) {} };
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(fitRahman);

      /* ---- H1 hero ---- */
      if (reduce) {
        if (!mobile) { requestAnimationFrame(() => { sizeCanvas(); drawFrame(FRAMES - 1); }); }
        else { $('#heroVideo').poster = 'img/hero-m-poster.webp'; }
      } else {
        badge.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: revealBase - 120, easing: EO, fill: 'both' });
        name1.animate([{ clipPath: 'inset(-10% 100% -10% 0)' }, { clipPath: 'inset(-10% -6% -10% 0)' }], { duration: 600, delay: revealBase, easing: EB, fill: 'both' });
      }
      if (mobile && !reduce) {
        const v = $('#heroVideo'); v.src = 'img/hero-m.mp4'; v.muted = true; v.loop = false;
        const pl = v.play(); if (pl && pl.catch) pl.catch(() => { v.poster = 'img/hero-m-poster.webp'; });
        cleanups.push(() => { v.pause(); });
        io([cue], () => {}, {}); // cue stays; hides on first scroll below
        const hideCue = () => { if (scrollY > 40) { cue.classList.add('gone'); removeEventListener('scroll', hideCue); } };
        addEventListener('scroll', hideCue, { passive: true }); cleanups.push(() => removeEventListener('scroll', hideCue));
      }
      if (!mobile && !reduce && hasGsap) {
        requestAnimationFrame(sizeCanvas);
        let flashed = false, burst40 = false, p = 0;
        const cl = (v) => Math.min(1, Math.max(0, v)), stats = $('#heroStats'), statB = $$('b', stats);
        const update = (pr) => {
          p = pr;
          drawFrame(Math.min(FRAMES - 1, Math.max(0, Math.floor(p * FRAMES))));
          // 20-40%: RAHMAN paints with the ember stroke, then fills; burst exactly at 40%
          const rp = cl((p - .2) / .2);
          rt.style.strokeDashoffset = (2400 * (1 - rp)).toFixed(0); rt.style.fillOpacity = cl((rp - .65) / .35).toFixed(3);
          if (p >= .4 && !burst40) { burst40 = true; const bb = rah.getBoundingClientRect(); fxBurst(bb.right - 4, bb.top + bb.height * .58, 12, 45, 450); } else if (p < .37) burst40 = false;
          // 40-60%: subline + CTAs
          copy.classList.toggle('late', p >= .4 || (copy.classList.contains('late') && p >= .36));
          // 60-80%: stat strip rises, counters scrub to their final values
          const si = cl((p - .58) / .06), sp = cl((p - .6) / .2), out = cl((p - .95) / .05), oe = out * out;
          stats.style.opacity = (si * (1 - out)).toFixed(3); stats.style.transform = `translateY(${(30 * (1 - si) - 80 * oe).toFixed(1)}px)`;
          statB.forEach(b => { const to = +b.dataset.to, dec = +(b.dataset.dec || 0); b.textContent = (to * (1 - Math.pow(1 - sp, 3))).toFixed(dec); });
          // 80-95%: glyph ring flares with a blooming blur
          const sg = cl((p - .8) / .15); surge.style.opacity = sg.toFixed(3); surge.style.filter = `blur(${(sg * 14).toFixed(1)}px)`;
          // 95-100%: radial flash, text accelerates up and out, then unpin
          const lift = stats.offsetHeight + 28; copy.style.transform = `translateY(${(-lift * (1 - Math.pow(1 - si, 3)) - 80 * oe).toFixed(1)}px)`; copy.style.opacity = String(1 - out);
          if (p >= .95 && !flashed) { flashed = true; flash.animate([{ opacity: .85 }, { opacity: 0 }], { duration: 300, easing: 'ease-out' }); }
          else if (p < .9) flashed = false;
          cue.classList.toggle('gone', p > .05);
        };
        const st = ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom bottom', onUpdate: (s) => update(s.progress) });
        triggers.push(st); update(st.progress || 0);
        // fire and particles rise from 25%
        const ec = $('#heroEmbers'), ex = ec.getContext('2d'); let parts = [], w = 0, h = 0;
        const fit = () => { w = ec.width = ec.clientWidth; h = ec.height = ec.clientHeight; }; fit();
        addEventListener('resize', fit); cleanups.push(() => removeEventListener('resize', fit));
        cleanups.push(loop((dt) => {
          if (scrollY > innerHeight * 4.2) return;
          const rate = Math.min(1, Math.max(0, (p - .4) / .2)) * (p < .97 ? 1 : 0);
          if (Math.random() < rate * .9 && parts.length < 90) parts.push({ x: w * (.35 + Math.random() * .65), y: h + 8, v: 40 + Math.random() * 90, s: 1.2 + Math.random() * 2.6, ph: Math.random() * 6, a: .5 + Math.random() * .45 });
          ex.clearRect(0, 0, w, h);
          parts.forEach(q => { q.y -= q.v * dt; q.ph += dt * 2; q.x += Math.sin(q.ph) * 12 * dt; q.a -= dt * .32; ex.fillStyle = `rgba(252,${120 + (q.s * 22 | 0)},30,${Math.max(q.a, 0)})`; ex.fillRect(q.x, q.y, q.s, q.s); });
          parts = parts.filter(q => q.a > 0 && q.y > -10);
        }));
      }
      $$('#heroCopy .mag').forEach(m => magnet(m, { radius: 60, max: 8, k: 200, d: 15 }));

      /* ---- H2 doors: entrance, idle elements, depth hover, themed door-open ---- */
      const doors = $$('.door', root);
      const DS = doors.map((door, idx) => {
        const box = $('.door-img', door), cv = $('.door-cv', box), fxc = $('.door-fx', box);
        return { door, idx, form: door.dataset.form, inr: $('.door-in', door), box, cv, c: cv.getContext('2d'), fxc, f: fxc.getContext('2d'), ring: $('.door-ring', box), body: $('.door-body', door),
          seal: $('.door-seal', box), k: $('.k', box), zap: $('.door-zap', door), range: box.dataset.range.split(',').map(Number),
          fr: +box.dataset.range.split(',')[0], dir: 1, acc: 0, vis: false, summoned: false, hover: 0, parts: [], puffs: [], arcs: [], nextArc: 0, flash: 0, w: 0, h: 0, t: Math.random() * 10, lastDrawn: -1,
          rx: spring(180, 18), ry: spring(180, 18), ly: spring(180, 18), px: spring(180, 18), py: spring(180, 18) };
      });
      const fitDoor = (st) => { const dpr = Math.min(devicePixelRatio || 1, 2); st.w = st.box.clientWidth; st.h = st.box.clientHeight;
        [st.cv, st.fxc].forEach(x => { x.width = Math.round(st.w * dpr); x.height = Math.round(st.h * dpr); }); st.c.setTransform(dpr, 0, 0, dpr, 0, 0); st.f.setTransform(dpr, 0, 0, dpr, 0, 0); st.lastDrawn = -1; };
      DS.forEach(fitDoor);
      const onRs = () => DS.forEach(fitDoor); addEventListener('resize', onRs); cleanups.push(() => removeEventListener('resize', onRs));
      function puff(st, n) { for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (Math.random() - .5) * 2.6, sp = 40 + Math.random() * 120;
        st.puffs.push({ x: st.w / 2 + (Math.random() - .5) * st.w * .35, y: st.h - 18, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .8, r: 8 + Math.random() * 14, life: 0, dur: 700 + Math.random() * 600 }); } }
      const summon = (st) => {
        if (st.summoned) return; st.summoned = true;
        if (reduce) { st.box.classList.add('summoned'); return; }
        st.seal.animate([{ opacity: 0, transform: 'scale(.5)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 520, easing: EO, fill: 'forwards' });
        st.seal.classList.add('lit'); setTimeout(() => { if (!st.hover) st.seal.classList.remove('lit'); }, 1400);
        setTimeout(() => { puff(st, 28); st.flash = 1; st.box.classList.add('summoned');
          st.k.animate([{ opacity: 0, transform: 'scale(1.3)' }, { opacity: .8, transform: 'scale(1)' }], { duration: 400, easing: EO, fill: 'backwards' }); }, 300);
      };
      // 1. entrance: rise in sequence, HUD corners snap in, then each form is summoned
      const enter = () => DS.forEach((st, k) => {
        st.door.classList.remove('pre');
        if (reduce) { st.door.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 }); summon(st); return; }
        st.door.animate([{ opacity: 0, transform: 'translateY(48px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: k * 80, easing: EO, fill: 'backwards' });
        $('.corner.tl', st.door).animate([{ transform: 'translate(-8px,-8px)' }, { transform: 'none' }], { duration: 500, delay: k * 80, easing: EO, fill: 'backwards' });
        $('.corner.br', st.door).animate([{ transform: 'translate(8px,8px)' }, { transform: 'none' }], { duration: 500, delay: k * 80, easing: EO, fill: 'backwards' });
        setTimeout(() => summon(st), k * 80 + 260);
      });
      if (hasGsap && !reduce) {
        doors.forEach(d => d.classList.add('pre'));
        triggers.push(ScrollTrigger.create({ trigger: '#doors', start: 'top 85%', once: true, onEnter: enter }));
        const t1 = gsap.from('#doorsHead', { y: 24, opacity: 0, duration: .5, ease: 'power3.out', scrollTrigger: { trigger: '#doorsHead', start: 'top 80%', once: true } });
        triggers.push(t1.scrollTrigger);
      } else enter();
      const vob = new IntersectionObserver((ents) => ents.forEach(e => { const st = DS.find(d => d.box === e.target); if (st) st.vis = e.isIntersecting; }), { threshold: 0 });
      DS.forEach(st => vob.observe(st.box)); cleanups.push(() => vob.disconnect());

      // 3. hover: tilt + lift, 2.5D layer parallax, elemental surge
      DS.forEach(st => {
        const { door } = st;
        const mv = (e) => { if (!fine) return; const r = st.inr.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
          st.ry.t = nx * 10; st.rx.t = -ny * 10; st.px.t = nx * 2; st.py.t = ny * 2; };
        const en = () => { st.hover = 1; st.ly.t = fine ? -6 : 0; st.seal.classList.add('lit'); if (!reduce) { puff(st, 10);
          if (st.form === 'lightning') st.zap.animate([{ opacity: .8, transform: 'translateX(-30%)' }, { opacity: 0, transform: 'translateX(30%)' }], { duration: 120, easing: 'linear' }); } };
        const lv = () => { st.hover = 0; st.rx.t = st.ry.t = st.px.t = st.py.t = 0; st.ly.t = 0; st.seal.classList.remove('lit'); };
        door.addEventListener('pointermove', mv); door.addEventListener('pointerenter', en); door.addEventListener('pointerleave', lv);
        cleanups.push(() => { door.removeEventListener('pointermove', mv); door.removeEventListener('pointerenter', en); door.removeEventListener('pointerleave', lv); st.inr.style.transform = ''; });

        // 4. click: press + ring surge, then image expands under a themed brush wipe
        door.onclick = (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
          e.preventDefault();
          const href = door.getAttribute('href');
          if (reduce) { location.hash = href; return; }
          door.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)' }], { duration: 200, easing: EO, fill: 'forwards' });
          st.ring.animate([{ opacity: .32, scale: 1 }, { opacity: 1, scale: 1.18, filter: 'brightness(2)' }], { duration: 200, easing: EO, fill: 'forwards' });
          st.flash = 1;
          setTimeout(() => {
            const r = st.cv.getBoundingClientRect(); let src = $('.door-still', door).src; try { src = st.cv.toDataURL('image/jpeg', .8); } catch (er) {}
            const ov = document.createElement('div'); ov.className = 'door-expand';
            ov.style.cssText = `inset:0;background-image:url(${src});filter:${getComputedStyle(st.cv).filter};`; document.body.appendChild(ov);
            if (innerWidth >= 768) ov.animate([{ clipPath: `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)` }, { clipPath: 'inset(0px 0px 0px 0px)' }], { duration: 300, easing: 'cubic-bezier(.77,0,.175,1)', fill: 'forwards' });
            else ov.animate([{ clipPath: `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`, transform: 'scale(1)' }, { clipPath: `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`, transform: 'scale(1.06)' }], { duration: 300, easing: EO, fill: 'forwards' });
            navOpts = { theme: st.form, tin: 300, hold: 200, tout: 150 };
            location.hash = href;
            setTimeout(() => { ov.remove(); door.getAnimations().forEach(a => a.cancel()); st.ring.getAnimations().forEach(a => a.cancel()); }, 700);
          }, 200);
        };
      });

      // 2. idle loops (only while a card is on screen)
      const drawFrameTo = (st, i) => {
        let im = imgs[i]; if (!im || !im.naturalWidth) { for (let k = i; k >= 0; k--) if (imgs[k] && imgs[k].naturalWidth) { im = imgs[k]; break; } }
        if (!im || !im.naturalWidth) return;
        const sc = Math.max(st.w / im.naturalWidth, st.h / im.naturalHeight) * 1.38, dw = im.naturalWidth * sc, dh = im.naturalHeight * sc;
        st.c.clearRect(0, 0, st.w, st.h); st.c.drawImage(im, (st.w - dw) / 2, -dh * .03, dw, dh);
      };
      const arc = (st) => { const cx = st.w * .5, cy = st.h * .34, R = st.h * (.5 + Math.random() * .12), a0 = Math.random() * Math.PI * 2, n = 5 + (Math.random() * 4 | 0), pts = [];
        for (let i = 0; i <= n; i++) { const a = a0 + i * .07, rr = R + (Math.random() - .5) * 14; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .9]); } return { pts, life: .12 + Math.random() * .08 }; };
      if (!reduce) cleanups.push(loop((dt) => {
        DS.forEach(st => {
          // springs run even off-screen so the card settles
          const moving = [st.rx.step(dt), st.ry.step(dt), st.ly.step(dt), st.px.step(dt), st.py.step(dt)].some(Boolean);
          if (moving) {
            st.inr.style.transform = `translateY(${st.ly.x.toFixed(2)}px) rotateX(${st.rx.x.toFixed(2)}deg) rotateY(${st.ry.x.toFixed(2)}deg)`;
            st.ring.style.translate = `calc(-50% + ${(-st.px.x * 2).toFixed(2)}px) calc(-50% + ${(-st.py.x * 2).toFixed(2)}px)`;
            st.cv.style.translate = `${(st.px.x * 3).toFixed(2)}px ${(st.py.x * 3).toFixed(2)}px`;
            st.body.style.translate = `${(st.px.x * 7).toFixed(2)}px ${(st.py.x * 7).toFixed(2)}px`;
          }
          if (!st.vis) return;
          const { f, w, h } = st; st.t += dt;
          st.acc += dt * (st.hover ? 18 : 11);
          while (st.acc >= 1) { st.acc -= 1; st.fr += st.dir; if (st.fr >= st.range[1] || st.fr <= st.range[0]) st.dir *= -1; }
          if (st.fr !== st.lastDrawn) { drawFrameTo(st, st.fr); st.lastDrawn = st.fr; }
          f.clearRect(0, 0, w, h);
          if (st.form === 'lightning') {
            f.strokeStyle = 'rgba(170,210,255,.16)'; f.lineWidth = 1; f.beginPath();
            for (let i = 0; i < 22; i++) { const x = ((i * 53 + st.t * 260) % (w + 40)) - 20, y = ((i * 97 + st.t * 520) % (h + 40)) - 20; f.moveTo(x, y); f.lineTo(x - 4, y + 14); } f.stroke();
            st.nextArc -= dt; if (st.nextArc <= 0) { st.arcs.push(arc(st)); if (st.hover || Math.random() < .35) st.arcs.push(arc(st)); st.nextArc = .09 + Math.random() * .13; }
            f.save(); f.shadowColor = '#7FD3FF'; f.shadowBlur = 10; f.lineWidth = 1.6;
            st.arcs.forEach(a => { a.life -= dt; f.strokeStyle = `rgba(200,236,255,${Math.max(0, Math.min(1, a.life * 8)).toFixed(3)})`; f.beginPath(); a.pts.forEach(([x, y], i) => i ? f.lineTo(x, y) : f.moveTo(x, y)); f.stroke(); });
            f.restore(); st.arcs = st.arcs.filter(a => a.life > 0);
            if (st.flash > 0) { f.fillStyle = `rgba(140,200,255,${(st.flash * .25).toFixed(3)})`; f.fillRect(0, 0, w, h); st.flash -= dt * 4; }
          } else if (st.form === 'shadow') {
            const br = .5 + .5 * Math.sin(st.t * Math.PI * 2 / 3.2);
            const hg = f.createRadialGradient(w * .5, h * .32, 0, w * .5, h * .32, h * .62); hg.addColorStop(0, `rgba(150,100,255,${(.12 + br * .22).toFixed(3)})`); hg.addColorStop(1, 'rgba(60,20,120,0)'); f.fillStyle = hg; f.fillRect(0, 0, w, h);
            for (let i = 0; i < 6; i++) { const x = ((i * .23 + st.t * (.03 + i * .006)) % 1.4 - .2) * w, y = h * (.35 + (i % 3) * .22) + Math.sin(st.t * .6 + i) * 10, r = h * (.35 + (i % 2) * .15);
              const g = f.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(40,20,80,${st.hover ? .5 : .38})`); g.addColorStop(1, 'rgba(10,6,24,0)'); f.fillStyle = g; f.fillRect(0, 0, w, h); }
            if (st.flash > 0) { f.fillStyle = `rgba(150,110,255,${(st.flash * .2).toFixed(3)})`; f.fillRect(0, 0, w, h); st.flash -= dt * 3; }
          } else {
            const pu = .5 + .5 * Math.sin(st.t * Math.PI * 2 / 2.4);
            const g = f.createLinearGradient(0, h, 0, h * .35); g.addColorStop(0, `rgba(250,116,2,${(.14 + pu * .18 + st.hover * .1).toFixed(3)})`); g.addColorStop(1, 'rgba(250,116,2,0)'); f.fillStyle = g; f.fillRect(0, 0, w, h);
            if (Math.random() < (st.hover ? .9 : .5) && st.parts.length < 70) st.parts.push({ x: Math.random() * w, y: h + 4, v: 50 + Math.random() * 80, s: 1.2 + Math.random() * 2.4, a: .9, ph: Math.random() * 6 });
            st.parts.forEach(q => { q.y -= q.v * dt; q.ph += dt * 3; q.x += Math.sin(q.ph) * 14 * dt; q.a -= dt * .45; f.fillStyle = `rgba(252,${130 + (q.s * 20 | 0)},30,${Math.max(q.a, 0)})`; f.fillRect(q.x, q.y, q.s, q.s); });
            st.parts = st.parts.filter(q => q.a > 0);
            if (st.flash > 0) { f.fillStyle = `rgba(252,160,58,${(st.flash * .25).toFixed(3)})`; f.fillRect(0, 0, w, h); st.flash -= dt * 3; }
          }
          const tint = st.form === 'lightning' ? '215,228,245' : st.form === 'shadow' ? '196,186,220' : '240,226,210';
          st.puffs.forEach(p => { p.life += dt * 1000; const k = p.life / p.dur; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .97; p.vy *= .97; const r = p.r + k * 46, al = Math.max(0, .6 * (1 - k));
            const g = f.createRadialGradient(p.x, p.y, 0, p.x, p.y, r); g.addColorStop(0, `rgba(${tint},${al})`); g.addColorStop(1, `rgba(${tint},0)`); f.fillStyle = g; f.beginPath(); f.arc(p.x, p.y, r, 0, Math.PI * 2); f.fill(); });
          st.puffs = st.puffs.filter(p => p.life < p.dur);
        });
      }));
      else DS.forEach(st => { st.box.classList.add('summoned'); });

      /* ---- H3 proof ---- */
      const proof = $('#proof');
      const runProof = () => {
        $$('.rule', proof).forEach((r, k) => r.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 500, delay: k * 60, easing: EO, fill: 'forwards' }));
        $$('[data-count]', proof).forEach(el => {
          const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), t0 = performance.now(), dur = 1200;
          const step = (t) => { const q = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - q, 5); el.textContent = (to * e).toFixed(dec);
            if (q < 1) requestAnimationFrame(step); else { const num = el.parentElement; num.classList.remove('flash'); void num.offsetWidth; num.classList.add('flash'); const b = $('em', num).getBoundingClientRect(); fxBurst(b.left + b.width / 2, b.top + b.height / 2, 6, 28, 420); } };
          el.textContent = (0).toFixed(dec); requestAnimationFrame(step);
        });
      };
      if (reduce) $$('.rule', proof).forEach(r => r.style.transform = 'none');
      else if (hasGsap) triggers.push(ScrollTrigger.create({ trigger: proof, start: 'top 80%', once: true, onEnter: runProof }));
      if (innerWidth < 640 && !reduce) {
        const tr = $('#proofTrack'); let paused = 0;
        const id = setInterval(() => { if (Date.now() < paused) return; const cards = $$('.stat', tr); const w = cards[0].getBoundingClientRect().width + 16;
          const nx = tr.scrollLeft + w >= tr.scrollWidth - tr.clientWidth + 4 ? 0 : tr.scrollLeft + w; tr.scrollTo({ left: nx, behavior: 'smooth' }); }, 2600);
        const hold = () => { paused = Date.now() + 6000; }; tr.addEventListener('pointerdown', hold); tr.addEventListener('touchstart', hold, { passive: true });
        cleanups.push(() => clearInterval(id));
      }

      /* ---- H4 selected work ---- */
      const track = $('#panTrack'), panCards = $$('.case-card', track);
      if (hasGsap && !reduce && desk) {
        const dist = () => track.scrollWidth - innerWidth;
        const tw = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#pan', start: 'top top', end: () => '+=' + innerHeight * 2, pin: true, scrub: .8, invalidateOnRefresh: true,
          onUpdate: () => panCards.forEach(c => { const r = c.getBoundingClientRect(), cx = r.left + r.width / 2; c.classList.toggle('bloom', cx > innerWidth * .25 && cx < innerWidth * .75); }) } });
        triggers.push(tw.scrollTrigger, { kill: () => tw.kill() });
        panCards.forEach(c => { const im = $('.media img', c); const t = gsap.fromTo(im, { xPercent: 0 }, { xPercent: 25, ease: 'none', scrollTrigger: { trigger: '#pan', start: 'top top', end: () => '+=' + innerHeight * 2, scrub: .8 } }); triggers.push(t.scrollTrigger); });
      } else if (hasGsap && !reduce) {
        panCards.forEach(c => { const t = gsap.from(c, { y: 30, opacity: 0, duration: .4, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: c, start: 'top 88%', once: true } }); triggers.push(t.scrollTrigger); });
      }
      if (fine && !reduce) {
        const vx = spring(320, 28), vy = spring(320, 28); let on = false;
        const mv = (e) => { vx.t = e.clientX; vy.t = e.clientY; if (!on) { vx.x = vx.t; vy.x = vy.t; } };
        panCards.forEach(c => { c.addEventListener('pointerenter', () => { on = true; viewCursor.classList.add('on'); }); c.addEventListener('pointerleave', () => { on = false; viewCursor.classList.remove('on'); }); });
        addEventListener('pointermove', mv, { passive: true });
        cleanups.push(loop((dt) => { vx.step(dt); vy.step(dt); viewCursor.style.translate = `${vx.x.toFixed(1)}px ${vy.x.toFixed(1)}px`; }));
        cleanups.push(() => { removeEventListener('pointermove', mv); viewCursor.classList.remove('on'); });
      }

      /* ---- H5 what I do ---- */
      const rows = $('#rows');
      if (hasGsap && !reduce) {
        const t = ScrollTrigger.create({ trigger: rows, start: 'top 75%', once: true, onEnter: () => {
          $$('.rule', rows).forEach((r, k) => r.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 500, delay: k * 80, easing: EO, fill: 'forwards' }));
          $$('.row', rows).forEach((row, k) => [...row.children].filter(c => !c.classList.contains('rule')).forEach((c, j) =>
            c.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: k * 120 + j * 50, easing: EO, fill: 'backwards' })));
        } });
        triggers.push(t);
      } else $$('.rule', rows).forEach(r => r.style.transform = 'none');
      if (fine && !reduce) {
        const tx = spring(250, 20), ty = spring(250, 20); let lastX = 0;
        const mv = (e) => { tx.t = e.clientX; ty.t = e.clientY; };
        $$('.row', rows).forEach(row => {
          row.addEventListener('pointerenter', (e) => { const im = $('img', trail); if (im.getAttribute('src') !== row.dataset.img) im.src = row.dataset.img; if (!trail.classList.contains('on')) { tx.x = e.clientX; ty.x = e.clientY; } trail.classList.add('on'); });
          row.addEventListener('pointerleave', () => trail.classList.remove('on'));
        });
        addEventListener('pointermove', mv, { passive: true });
        cleanups.push(loop((dt) => { tx.step(dt); ty.step(dt); const rot = Math.max(-2, Math.min(2, tx.v * .004)); trail.style.translate = `${tx.x.toFixed(1)}px ${ty.x.toFixed(1)}px`; trail.style.rotate = rot.toFixed(2) + 'deg'; }));
        cleanups.push(() => { removeEventListener('pointermove', mv); trail.classList.remove('on'); });
      }

      /* ---- H6 roster: stagger in, then a roll call that lights each logo in turn ---- */
      const roster = $('#roster');
      if (roster && !reduce && hasGsap) {
        const tiles = $$('.lg', roster), rules = $$('.rg-rule', roster);
        gsap.set(tiles, { opacity: 0, y: 18 }); gsap.set(rules, { scaleX: 0 });
        const timers = [];
        triggers.push(ScrollTrigger.create({ trigger: roster, start: 'top 72%', once: true, onEnter: () => {
          gsap.to(rules, { scaleX: 1, duration: .7, ease: 'power3.out', stagger: .08 });
          gsap.to(tiles, { opacity: 1, y: 0, duration: .55, ease: 'power3.out', stagger: .055, delay: .1, clearProps: 'transform' });
          tiles.forEach((t, i) => { timers.push(setTimeout(() => { t.classList.add('lit'); timers.push(setTimeout(() => t.classList.remove('lit'), 520)); }, 650 + i * 110)); });
          timers.push(setTimeout(() => { const n = tiles[tiles.length - 1].getBoundingClientRect(); fxBurst(n.left + n.width / 2, n.top + n.height / 2, 10, 46, 480); }, 650 + tiles.length * 110));
        } }));
        cleanups.push(() => timers.forEach(clearTimeout));
      }

      /* ---- H7 closing CTA ---- */
      const close = $('#close'), vig = $('#closeVig'), hor = $('#closeHorizon');
      if (reduce) close.classList.add('in');
      else if (hasGsap) {
        triggers.push(ScrollTrigger.create({ trigger: close, start: 'top 70%', once: true, onEnter: () => { close.classList.add('in'); setTimeout(() => { const g = $('.grad', close).getBoundingClientRect(); fxBurst(g.right - 6, g.top + g.height * .55, 12, 40, 450); }, 900); } }));
        triggers.push(ScrollTrigger.create({ trigger: close, start: 'top bottom', end: 'bottom bottom', scrub: true, onUpdate: (s) => { vig.style.opacity = s.progress.toFixed(3); hor.style.opacity = Math.min(1, s.progress * 1.4).toFixed(3); } }));
      }
      // closing scene: looping clip that plays only on screen, zoom-settle on scroll, cursor parallax, staggered copy
      const cv2 = $('#closeVideo'), cmedia = $('#closeMedia');
      if (!reduce) {
        cv2.src = 'img/close-loop.mp4';
        const vob2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { const pr = cv2.play(); if (pr && pr.catch) pr.catch(() => {}); } else cv2.pause(); }, { threshold: .15 });
        vob2.observe(close); cleanups.push(() => { vob2.disconnect(); cv2.pause(); });
        if (hasGsap) {
          const tz = gsap.fromTo(cmedia, { scale: 1.18, yPercent: -6 }, { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: close, start: 'top bottom', end: 'bottom bottom', scrub: true } });
          triggers.push(tz.scrollTrigger);
          triggers.push(ScrollTrigger.create({ trigger: close, start: 'top 70%', once: true, onEnter: () => {
            $('.close-lede', close).animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 700, easing: EO, fill: 'backwards' });
            $('.close-cta', close).animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 820, easing: EO, fill: 'backwards' });
            $('.close-bloom', close).animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: .9, transform: 'scale(1)', offset: .35 }, { opacity: 0, transform: 'scale(1.25)' }], { duration: 1400, delay: 880, easing: 'ease-out' });
          } }));
        }
        if (fine) {
          const bx = spring(120, 20), by = spring(120, 20);
          const mv = (e) => { const r = close.getBoundingClientRect(); if (e.clientY < r.top || e.clientY > r.bottom) { bx.t = by.t = 0; return; } bx.t = -((e.clientX / innerWidth) - .5) * 24; by.t = -(((e.clientY - r.top) / r.height) - .5) * 16; };
          addEventListener('pointermove', mv, { passive: true });
          cleanups.push(loop((dt) => { const a1 = bx.step(dt), a2 = by.step(dt); if (a1 || a2) cv2.style.translate = `${bx.x.toFixed(2)}px ${by.x.toFixed(2)}px`; }));
          cleanups.push(() => removeEventListener('pointermove', mv));
        }
      }
      const sig = $('#sig');
      magnet(sig, { radius: 60, max: 10, k: 200, d: 15 });
      $('.sig-btn', sig).onclick = (e) => {
        if (reduce || e.metaKey || e.ctrlKey) return;
        e.preventDefault(); sig.classList.add('busy'); pendingIntent = 'other';
        setTimeout(() => { location.hash = '#contact'; setTimeout(() => sig.classList.remove('busy'), 900); }, 1000);
      };
      $$('canvas.embers', root).forEach(embers);
    },
    work(root) {
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)', EIO = 'cubic-bezier(.77,0,.175,1)';
      const btns = $$('.filter', root), cards = $$('#workGrid .case-card', root), grid = $('#workGrid'), ind = $('#filterInd'), wm = $('.watermark', root);
      let curF = 'all'; root.dataset.cat = '';
      const match = (c, f) => f === 'all' || c.dataset.cat === f;

      /* W1 background: the eight-doorways video, scrubbed by scroll like the other page heroes */
      vidBg($('.page-hero', root), 'wkframes/ws', 'img/wk-m.mp4', 'img/wk-still.webp', triggers, cleanups);
      /* (old footage scrub below draws into a hidden canvas; kept so nothing else depends on it breaking) */
      const wc = $('#workCanvas'), wctx = wc.getContext('2d'), WR = [0, 70]; let wLast = -1;
      const wFit = () => { const dpr = Math.min(devicePixelRatio || 1, 2); wc.width = Math.round(wc.clientWidth * dpr); wc.height = Math.round(wc.clientHeight * dpr); wLast = -1; };
      const wDraw = (i) => { let im = imgs[i]; if (!im || !im.naturalWidth) { for (let k = i; k >= 0; k--) if (imgs[k] && imgs[k].naturalWidth) { im = imgs[k]; break; } }
        if (!im || !im.naturalWidth || i === wLast) return; wLast = i; const cw = wc.width, ch = wc.height, sc = Math.max(cw / im.naturalWidth, ch / im.naturalHeight) * 1.08, dw = im.naturalWidth * sc, dh = im.naturalHeight * sc;
        const dx = innerWidth < 768 ? (cw - dw) / 2 : Math.min(0, Math.max(cw - dw, cw * .72 - dw / 2)); wctx.drawImage(im, dx, (ch - dh) * .35, dw, dh); };
      wFit(); wDraw(reduce ? WR[1] : WR[0]);
      const wRs = () => { wFit(); wDraw(WR[0]); }; addEventListener('resize', wRs); cleanups.push(() => removeEventListener('resize', wRs));
      if (!reduce && hasGsap) {
        triggers.push(ScrollTrigger.create({ trigger: $('.page-hero', root), start: 'top top', end: () => '+=' + Math.max(innerHeight * 1.2, $('.page-hero', root).offsetHeight + 400), scrub: true,
          onUpdate: (st) => { wDraw(Math.round(WR[0] + st.progress * (WR[1] - WR[0]))); $('.work-bg', root).style.translate = `0 ${(st.progress * 40).toFixed(1)}px`; } }));
        const retry = setInterval(() => { if (imgs[0] && imgs[0].naturalWidth) { wLast = -1; wDraw(WR[0]); clearInterval(retry); } }, 200); cleanups.push(() => clearInterval(retry));
      }

      /* W1 entrance */
      if (!reduce) {
        wm.animate([{ opacity: 0 }, { opacity: .08 }], { duration: 800, easing: 'ease-out', fill: 'backwards' });
        const acc = $('.accent', root); setTimeout(() => { const r = acc.getBoundingClientRect(); fxBurst(r.right - 6, r.top + r.height * .55, 8, 34, 420); }, 120 + 760);
        btns.forEach((bt, k) => bt.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: 380 + k * 60, easing: EO, fill: 'backwards' }));
        if (hasGsap) triggers.push(ScrollTrigger.create({ start: 0, end: 'max', onUpdate: () => { wm.style.translate = `0 ${(scrollY * .3).toFixed(1)}px`; } }));
      }
      /* sliding indicator on a spring */
      const ix = spring(300, 28), iy = spring(300, 28), iw = spring(300, 28), ih = spring(300, 28);
      const target = (bt, snap) => {
        ix.t = bt.offsetLeft; iy.t = bt.offsetTop; iw.t = bt.offsetWidth; ih.t = bt.offsetHeight; if (snap || reduce) { ix.x = ix.t; iy.x = iy.t; iw.x = iw.t; ih.x = ih.t; ix.v = iy.v = iw.v = ih.v = 0; paintInd(); } };
      const paintInd = () => { ind.style.transform = `translate(${ix.x.toFixed(2)}px,${iy.x.toFixed(2)}px)`; ind.style.width = iw.x.toFixed(2) + 'px'; ind.style.height = ih.x.toFixed(2) + 'px'; };
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => target(btns[0], true));
      const onRs = () => target(btns.find(b => b.getAttribute('aria-pressed') === 'true'), true); addEventListener('resize', onRs); cleanups.push(() => removeEventListener('resize', onRs));
      cleanups.push(loop((dt) => { const m = [ix.step(dt), iy.step(dt), iw.step(dt), ih.step(dt)].some(Boolean); if (m) paintInd(); }));

      /* W2 entrance: rise as cards reach 20% into the viewport, 60ms apart per batch */
      if (!reduce) {
        cards.forEach(c => c.classList.add('pre'));
        const ob = new IntersectionObserver((ents) => {
          let k = 0;
          ents.filter(e => e.isIntersecting).sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top || x.boundingClientRect.left - y.boundingClientRect.left).forEach(e => {
            const c = e.target; ob.unobserve(c); c.classList.remove('pre');
            c.animate([{ opacity: 0, transform: 'translateY(36px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 550, delay: (k++) * 60, easing: EO, fill: 'backwards' });
          });
        }, { rootMargin: '0px 0px -20% 0px' });
        cards.forEach(c => ob.observe(c)); cleanups.push(() => ob.disconnect());
      }

      /* filter: exit, FLIP reflow, re-enter */
      let tok = 0;
      const apply = (f) => {
        if (f === curF) return; curF = f; const my = ++tok;
        btns.forEach(bt => bt.setAttribute('aria-pressed', String(bt.dataset.f === f)));
        target(btns.find(bt => bt.dataset.f === f)); root.dataset.cat = f === 'all' ? '' : f;
        const vis = cards.filter(c => !c.hidden), out = vis.filter(c => !match(c, f)), stay = vis.filter(c => match(c, f)), inc = cards.filter(c => c.hidden && match(c, f));
        if (reduce) { cards.forEach(c => c.hidden = !match(c, f)); return; }
        cards.forEach(c => c.classList.remove('pre'));
        Promise.all(out.map(c => c.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.92)' }], { duration: 240, easing: EO, fill: 'forwards' }).finished.catch(() => {}))).then(() => {
          if (my !== tok) return;
          const first = new Map(stay.map(c => [c, c.getBoundingClientRect()]));
          out.forEach(c => { c.hidden = true; c.getAnimations().forEach(an => an.cancel()); });
          inc.forEach(c => { c.hidden = false; });
          stay.forEach(c => { const a1 = first.get(c), b1 = c.getBoundingClientRect(); c.animate([{ transform: `translate(${a1.left - b1.left}px,${a1.top - b1.top}px)` }, { transform: 'none' }], { duration: 450, easing: EO }); });
          inc.forEach((c, i) => c.animate([{ opacity: 0, transform: 'translateY(16px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: 100 + i * 60, easing: EO, fill: 'backwards' }));
        });
      };
      btns.forEach(bt => bt.onclick = () => apply(bt.dataset.f));

      /* hover pan + VIEW cursor pulled toward the hovered card */
      if (fine && !reduce) {
        const vx = spring(150, 15), vy = spring(150, 15); let over = null, px = 0, py = 0, inGrid = false;
        const mv = (e) => { px = e.clientX; py = e.clientY;
          if (over) { const r = over.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2; vx.t = px + (cx - px) * .25; vy.t = py + (cy - py) * .25;
            const im = $('.media img', over), mr = $('.media', over).getBoundingClientRect(); const nx = (px - mr.left) / mr.width - .5, ny = (py - mr.top) / mr.height - .5; im.style.translate = `${(nx * 16).toFixed(1)}px ${(ny * 16).toFixed(1)}px`; }
          else { vx.t = px; vy.t = py; } };
        cards.forEach(c => {
          c.addEventListener('pointerenter', (e) => { over = c; if (!inGrid) { vx.x = e.clientX; vy.x = e.clientY; } inGrid = true; viewCursor.classList.add('on'); });
          c.addEventListener('pointerleave', () => { $('.media img', c).style.translate = ''; over = null; viewCursor.classList.remove('on'); inGrid = false; });
        });
        addEventListener('pointermove', mv, { passive: true });
        cleanups.push(loop((dt) => { vx.step(dt); vy.step(dt); if (over) viewCursor.style.translate = `${vx.x.toFixed(1)}px ${vy.x.toFixed(1)}px`; }));
        cleanups.push(() => { removeEventListener('pointermove', mv); viewCursor.classList.remove('on'); });
      }

      /* click: cover image morphs into the case hero */
      cards.forEach(c => c.addEventListener('click', (e) => {
        if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
        e.preventDefault();
        const im = $('.media img', c), r = $('.media', c).getBoundingClientRect();
        cards.filter(x => x !== c && !x.hidden).forEach(x => x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' }));
        const ov = document.createElement('div'); ov.className = 'case-morph'; ov.style.backgroundImage = `url(${im.dataset.full || im.currentSrc || im.src})`; document.body.appendChild(ov);
        viewCursor.classList.remove('on');
        ov.animate([{ clipPath: `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`, filter: 'brightness(.7) saturate(.9)' }, { clipPath: 'inset(0px 0px 0px 0px)', filter: 'brightness(.5) saturate(.9)' }], { duration: 500, easing: EIO, fill: 'forwards' }).onfinish = () => {
          navOpts = { direct: true }; location.hash = c.getAttribute('href');
          setTimeout(() => ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' }).onfinish = () => ov.remove(), 60);
        };
      }));

      /* W3 call to action */
      const cta = $('#workCta');
      if (!reduce && hasGsap) {
        const kids = [$('h2', cta), ...$$('.wl', cta)];
        kids.forEach(k => k.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: cta, start: 'top 80%', once: true, onEnter: () => {
          kids.forEach((k, i) => { k.style.opacity = ''; k.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: i ? 120 + (i - 1) * 60 : 0, easing: EO, fill: 'backwards' }); });
          $('.cta-horizon', cta).animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, delay: 200, easing: EO, fill: 'forwards' });
        } }));
      } else $('.cta-horizon', cta).style.transform = 'none';
    },
    case(root) {
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)', cl = (v) => Math.min(1, Math.max(0, v));
      const BR = [{ clipPath: 'inset(-12% 100% -18% 0)' }, { clipPath: 'inset(-12% -4% -18% 0)' }];
      const show = (el, op) => { el.style.opacity = op == null ? '1' : op; };
      const countUp = (els, dur, onDone) => { const t0 = performance.now(); els.forEach(e => e.textContent = (0).toFixed(+e.dataset.dec));
        const st = (t) => { const q = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - q, 3); els.forEach(el => el.textContent = (+el.dataset.to * e).toFixed(+el.dataset.dec)); if (q < 1) requestAnimationFrame(st); else onDone && onDone(); }; requestAnimationFrame(st); };
      const pool = (cv, n, mk, step) => { const c = cv.getContext('2d'); let W = 0, H = 0, ps = [], on = false, id = 0, last = 0;
        const fit = () => { const dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
        const fr = (t) => { if (!on) return; const dt = Math.min(.05, (t - last) / 1000); last = t; c.clearRect(0, 0, W, H); ps.forEach(p => step(p, dt, W, H, c)); id = requestAnimationFrame(fr); };
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting && !on) { fit(); if (!ps.length) ps = Array.from({ length: n }, () => mk(W, H, true)); on = true; last = performance.now(); id = requestAnimationFrame(fr); } else if (!e.isIntersecting) { on = false; cancelAnimationFrame(id); } });
        ob.observe(cv); cleanups.push(() => { on = false; cancelAnimationFrame(id); ob.disconnect(); }); };

      /* C1 header: episode stamp, back link, title brush, metric count + burst, HUD console, cover drift */
      const ep = $('.c1-ep', root), back = $('.c1-back', root), line = $('.c1-line>span', root), metric = $('.c1-metric', root), hud = $('.c1-hud', root), mCnt = $$('.c1-metric .cnt', root);
      if (reduce) { [back, metric, hud].forEach(e => show(e)); show(ep, '.15'); line.style.clipPath = 'none'; }
      else {
        const d0 = revealBase;
        ep.animate([{ opacity: 0, transform: 'scale(1.3)' }, { opacity: .15, transform: 'none' }], { duration: 400, delay: d0, easing: EO, fill: 'forwards' });
        back.animate([{ opacity: 0, transform: 'translateX(-16px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: d0, easing: EO, fill: 'forwards' });
        line.animate(BR, { duration: 650, delay: d0 + 80, easing: EB, fill: 'forwards' });
        hud.animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: d0 + 200, easing: EO, fill: 'forwards' });
        metric.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: d0 + 300, easing: EO, fill: 'forwards' });
        setTimeout(() => countUp(mCnt, 1200, () => { const b = $('b', metric).getBoundingClientRect(); fxBurst(b.right - 8, b.top + b.height * .5, 10, 35, 400); }), d0 + 300);
        if (hasGsap) { const bgi = $('.c1-bg img', root), fgi = $('.c1-bg .lv-fg', root);
          if (fgi) { const tf = gsap.fromTo(fgi, { yPercent: 0, filter: 'brightness(.5) saturate(.9)' }, { yPercent: 6, scale: 1.06, filter: 'brightness(.26) saturate(.9)', ease: 'none', scrollTrigger: { trigger: '.c1', start: 'top top', end: 'bottom top', scrub: true } }); triggers.push(tf.scrollTrigger); }
          const t1 = gsap.fromTo(bgi, { yPercent: 0, filter: 'brightness(.5) saturate(.9)' }, { yPercent: 20, filter: 'brightness(.22) saturate(.9)', ease: 'none', scrollTrigger: { trigger: '.c1', start: 'top top', end: 'bottom top', scrub: true } });
          triggers.push(t1.scrollTrigger); }
        /* live cover (user art): same effect as its work card, plus a surge on arrival and on hover */
        const lv = $('.c1-live', root);
        if (lv) { const fx = runLive(lv, lv.closest('[data-live]').dataset.live, 1.4, (f) => cleanups.push(f), true); setTimeout(() => fx.surge(), d0 + 300);
          const hdr = lv.closest('[data-live]'), en = () => fx.surge(); hdr.addEventListener('pointerenter', en); cleanups.push(() => hdr.removeEventListener('pointerenter', en));
          const pv = depth(hdr, $('.c1-bg img', root), $('.c1-bg .lv-fg', root), 10); if (pv) cleanups.push(pv); }
      }

      /* C2 context: quiet rise + sidebar slide */
      const c2t = $('.c2-text', root), c2s = $('.c2-side', root);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: '.c2', start: 'top 80%', once: true, onEnter: () => {
        c2t.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 550, easing: EO, fill: 'forwards' });
        c2s.animate([{ opacity: 0, transform: 'translateX(30px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: 150, easing: EO, fill: 'forwards' }); } }));
      else [c2t, c2s].forEach(e => show(e));

      /* C3 tension chamber: background darkens, vignette closes, ash drifts, words flare */
      const c3 = $('.c3', root), q = $('.c3-q', root), vig = $('.c3-vig', root), fws = $$('.fw', root);
      if (hasGsap && !reduce) {
        const t3 = gsap.fromTo(c3, { backgroundColor: '#18120F' }, { backgroundColor: '#08090C', ease: 'none', scrollTrigger: { trigger: c3, start: 'top 70%', end: 'top 25%', scrub: true } });
        const t4 = gsap.fromTo(vig, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: c3, start: 'top 70%', end: 'top 25%', scrub: true } });
        triggers.push(t3.scrollTrigger, t4.scrollTrigger);
        triggers.push(ScrollTrigger.create({ trigger: c3, start: 'top 60%', once: true, onEnter: () => q.animate([{ opacity: 0, transform: 'translateY(30px)', clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, transform: 'none', clipPath: 'inset(-10% 0 -10% 0)' }], { duration: 700, easing: EO, fill: 'forwards' }) }));
        triggers.push(ScrollTrigger.create({ trigger: c3, start: 'top 55%', end: 'bottom 45%', onUpdate: (st) => fws.forEach((w, k) => { w.classList.toggle('on', st.progress > .2 + k * .2); w.classList.toggle('red', k % 2 === 0); }) }));
        pool($('.c3-ash', root), 46, (W, H) => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() < .5 ? -1 : 1) * (40 + Math.random() * 32), vy: -6 + Math.random() * 12, r: .8 + Math.random() * 1.8, a: .12 + Math.random() * .16 }),
          (p, dt, W, H, c) => { p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10; c.fillStyle = `rgba(170,170,180,${p.a})`; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill(); });
      } else { show(q); vig.style.opacity = '1'; c3.style.backgroundColor = '#08090C'; fws.forEach(w => w.classList.add('on')); }

      /* C4 ownership: asymmetric entrance, star bullets turn as they land */
      const own = $('.c4-own', root), team = $('.c4-team', root), lis = $$('.c4-own .c4-list li', root);
      if (hasGsap && !reduce) {
        lis.forEach(l => l.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: '.c4', start: 'top 75%', once: true, onEnter: () => {
          own.animate([{ opacity: 0, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: EO, fill: 'forwards' });
          team.animate([{ opacity: 0, transform: 'translateX(30px) scale(.98)' }, { opacity: .55, transform: 'scale(.98)' }], { duration: 450, delay: 120, easing: EO, fill: 'forwards' });
          lis.forEach((l, k) => { l.style.opacity = ''; l.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: 250 + k * 50, easing: EO, fill: 'backwards' }); setTimeout(() => l.classList.add('in'), 250 + k * 50); });
        } }));
      } else { show(own); team.style.opacity = '.55'; team.style.transform = 'scale(.98)'; lis.forEach(l => l.classList.add('in')); }

      /* C5 approach: shared brush spine, node ignition, 0.85x artifact drift, VIEW ring + lightbox */
      const sec = $('#caseSteps', root), sts = $$('.st2', sec), svg = $('.steps-line', sec), base = $('.base', svg), ink = $('.ink', svg), figs = $$('.st2-art', sec);
      let len = 0, fr = [];
      const build = () => { const r0 = svg.getBoundingClientRect(); const ys = sts.map(st => { const r = $('.st2-node', st).getBoundingClientRect(); return r.top + r.height / 2 - r0.top; });
        const d = wobble(12, ys); base.setAttribute('d', d); ink.setAttribute('d', d); len = ink.getTotalLength(); ink.style.strokeDasharray = len; fr = ys.map(y => (y - ys[0]) / Math.max(1, ys[ys.length - 1] - ys[0])); };
      build();
      const paint = (f) => { ink.style.strokeDashoffset = (len * (1 - f)).toFixed(1); sts.forEach((st, k) => st.classList.toggle('lit', f >= fr[k] - .01)); };
      figs.forEach(f => f.onclick = () => openDoc(f, figs));
      /* step art from user pictures: same living treatment as the covers */
      figs.filter(f => f.dataset.live).forEach(f => { const cv = $('.art-live', f); if (!cv) return;
        const im0 = $('.st2-img img', f), fx = runLive(cv, f.dataset.live, .8, (fn) => cleanups.push(fn), false, ['letters', 'signals', 'review', 'vault', 'cubes', 'circuit', 'streams', 'globe', 'tickets', 'bridges', 'stage', 'sea', 'brushline', 'dust', 'paint', 'gates', 'dome', 'key', 'scale', 'doors', 'dial', 'stones', 'orbits', 'ledger', 'cells'].includes(f.dataset.live) ? () => (im0 && im0.naturalWidth ? im0.naturalWidth / im0.naturalHeight : 1920 / 1072) : null); const en = () => fx.surge(); f.addEventListener('pointerenter', en); cleanups.push(() => f.removeEventListener('pointerenter', en));
        const pv = depth(f, $('.st2-img img', f), $('.st2-img .lv-fg', f), 12); if (pv) cleanups.push(pv); });
      if (hasGsap && !reduce) {
        triggers.push(ScrollTrigger.create({ trigger: sec, start: 'top 62%', end: 'bottom 62%', onUpdate: (st) => paint(st.progress), onRefresh: (st) => { build(); paint(st.progress); } }));
        $$('.st2-img', sec).forEach(im => { const t = gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }); triggers.push(t.scrollTrigger); });
      } else paint(1);
      if (fine && !reduce) {
        const mv = (e) => { viewCursor.style.translate = `${e.clientX}px ${e.clientY}px`; };
        figs.forEach(f => { f.addEventListener('pointerenter', (e) => { mv(e); viewCursor.classList.add('on'); }); f.addEventListener('pointerleave', () => viewCursor.classList.remove('on')); f.addEventListener('pointermove', mv); });
        cleanups.push(() => viewCursor.classList.remove('on'));
      }

      /* C6 payoff: dawn shift, rising embers, counters lock with bursts */
      const results = $('.c6', root), cards = $$('.c6-card', results), cnts = $$('.c6-card .cnt', results);
      if (hasGsap && !reduce) {
        cards.forEach(cd => $('p', cd).style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: results, start: 'top 72%', onEnter: () => results.classList.add('warm'), onLeaveBack: () => results.classList.remove('warm') }));
        triggers.push(ScrollTrigger.create({ trigger: results, start: 'top 60%', once: true, onEnter: () => {
          cards.forEach(cd => cd.animate([{ opacity: 0, transform: 'translateY(30px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: EO, fill: 'forwards' }));
          countUp(cnts, 1200, () => cards.forEach((cd, k) => { const r = $('.num', cd).getBoundingClientRect(); fxBurst(r.left + Math.min(r.width, 140) / 2, r.top + r.height / 2, 12, 42, 450);
            cd.classList.add('hit'); setTimeout(() => cd.classList.remove('hit'), 650);
            $('p', cd).animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: 200 + k * 120, easing: EO, fill: 'forwards' }); }));
        } }));
        pool($('.c6-embers', root), 24, (W, H, init) => ({ x: Math.random() * W, y: init ? H * (.4 + Math.random() * .6) : H + 6, v: 22 + Math.random() * 34, ph: Math.random() * 6.28, r: 1 + Math.random() * 1.8 }),
          (p, dt, W, H, c) => { if (!results.classList.contains('warm')) return; p.y -= p.v * dt; p.ph += dt * 1.5; if (p.y < H * .15) { p.y = H + 6; p.x = Math.random() * W; } const a = Math.min(1, (H - p.y) / 60) * Math.min(1, (p.y - H * .15) / 120);
            const x = p.x + Math.sin(p.ph) * 10, g = c.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4); g.addColorStop(0, `rgba(252,160,58,${(a * .85).toFixed(3)})`); g.addColorStop(1, 'rgba(250,116,2,0)'); c.fillStyle = g; c.fillRect(x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8); });
      } else { results.classList.add('warm'); cards.forEach(cd => show(cd)); }

      /* C7 parchment: torn-paper wipe, then quiet text */
      const c7 = $('.c7-card', root), c7b = $('.c7-body', root), c7h = $('.c7-card .h2', root);
      let sd = 21; const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
      const TOP = Array.from({ length: 24 }, (_, k) => [k / 23 * 100, rnd() * 2.2]), EDGE = Array.from({ length: 18 }, (_, k) => [k / 17 * 100, (rnd() - .5) * 5]);
      const torn = (t) => { const x = t * 108; const pts = TOP.filter(p => p[0] <= x).map(p => `${p[0].toFixed(1)}% ${p[1].toFixed(2)}%`);
        EDGE.forEach(e => pts.push(`${Math.min(100, Math.max(0, x + e[1])).toFixed(1)}% ${e[0].toFixed(1)}%`)); pts.push(`0% 100%`); return `polygon(0% ${TOP[0][1].toFixed(2)}%,${pts.join(',')})`; };
      const finalClip = `polygon(${TOP.map(p => `${p[0].toFixed(1)}% ${p[1].toFixed(2)}%`).join(',')},100% 100%,0% 100%)`;
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: c7, start: 'top 78%', once: true, onEnter: () => {
        const t0 = performance.now(); const eb = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const st = (t) => { const k = Math.min(1, (t - t0) / 700); c7.style.clipPath = k < 1 ? torn(eb(k)) : finalClip; if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st);
        [c7h, c7b].forEach(el => el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: 200 + 300, easing: 'ease-out', fill: 'forwards' })); } }));
      else { c7.style.clipPath = finalClip; show(c7b); show(c7h); }

      /* C8 next episode peek + matched door */
      const nx = $('.c8-next', root), go = $('.c8-go', root);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: nx, start: 'top 95%', once: true, onEnter: () => nx.animate([{ opacity: .8, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: EO }) }));
      magnet($('.c8-sig', root), { radius: 80, max: 8, k: 220, d: 14 });
      go.onclick = (e) => { if (reduce || e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); pendingIntent = go.dataset.intent;
        go.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 240, easing: EO });
        const r = go.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 12, 46, 480); setTimeout(() => { location.hash = '#contact'; }, 340); };
    },
    hire(root) {
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)';
      const fresh = (el) => el.getAnimations().forEach(an => an.cancel());
      const BR = [{ clipPath: 'inset(-12% 100% -18% 0)' }, { clipPath: 'inset(-12% -4% -18% 0)' }];

      /* R1 hero: brush headline, slot-machine roles, character file flip, telemetry bars */
      const hero = $('#hrHero', root), wm = $('.wr-wm', hero), eb = $('.wr-eb', hero), h1a = $('.h1a', hero), h1b = $('.h1b', hero), roles = $('.hr-roles', hero), badge = $('.hr-badge', hero), cta = $('.hr-ctas', hero), cf = $('#cf', hero), bars = $$('.cf-bar>i>b', hero), slotIn = $('.slot-in', hero);
      [wm, eb, h1a, h1b, roles, badge, cta, cf, slotIn, ...bars].forEach(fresh);
      const nums = $$('.cf-bl>b', hero), NV = nums.map(n => parseInt(n.textContent, 10)), clp = (v) => Math.min(1, Math.max(0, v));
      vidBg(hero, 'hrframes/hs', 'img/hr-m.mp4', 'img/hr-still.webp', triggers, cleanups, { fx: .74, onP: (p) => {
        const a = clp((p - .5) / .14), e = 1 - Math.pow(1 - a, 3); cf.style.opacity = e.toFixed(3); cf.style.transform = `translateY(${(40 * (1 - e)).toFixed(1)}px)`;
        bars.forEach((b, k) => { const t = clp((p - .6 - k * .05) / .24), q = 1 - Math.pow(1 - t, 3); b.style.transform = `scaleX(${q.toFixed(4)})`; nums[k].textContent = Math.round(NV[k] * q) + '%'; }); } });
      const scrubCard = hero.classList.contains('vscrub');
      const ROLES = ['Senior Product Manager', 'Head of Product', 'AI Product Lead']; let ri = 0; slotIn.textContent = ROLES[0];
      if (reduce) { [eb, roles, badge, cta, cf].forEach(x => x.style.opacity = '1'); wm.style.opacity = '.08'; h1a.style.clipPath = h1b.style.clipPath = 'none'; bars.forEach(x => x.style.transform = 'none'); }
      else {
        const d0 = revealBase + 450;
        wm.animate([{ opacity: 0 }, { opacity: .08 }], { duration: 800, delay: d0 - 200, easing: EO, fill: 'forwards' });
        eb.animate([{ opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: d0 - 150, easing: EO, fill: 'forwards' });
        h1a.animate(BR, { duration: 450, delay: d0, easing: EB, fill: 'forwards' });
        h1b.animate(BR, { duration: 350, delay: d0 + 450, easing: EB, fill: 'forwards' }).onfinish = () => { const r = h1b.getBoundingClientRect(); fxBurst(r.right - 8, r.bottom - r.height * .3, 8, 30, 400); };
        roles.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: d0 + 800, easing: EO, fill: 'forwards' });
        badge.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 350, delay: d0 + 950, easing: EO, fill: 'forwards' });
        cta.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 400, delay: d0 + 1050, easing: EO, fill: 'forwards' });
        if (!scrubCard) cf.animate([{ opacity: 0, transform: 'rotateY(75deg)' }, { opacity: 1, transform: 'rotateY(-4deg)', offset: .8 }, { opacity: 1, transform: 'none' }], { duration: 650, delay: d0 + 250, easing: EO, fill: 'forwards' }).onfinish = () => {
          bars.forEach((x, k) => x.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 800, delay: k * 60, easing: EO, fill: 'forwards' })); };
        const id = setInterval(() => { const out = slotIn.animate([{ transform: 'rotateX(0deg)', opacity: 1 }, { transform: 'rotateX(-90deg)', opacity: 0 }], { duration: 175, easing: 'ease-in', fill: 'forwards' });
          out.onfinish = () => { ri = (ri + 1) % ROLES.length; slotIn.textContent = ROLES[ri]; fresh(slotIn); slotIn.animate([{ transform: 'rotateX(90deg)', opacity: 0 }, { transform: 'rotateX(0deg)', opacity: 1 }], { duration: 175, easing: EO }); }; }, 3500);
        cleanups.push(() => clearInterval(id));
        if (hasGsap) { const t = gsap.fromTo(wm, { y: 0 }, { y: () => hero.offsetHeight * .2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } }); triggers.push(t.scrollTrigger); }
      }
      cf.dataset.fx = '1';
      if (fine && !reduce) { const sx = spring(180, 16), sy = spring(180, 16);
        cf.addEventListener('pointermove', (e) => { const r = cf.getBoundingClientRect(); sy.t = ((e.clientX - r.left) / r.width - .5) * 10; sx.t = (.5 - (e.clientY - r.top) / r.height) * 10; });
        cf.addEventListener('pointerleave', () => { sx.t = 0; sy.t = 0; });
        cleanups.push(loop((dt) => { sx.step(dt); sy.step(dt); const ang = Math.hypot(sx.x, sy.x); cf.style.rotate = ang < .02 ? '' : `${sx.x.toFixed(3)} ${sy.x.toFixed(3)} 0 ${ang.toFixed(2)}deg`; }));
        magnet($('.hr-call', hero), { radius: 50, max: 6 }); }

      /* R2 story spine: line paints down, pills flare, cards slide in, logos light */
      const rtl = $('#rtl', root), rts = $$('.rt', rtl), rsvg = $('.rt-line', rtl), rb = $('.base', rsvg), ri2 = $('.ink', rsvg);
      let rlen = 0, rfr = [], seen = rts.map(() => false);
      const rbuild = () => { const r0 = rtl.getBoundingClientRect(); const pts = rts.map(x => { const r = $('.rt-pill', x).getBoundingClientRect(); return [r.left + r.width / 2 - r0.left, r.top + r.height / 2 - r0.top]; });
        const d = wobble(pts[0][0], pts.map(q => q[1]).concat([rtl.offsetHeight - 10])); rb.setAttribute('d', d); ri2.setAttribute('d', d); rlen = ri2.getTotalLength(); ri2.style.strokeDasharray = rlen;
        const span = rtl.offsetHeight - 10 - pts[0][1]; rfr = pts.map(q => (q[1] - pts[0][1]) / Math.max(1, span)); };
      const rpaint = (f) => { ri2.style.strokeDashoffset = (rlen * (1 - f)).toFixed(1); rts.forEach((x, k) => { const on = f >= rfr[k] - .005; x.classList.toggle('lit', on);
        if (on && !seen[k]) { seen[k] = true; const c = $('.rt-card', x); c.style.opacity = '1'; if (!reduce) c.animate([{ opacity: 0, transform: `translateX(${x.classList.contains('flip') ? 30 : -30}px)` }, { opacity: 1, transform: 'none' }], { duration: 450, easing: EO, fill: 'backwards' }); } }); };
      requestAnimationFrame(rbuild);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: rtl, start: 'top 70%', end: 'bottom 55%', onUpdate: (st) => rpaint(st.progress), onRefresh: (st) => { rbuild(); rpaint(st.progress); } }));
      else requestAnimationFrame(() => { rbuild(); rpaint(1); });

      /* R4 skills: cards rise, tags spring in */
      const sks = $$('#sks .sk', root);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: '#sks', start: 'top 75%', once: true, onEnter: () => sks.forEach((c, i) => {
        c.animate([{ opacity: 0, transform: 'translateY(35px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: i * 60, easing: EO, fill: 'forwards' });
        $$('li', c).forEach((t, k) => t.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1.06)', offset: .7 }, { opacity: 1, transform: 'none' }], { duration: 250, delay: 200 + i * 60 + k * 35, easing: EO, fill: 'backwards' })); }) }));
      else sks.forEach(c => c.style.opacity = '1');

      /* R5 credentials flip in */
      const crs = $$('#crs .cr', root);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: '#crs', start: 'top 80%', once: true, onEnter: () => crs.forEach((c, i) =>
        c.animate([{ opacity: 0, transform: 'rotateX(40deg)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: i * 80, easing: EO, fill: 'forwards' })) }));
      else crs.forEach(c => c.style.opacity = '1');

      /* closing band */
      const cc = $('#hClose', root), fireEl = $('.cclose-fire', cc), lines = $$('.ccl>span', cc), go = $('.hr-go', cc);
      if (hasGsap && !reduce) {
        lines.forEach(l => { fresh(l); l.style.clipPath = 'inset(-12% 100% -18% 0)'; });
        const f = gsap.fromTo(fireEl, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: cc, start: 'top bottom', end: 'center center', scrub: true } }); triggers.push(f.scrollTrigger);
        triggers.push(ScrollTrigger.create({ trigger: cc, start: 'top 70%', once: true, onEnter: () => lines.forEach((l, i) => { const an = l.animate(BR, { duration: 650, delay: i * 180, easing: EB, fill: 'forwards' });
          if (i === lines.length - 1) an.onfinish = () => { const g = $('.grad', cc).getBoundingClientRect(); fxBurst(g.right - 8, g.top + g.height * .55, 12, 40, 450); }; }) }));
      } else { fireEl.style.opacity = '1'; lines.forEach(l => l.style.clipPath = 'none'); }
      magnet($('#hSignal', cc), { radius: 80, max: 8, k: 220, d: 14 });
      go.onclick = (e) => { if (reduce || e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); pendingIntent = 'hire';
        go.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 240, easing: EO });
        const r = go.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 12, 46, 480); setTimeout(() => { location.hash = '#contact'; }, 340); };

      /* R3 artifact lightbox */
      const arts0 = $$('#howStage .art', root); arts0.forEach(a2 => { const inr = $('.art-in', a2); inr.dataset.title = $('figcaption', a2).textContent; a2.onclick = () => { if (a2.classList.contains('on')) openDoc(inr, arts0.map(x => $('.art-in', x))); }; });
      const sec = $('#howSec', root), steps = $$('.hs', sec), arts = $$('.art', sec), rail = $('#howRail', sec), svg = $('.how-line', sec), base = $('.base', svg), ink = $('.ink', svg);
      const pinned = hasGsap && !reduce && innerWidth >= 1024 && innerHeight >= 620;
      sec.classList.toggle('pinned', pinned);
      let len = 0, fr = [], act = -1;
      const build = () => { const r0 = rail.getBoundingClientRect(); const ys = steps.map(st => { const r = $('.hs-node', st).getBoundingClientRect(); return r.top + r.height / 2 - r0.top; });
        const d = wobble(10, ys); base.setAttribute('d', d); ink.setAttribute('d', d); len = ink.getTotalLength(); ink.style.strokeDasharray = len; fr = ys.map(y => (y - ys[0]) / Math.max(1, ys[ys.length - 1] - ys[0])); };
      const EOh = 'cubic-bezier(.23,1,.32,1)';
      const setAct = (i) => { if (i === act) return; const prev = act; act = i;
        steps.forEach((st, k) => st.classList.toggle('on', k === i));
        if (!pinned) return;
        if (prev > -1) { const o = arts[prev]; o.classList.remove('on'); o.animate([{ opacity: 1, transform: 'none', filter: 'blur(0px)' }, { opacity: 0, transform: 'translateY(-30px)', filter: 'blur(8px)' }], { duration: 350, easing: EOh, fill: 'forwards' }); }
        const n = arts[i]; n.classList.add('on'); n.getAnimations().forEach(an => an.cancel());
        n.animate([{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }], { duration: 350, delay: prev > -1 ? 60 : 0, easing: EOh, fill: 'both' });
        const K = ['発', '要', '調', '達', '計'], bk = $('#howBigK', sec); if (bk) { bk.textContent = K[i]; bk.animate([{ opacity: 0, filter: 'blur(10px)', transform: 'scale(1.15)' }, { opacity: .12, filter: 'blur(0px)', transform: 'none' }], { duration: 380, easing: EOh }); }
      };
      const paint = (f) => { ink.style.strokeDashoffset = (len * (1 - f)).toFixed(1); steps.forEach((st, k) => st.classList.toggle('lit', f >= fr[k] - .005)); };
      requestAnimationFrame(build);
      if (pinned) {
        const hs = { p: 0 };
        const htw = gsap.to(hs, { p: 1, ease: 'none', onUpdate: () => { paint(Math.min(1, hs.p / .8)); setAct(Math.min(4, Math.floor(hs.p * 5))); },
          scrollTrigger: { trigger: sec, start: 'top top', end: '+=250%', pin: $('.how-pin', sec), scrub: .5, onRefresh: () => { build(); paint(Math.min(1, hs.p / .8)); } } });
        triggers.push(htw.scrollTrigger, { kill: () => htw.kill() });
        setAct(0);
        if (fine) { const stage = $('#howStage', sec);
          const mv = (e) => { const a = arts[act] && $('.art-in', arts[act]); if (!a) return; const r = a.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; const rX = -y * 8, rY = x * 8, ang = Math.min(4, Math.hypot(rX, rY)); a.classList.add('tracking'); a.style.rotate = ang < .05 ? '' : `${rX.toFixed(3)} ${rY.toFixed(3)} 0 ${ang.toFixed(2)}deg`; };
          const lv = () => arts.forEach(a => { const i = $('.art-in', a); i.classList.remove('tracking'); i.style.rotate = ''; });
          stage.addEventListener('pointermove', mv); stage.addEventListener('pointerleave', lv);
          cleanups.push(() => { stage.removeEventListener('pointermove', mv); stage.removeEventListener('pointerleave', lv); lv(); }); }
      } else if (hasGsap && !reduce) {
        triggers.push(ScrollTrigger.create({ trigger: rail, start: 'top 60%', end: 'bottom 60%', onUpdate: (st) => { paint(st.progress); setAct(Math.min(4, Math.floor(st.progress * 5))); }, onRefresh: (st) => { build(); paint(st.progress); } }));
      } else { requestAnimationFrame(() => { build(); paint(1); }); steps.forEach(st => st.classList.add('on')); }
    },
    consulting(root) {
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)', ED = 'cubic-bezier(.32,.72,0,1)', cl = (v) => Math.min(1, Math.max(0, v));
      const fresh = (el) => el.getAnimations().forEach(an => an.cancel());
      const BR = [{ clipPath: 'inset(-12% 100% -18% 0)' }, { clipPath: 'inset(-12% -4% -18% 0)' }];

      /* S1 war room: four-phase brush headline, stage parallax, path flares */
      vidBg($('#wrHero', root), 'csframes/cs', 'img/cs-m.mp4', 'img/cs-still.webp', triggers, cleanups);
      const hero = $('#wrHero', root), wm = $('.wr-wm', hero), eb = $('.wr-eb', hero), sub = $('.wr-sub', hero), cta = $('.wr-cta', hero), W = $$('.wp', hero);
      [wm, eb, sub, cta, ...W].forEach(fresh);
      if (reduce) { [eb, sub, cta].forEach(x => x.style.opacity = '1'); wm.style.opacity = '.07'; W.forEach(w => w.style.clipPath = 'none'); }
      else {
        const d0 = revealBase + 450; // ~300ms after the chapter wipe clears
        wm.animate([{ opacity: 0 }, { opacity: .07 }], { duration: 900, delay: d0 - 200, easing: EO, fill: 'forwards' });
        eb.animate([{ opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: d0 - 150, easing: EO, fill: 'forwards' });
        const PH = [[0, 400], [400, 300], [700, 250], [950, 300], [1250, 260]];
        W.forEach((w, i) => { const an = w.animate(BR, { duration: PH[i][1], delay: d0 + PH[i][0], easing: EB, fill: 'forwards' });
          if (i === 1) an.onfinish = () => { const r = w.getBoundingClientRect(); fxBurst(r.right - 6, r.top + r.height * .55, 6, 28, 380); }; });
        sub.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: d0 + 1350, easing: EO, fill: 'forwards' });
        cta.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: d0 + 1450, easing: EO, fill: 'forwards' });
        if (hasGsap) {
          const mid = $('.wr-mid', hero), fore = $('.wr-fore', hero), holo = $('.wr-holo', hero), H = () => hero.offsetHeight;
          const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true };
          const a1 = gsap.fromTo(wm, { y: 0 }, { y: () => H() * .2, ease: 'none', scrollTrigger: st });
          const a2 = gsap.fromTo(mid, { y: 0 }, { y: () => H() * .15, ease: 'none', scrollTrigger: { ...st } });
          const a3 = gsap.fromTo(fore, { y: 0 }, { y: () => -H() * .1, ease: 'none', scrollTrigger: { ...st } });
          triggers.push(a1.scrollTrigger, a2.scrollTrigger, a3.scrollTrigger);
          triggers.push(ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom 30%', onUpdate: (s) => { holo.classList.toggle('flare-g', s.progress > .25); holo.classList.toggle('flare-p', s.progress > .55); } }));
        }
      }
      magnet($('.wr-btn', hero).parentElement, { radius: 60, max: 8 });

      /* S2 tracks: slide together, flex morph on hover, counter-pan, tag stagger */
      const cts = $('#cts', root), tks = $$('.ct', cts);
      if (hasGsap && !reduce) {
        tks.forEach(t => t.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: cts, start: 'top 80%', once: true, onEnter: () => tks.forEach((t, i) => { t.style.opacity = '';
          t.animate([{ opacity: 0, transform: `translateX(${i ? 50 : -50}px)` }, { opacity: 1, transform: 'none' }], { duration: 650, easing: EO, fill: 'backwards' }); }) }));
      }
      if (fine && !reduce && innerWidth >= 1024) tks.forEach(t => {
        const imgs = $$('.ct-media img', t);
        t.addEventListener('pointerenter', () => { cts.classList.add('has-hover'); tks.forEach(x => x.classList.toggle('on', x === t));
          $$('li', t).forEach((li, k) => li.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: k * 40, easing: EO, fill: 'backwards' })); });
        t.addEventListener('pointermove', (e) => { const r = t.getBoundingClientRect(); const tx = `${(-((e.clientX - r.left) / r.width - .5) * 30).toFixed(1)}px 0`; imgs.forEach(im => im.style.translate = tx); });
        t.addEventListener('pointerleave', () => { cts.classList.remove('has-hover'); t.classList.remove('on'); imgs.forEach(im => im.style.translate = ''); });
      });

      /* S3 models: staggered rise, own spring tilt */
      const cms = $$('#cms .model', root);
      cms.forEach(c => c.dataset.fx = '1');
      if (hasGsap && !reduce) {
        cms.forEach(c => c.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: '#cms', start: 'top 80%', once: true, onEnter: () => cms.forEach((c, i) => { c.style.opacity = '';
          c.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: i * 80, easing: EO, fill: 'backwards' }); }) }));
      }
      if (fine && !reduce) {
        const S = cms.map(c => ({ c, x: spring(180, 16), y: spring(180, 16) }));
        S.forEach(st => { st.c.classList.add('tracking');
          st.c.addEventListener('pointermove', (e) => { const r = st.c.getBoundingClientRect(); st.y.t = ((e.clientX - r.left) / r.width - .5) * 10; st.x.t = (.5 - (e.clientY - r.top) / r.height) * 10; });
          st.c.addEventListener('pointerleave', () => { st.x.t = 0; st.y.t = 0; }); });
        cleanups.push(loop((dt) => S.forEach(st => { st.x.step(dt); st.y.step(dt); const ang = Math.hypot(st.x.x, st.y.x); st.c.style.rotate = ang < .02 ? '' : `${st.x.x.toFixed(3)} ${st.y.x.toFixed(3)} 0 ${ang.toFixed(2)}deg`; })));
        cleanups.push(() => cms.forEach(c => c.style.rotate = ''));
      }

      /* S4 pipeline: scroll-drawn brush line, node-by-node ignition */
      const pipe = $('#pipe', root), pns = $$('.pn', pipe), svg = $('.pipe-line', pipe), base = $('.base', svg), ink = $('.ink', svg);
      let len = 0, fr = [], wasLit = pns.map(() => false);
      const horiz = () => innerWidth >= 768;
      const build = () => { const r0 = pipe.getBoundingClientRect(); const pts = pns.map(n => { const r = $('.pn-node', n).getBoundingClientRect(); return [r.left + r.width / 2 - r0.left, r.top + r.height / 2 - r0.top]; });
        let d;
        if (horiz()) { const y = pts[0][1]; d = `M${pts[0][0].toFixed(1)} ${y}`; for (let k = 1; k < pts.length; k++) { const a = pts[k - 1][0], b2 = pts[k][0], m = (b2 - a) / 3, w = k % 2 ? 3 : -3; d += ` C${(a + m).toFixed(1)} ${y + w} ${(b2 - m).toFixed(1)} ${y - w} ${b2.toFixed(1)} ${y}`; } fr = pts.map(p => (p[0] - pts[0][0]) / Math.max(1, pts[pts.length - 1][0] - pts[0][0])); }
        else { d = wobble(pts[0][0], pts.map(p => p[1])); fr = pts.map(p => (p[1] - pts[0][1]) / Math.max(1, pts[pts.length - 1][1] - pts[0][1])); }
        base.setAttribute('d', d); ink.setAttribute('d', d); len = ink.getTotalLength(); ink.style.strokeDasharray = len; };
      const fire = (n, k) => { n.classList.add('flash'); setTimeout(() => n.classList.remove('flash'), 700);
        if (k === 4) { const r = $('.pn-badge', n).getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 10, 34, 420); } };
      const paint = (f) => { ink.style.strokeDashoffset = (len * (1 - f)).toFixed(1); pns.forEach((n, k) => { const on = f >= fr[k] - .005; n.classList.toggle('lit', on); if (on && !wasLit[k] && !reduce) fire(n, k); wasLit[k] = on; }); };
      requestAnimationFrame(build);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: pipe, start: () => horiz() ? 'top 72%' : 'top 66%', end: () => horiz() ? 'bottom 38%' : 'bottom 50%', onUpdate: (st) => paint(st.progress), onRefresh: (st) => { build(); paint(st.progress); } }));
      else requestAnimationFrame(() => { build(); paint(1); });

      /* S5 results: metric count-up with landing flash, VIEW ring pull, shared-element morph */
      const grid = $('#consultGrid', root), cards = $$('.case-card', grid);
      const bigs = cards.map(c => $('.media .big', c));
      bigs.forEach(bg => { if (bg.dataset.ready) return; const tn = bg.firstChild; if (!tn || tn.nodeType !== 3) return; const m = tn.textContent.match(/^(\D*)([\d.]+)(.*)$/); if (!m) return;
        bg.dataset.ready = '1'; bg.dataset.to = m[2]; bg.dataset.dec = (m[2].split('.')[1] || '').length; const sp = document.createElement('span'); sp.className = 'n'; sp.textContent = m[2]; bg.replaceChild(document.createTextNode(m[1]), tn); bg.insertBefore(sp, bg.childNodes[1]); if (m[3]) bg.insertBefore(document.createTextNode(m[3]), sp.nextSibling); });
      if (hasGsap && !reduce) {
        bigs.forEach(bg => { const n = $('.n', bg); if (n) n.textContent = (0).toFixed(+bg.dataset.dec); });
        triggers.push(ScrollTrigger.create({ trigger: grid, start: 'top 75%', once: true, onEnter: () => {
          const t0 = performance.now();
          const step = (t) => { const q = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - q, 3);
            bigs.forEach(bg => { const n = $('.n', bg); if (n) n.textContent = (+bg.dataset.to * e).toFixed(+bg.dataset.dec); });
            if (q < 1) requestAnimationFrame(step);
            else bigs.forEach(bg => { bg.classList.add('hit'); const r = bg.getBoundingClientRect(); fxBurst(r.left + Math.min(r.width, 120) * .5, r.top + 30, 8, 30, 400); setTimeout(() => bg.classList.remove('hit'), 650); }); };
          requestAnimationFrame(step); } }));
      }
      if (fine && !reduce) {
        const vx = spring(150, 15), vy = spring(150, 15); let over = null, inG = false;
        const mv = (e) => { if (over) { const r = over.getBoundingClientRect(); vx.t = e.clientX + (r.left + r.width / 2 - e.clientX) * .25; vy.t = e.clientY + (r.top + r.height / 2 - e.clientY) * .25; } else { vx.t = e.clientX; vy.t = e.clientY; } };
        cards.forEach(c => { c.addEventListener('pointerenter', (e) => { over = c; if (!inG) { vx.x = e.clientX; vy.x = e.clientY; } inG = true; viewCursor.classList.add('on'); });
          c.addEventListener('pointerleave', () => { over = null; inG = false; viewCursor.classList.remove('on'); }); });
        addEventListener('pointermove', mv, { passive: true });
        cleanups.push(loop((dt) => { vx.step(dt); vy.step(dt); if (over) viewCursor.style.translate = `${vx.x.toFixed(1)}px ${vy.x.toFixed(1)}px`; }));
        cleanups.push(() => { removeEventListener('pointermove', mv); viewCursor.classList.remove('on'); });
      }
      cards.forEach(c => c.onclick = (e) => {
        if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
        e.preventDefault(); viewCursor.classList.remove('on');
        const im = $('.media img', c), r = $('.media', c).getBoundingClientRect();
        const ov = document.createElement('div'); ov.className = 'case-morph'; ov.style.backgroundImage = `url(${im.dataset.full || im.currentSrc || im.src})`; document.body.appendChild(ov);
        ov.animate([{ clipPath: `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`, filter: 'brightness(.7)' }, { clipPath: 'inset(0px 0px 0px 0px)', filter: 'brightness(.5)' }], { duration: 500, easing: 'cubic-bezier(.77,0,.175,1)', fill: 'forwards' }).onfinish = () => {
          navOpts = { direct: true }; location.hash = c.getAttribute('href');
          setTimeout(() => ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' }).onfinish = () => ov.remove(), 60); };
      });

      /* S6 single-open accordion with measured height */
      const faq = $('#cFaq', root), items = $$('details', faq);
      items.forEach(d => { const a = $('.ans', d); if (!a.firstElementChild || a.firstElementChild.tagName !== 'DIV') { const w = document.createElement('div'); while (a.firstChild) w.appendChild(a.firstChild); a.appendChild(w); }
        d.classList.toggle('on', d.open);
        $('summary', d).onclick = (e) => { e.preventDefault(); toggleQ(d, !d.classList.contains('on')); }; });
      function toggleQ(d, open) {
        const a = $('.ans', d), inner = a.firstElementChild;
        if (open) items.forEach(o => { if (o !== d && o.classList.contains('on')) toggleQ(o, false); });
        d.classList.toggle('on', open);
        if (reduce) { d.open = open; return; }
        if (open) { d.open = true; const h = a.scrollHeight; a.animate([{ height: '0px' }, { height: h + 'px' }], { duration: 260, easing: ED }).onfinish = () => {
            inner.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 200, easing: EO }); };
          inner.style.opacity = '0'; setTimeout(() => inner.style.opacity = '', 260); }
        else { const h = a.scrollHeight; a.animate([{ height: h + 'px' }, { height: '0px' }], { duration: 200, easing: ED }).onfinish = () => { if (!d.classList.contains('on')) d.open = false; }; }
      }

      /* S6 closing: fire horizon warms, lines brush in, magnetic signal */
      const cc = $('#cClose', root), fireEl = $('.cclose-fire', cc), lines = $$('.ccl>span', cc), go = $('.cc-go', cc);
      if (hasGsap && !reduce) {
        lines.forEach(l => { fresh(l); l.style.clipPath = 'inset(-12% 100% -18% 0)'; });
        const f = gsap.fromTo(fireEl, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: cc, start: 'top bottom', end: 'center center', scrub: true } }); triggers.push(f.scrollTrigger);
        triggers.push(ScrollTrigger.create({ trigger: cc, start: 'top 70%', once: true, onEnter: () => lines.forEach((l, i) => { const an = l.animate(BR, { duration: 650, delay: i * 180, easing: EB, fill: 'forwards' });
          if (i === lines.length - 1) an.onfinish = () => { const g = $('.grad', cc).getBoundingClientRect(); fxBurst(g.right - 8, g.top + g.height * .55, 12, 40, 450); }; }) }));
      } else { fireEl.style.opacity = '1'; lines.forEach(l => l.style.clipPath = 'none'); }
      magnet($('#cSignal', cc), { radius: 80, max: 8, k: 220, d: 14 });
      go.onclick = (e) => {
        if (reduce || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault(); pendingIntent = 'consulting';
        go.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 240, easing: EO });
        const r = go.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 12, 46, 480);
        setTimeout(() => { location.hash = '#contact'; }, 340);
      };
    },
    partner(root) {
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)', cl = (v) => Math.min(1, Math.max(0, v));
      const fresh = (el) => el.getAnimations().forEach(an => an.cancel());
      const BR = [{ clipPath: 'inset(-12% 100% -18% 0)' }, { clipPath: 'inset(-12% -4% -18% 0)' }];

      /* P1 hero: brush headline, team silhouettes + avatar lock-in, glyph ring link */
      vidBg($('#ppHero', root), 'ppframes/ps', 'img/pp-m.mp4', 'img/pp-still.webp', triggers, cleanups);
      const hero = $('#ppHero', root), wm = $('.wr-wm', hero), eb = $('.wr-eb', hero), sub = $('.wr-sub', hero), cta = $('.wr-cta', hero);
      const q1 = $('.q1', hero), q2 = $('.q2', hero), q3 = $('.q3', hero), sils = $$('.tm-sil', hero), me = $('.tm-me', hero), ring = $('.tm-ring', hero), team = $('.tm-team', hero);
      [wm, eb, sub, cta, q1, q2, q3, me, ring, ...sils].forEach(fresh);
      if (reduce) { [eb, sub, cta, q3, me].forEach(x => x.style.opacity = '1'); sils.forEach(x => x.style.opacity = '.6'); wm.style.opacity = '.07'; ring.style.opacity = '.8'; q1.style.clipPath = q2.style.clipPath = 'none'; }
      else {
        const d0 = revealBase + 450;
        wm.animate([{ opacity: 0 }, { opacity: .07 }], { duration: 900, delay: d0 - 200, easing: EO, fill: 'forwards' });
        eb.animate([{ opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: d0 - 150, easing: EO, fill: 'forwards' });
        q1.animate(BR, { duration: 400, delay: d0, easing: EB, fill: 'forwards' });
        q2.animate(BR, { duration: 350, delay: d0 + 400, easing: EB, fill: 'forwards' }).onfinish = () => { const r = q2.getBoundingClientRect(); fxBurst(r.right - 6, r.top + r.height * .55, 8, 35, 400); };
        q3.animate([{ opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0px)' }], { duration: 350, delay: d0 + 750, easing: EO, fill: 'forwards' });
        sub.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: d0 + 1100, easing: EO, fill: 'forwards' });
        cta.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: d0 + 1200, easing: EO, fill: 'forwards' });
        sils.forEach((sl, i) => sl.animate([{ opacity: 0, transform: 'translateX(-40px)' }, { opacity: .6, transform: 'none' }], { duration: 600, delay: d0 + 200 + i * 60, easing: EO, fill: 'forwards' }));
        me.animate([{ opacity: 0, transform: 'translateX(40px)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: d0 + 350, easing: EO, fill: 'forwards' }).onfinish = () => {
          ring.animate([{ opacity: 0, transform: 'scale(.8)' }, { opacity: .8, transform: 'scale(1)' }], { duration: 500, easing: EO, fill: 'forwards' }); ring.classList.add('on');
          const r = me.getBoundingClientRect(); if (r.width) fxBurst(r.left + r.width / 2, r.bottom - 10, 10, 40, 450); };
        if (hasGsap) {
          const H = () => hero.offsetHeight, st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true };
          const a1 = gsap.fromTo(wm, { y: 0 }, { y: () => H() * .2, ease: 'none', scrollTrigger: st });
          const a2 = gsap.fromTo(team, { y: 0 }, { y: () => H() * .15, ease: 'none', scrollTrigger: { ...st } });
          triggers.push(a1.scrollTrigger, a2.scrollTrigger);
        }
      }

      /* P2 puzzle: directional snap-in, amber seam flash, lift on hover */
      const pts = $$('.pt', root); pts.forEach(t => t.dataset.fx = '1');
      if (hasGsap && !reduce) {
        const FROM = [[-30, -20], [30, -20], [-30, 20], [30, 20], [0, 40]];
        pts.forEach(t => t.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: '#pts', start: 'top 80%', once: true, onEnter: () => pts.forEach((t, i) => { t.style.opacity = '';
          t.animate([{ opacity: 0, transform: `translate(${FROM[i][0]}px,${FROM[i][1]}px)` }, { opacity: 1, transform: 'none' }], { duration: 550, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards' }).onfinish = () => { t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 420); }; }) }));
      }

      /* P3 spine: line paints down, icons draw, nodes flare */
      const sp = $('#pSpine', root), steps = $$('.ps', sp), svg = $('.ps-line', sp), base = $('.base', svg), ink = $('.ink', svg);
      let len = 0, fr = [];
      const build = () => { const r0 = sp.getBoundingClientRect(); const pts2 = steps.map(st => { const r = $('.ps-node', st).getBoundingClientRect(); return [r.left + r.width / 2 - r0.left, r.top + r.height / 2 - r0.top]; });
        const d = wobble(pts2[0][0], pts2.map(q => q[1])); base.setAttribute('d', d); ink.setAttribute('d', d); len = ink.getTotalLength(); ink.style.strokeDasharray = len;
        fr = pts2.map(q => (q[1] - pts2[0][1]) / Math.max(1, pts2[pts2.length - 1][1] - pts2[0][1])); };
      const hps = $$('#hiwStage .hp', root); let hpAct = 0;
      const setHp = (i) => { if (i === hpAct) return; hpAct = i; hps.forEach((h, k) => h.classList.toggle('on', k === i)); };
      const paint = (f) => { ink.style.strokeDashoffset = (len * (1 - f)).toFixed(1); let a2 = 0; steps.forEach((st, k) => { const on = f >= fr[k] - .005; st.classList.toggle('lit', on); if (on) a2 = k; }); setHp(a2); };
      /* step 04 panel: live Dhaka clock next to the visitor's own clock */
      { const fmt = (tz) => new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false, ...(tz ? { timeZone: tz } : {}) }).format(new Date());
        const tick = () => { const d = $('#tzDhaka', root), y = $('#tzYou', root), df = $('#tzDiff', root); if (!d) return; d.textContent = fmt('Asia/Dhaka'); y.textContent = fmt();
          const off = (360 + new Date().getTimezoneOffset()) / 60; df.textContent = off === 0 ? 'You are on Dhaka time.' : `Dhaka is ${Math.abs(off)} hour${Math.abs(off) === 1 ? '' : 's'} ${off > 0 ? 'ahead of' : 'behind'} you.`; };
        tick(); const tid = setInterval(tick, 20000); cleanups.push(() => clearInterval(tid)); }
      { const fxc = $('#hiwStage .hiw-fx', root); if (fxc) runLive(fxc, 'embers', .6, (fn) => cleanups.push(fn)); }
      requestAnimationFrame(build);
      if (hasGsap && !reduce) triggers.push(ScrollTrigger.create({ trigger: sp, start: 'top 65%', end: 'bottom 55%', onUpdate: (st) => paint(st.progress), onRefresh: (st) => { build(); paint(st.progress); } }));
      else requestAnimationFrame(() => { build(); paint(1); });

      /* P4 fanned deliverables */
      const fan = $('#fan', root), docs = $$('.doc', fan);
      docs.forEach(d => d.onclick = () => openDoc(d));
      if (hasGsap && !reduce && innerWidth >= 768) {
        fan.classList.add('pinned');
        const END = [[-320, 20, -12], [-110, 0, -4], [110, 0, 4], [320, 20, 12]], PILE = [[-6, 10, -1.5], [4, 4, 1], [-2, -3, -.8], [5, -9, .6]];
        const apply = (p) => { const k = Math.min(1, fan.clientWidth / 1100);
          docs.forEach((d, i) => { const a = PILE[i], z = END[i];
            d.style.setProperty('--fx', (a[0] + (z[0] * k - a[0]) * p).toFixed(1) + 'px'); d.style.setProperty('--fy', (a[1] + (z[1] - a[1]) * p).toFixed(1) + 'px'); d.style.setProperty('--fr', (a[2] + (z[2] - a[2]) * p).toFixed(2) + 'deg'); d.style.zIndex = String(i + 1); }); };
        const state = { p: 0 }; apply(0);
        const tw = gsap.to(state, { p: 1, ease: 'none', onUpdate: () => apply(state.p), scrollTrigger: { trigger: fan, start: 'top top', end: '+=150%', pin: true, scrub: .6 } });
        triggers.push(tw.scrollTrigger, { kill: () => tw.kill() });
      } else {
        fan.classList.remove('pinned');
        if (!reduce && innerWidth < 768) { const stg = $('#fanStage', fan); let i = 0, held = false, vis = false;
          const ob = new IntersectionObserver(([e]) => vis = e.isIntersecting); ob.observe(stg);
          stg.addEventListener('pointerdown', () => held = true, { passive: true });
          const id = setInterval(() => { if (!vis || held) return; i = (i + 1) % docs.length; stg.scrollTo({ left: docs[i].offsetLeft - (stg.clientWidth - docs[i].offsetWidth) / 2, behavior: 'smooth' }); }, 3500);
          cleanups.push(() => { clearInterval(id); ob.disconnect(); }); }
      }

      /* P5 terms: staggered rise, counter-parallax illustration */
      const tms = $$('#tms .tm', root); tms.forEach(t => t.dataset.fx = '1');
      if (hasGsap && !reduce) {
        tms.forEach(t => t.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: '#tms', start: 'top 80%', once: true, onEnter: () => tms.forEach((t, i) => { t.style.opacity = '';
          t.animate([{ opacity: 0, transform: 'translateY(35px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: i * 80, easing: EO, fill: 'backwards' }); }) }));
      }
      if (fine && !reduce) tms.forEach(t => { const ill = $('.tm-ill', t);
        t.addEventListener('pointermove', (e) => { const r = t.getBoundingClientRect(); ill.style.translate = `${(-((e.clientX - r.left) / r.width - .5) * 12).toFixed(1)}px ${(-((e.clientY - r.top) / r.height - .5) * 12).toFixed(1)}px`; });
        t.addEventListener('pointerleave', () => ill.style.translate = ''); });

      /* closing CTA */
      const cc = $('#pClose', root), fireEl = $('.cclose-fire', cc), lines = $$('.ccl>span', cc), go = $('.cc-go', cc);
      if (hasGsap && !reduce) {
        lines.forEach(l => { fresh(l); l.style.clipPath = 'inset(-12% 100% -18% 0)'; });
        const f = gsap.fromTo(fireEl, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: cc, start: 'top bottom', end: 'center center', scrub: true } }); triggers.push(f.scrollTrigger);
        triggers.push(ScrollTrigger.create({ trigger: cc, start: 'top 70%', once: true, onEnter: () => lines.forEach((l, i) => { const an = l.animate(BR, { duration: 650, delay: i * 180, easing: EB, fill: 'forwards' });
          if (i === lines.length - 1) an.onfinish = () => { const g = $('.grad', cc).getBoundingClientRect(); fxBurst(g.right - 8, g.top + g.height * .55, 12, 40, 450); }; }) }));
      } else { fireEl.style.opacity = '1'; lines.forEach(l => l.style.clipPath = 'none'); }
      magnet($('#pSignal', cc), { radius: 80, max: 8, k: 220, d: 14 });
      go.onclick = (e) => {
        if (reduce || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault(); pendingIntent = 'partner';
        go.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 240, easing: EO });
        const r = go.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 12, 46, 480);
        setTimeout(() => { location.hash = '#contact'; }, 340);
      };
      magnet($('.wr-btn', hero).parentElement, { radius: 60, max: 8 });
    },
    about(root) {
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)', cl = (v) => Math.min(1, Math.max(0, v));
      const fresh = (el) => el.getAnimations().forEach(an => an.cancel());
      const BRUSH = [{ clipPath: 'inset(-10% 100% -15% 0)' }, { clipPath: 'inset(-10% -4% -15% 0)' }];

      /* A1 intro: kanji drift, eyebrow, two-part brush headline, burst on the full stop */
      const hero = $('#abHero', root), wm = $('.ab-wm', hero), eb = $('.ab-eb', hero), l1 = $('.ab-l1', hero), l2 = $('.ab-l2>span', hero), sub = $('.ab-sub', hero);
      [wm, eb, l1, l2, sub].forEach(fresh);
      if (reduce) { eb.style.opacity = sub.style.opacity = '1'; wm.style.opacity = '.07'; l1.style.clipPath = l2.style.clipPath = 'none'; }
      else {
        const d0 = Math.max(0, revealBase - 100); // lands ~550ms after the route change, as the wipe clears
        wm.animate([{ opacity: 0, scale: .9 }, { opacity: .07, scale: 1 }], { duration: 900, delay: d0, easing: EO, fill: 'forwards' });
        eb.animate([{ opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'none' }], { duration: 350, delay: d0, easing: EO, fill: 'forwards' });
        l1.animate(BRUSH, { duration: 650, delay: d0 + 120, easing: EB, fill: 'forwards' });
        l2.animate(BRUSH, { duration: 650, delay: d0 + 270, easing: EB, fill: 'forwards' }).onfinish = () => {
          const r = l2.getBoundingClientRect(); fxBurst(r.right - 12, r.bottom - r.height * .2, 10, 35, 400);
          sub.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 100, easing: EO, fill: 'forwards' }); };
        if (hasGsap) { const t = gsap.fromTo(wm, { y: 0 }, { y: () => hero.offsetHeight * .25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } }); triggers.push(t.scrollTrigger); }
      }

      /* A1 background: the circuits-to-embers video, scrubbed by scroll on desktop like the home hero */
      vidBg(hero, 'abframes/as', 'img/ab-m.mp4', 'img/ab-still.webp', triggers, cleanups);

      /* A2 four chapters: 400vh pin, segmented meter, blurred text cycle, torn-parchment wipes, camera settle */
      const org = $('#origin', root), ocs = $$('.oc', org), scenes = $$('.scene', org), edges = $$('.scene-edge', org), segs = $$('.origin-meter li', org);
      const pinOrigin = hasGsap && !reduce && innerWidth >= 1024;
      org.classList.toggle('pinned', pinOrigin);
      if (pinOrigin) {
        let sd = 11; const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
        const U = []; for (let u = -1.2; u <= 2.21; u += .07) U.push([u, (rnd() - .5) * .07]);
        const poly = (c) => 'polygon(' + U.map(([u, j]) => `${((u + j * .7) * 100).toFixed(2)}% ${((c - u + j * .7) * 100).toFixed(2)}%`).concat(['220% 360%', '-120% 360%']).join(',') + ')';
        const HIDE = 'polygon(0 0,0 0,0 0)', WW = .08, TW = .06, eio = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const load = (i) => { const im = scenes[i]; if (im && im.dataset.src) { im.src = im.dataset.src; im.removeAttribute('data-src'); } };
        const upd = (p) => {
          const tw = [1, 1, 2, 3].map((b, i) => i === 0 ? 1 : cl((p - (b * .25 - WW / 2)) / WW));
          const tt = [1, 1, 2, 3].map((b, i) => i === 0 ? 1 : cl((p - (b * .25 - TW / 2)) / TW));
          for (let i = 1; i < 4; i++) { const t = tw[i], c = 2.12 - 2.3 * eio(t);
            scenes[i].style.clipPath = t <= 0 ? HIDE : t >= 1 ? 'none' : poly(c);
            edges[i - 1].style.clipPath = t <= 0 || t >= 1 ? HIDE : poly(c - .014); }
          scenes.forEach((sc, k) => { const lp = cl((p - Math.max(0, k * .25 - WW / 2)) / (.25 + (k ? WW / 2 : 0))); sc.style.transform = `translateX(${(-15 * lp).toFixed(2)}px) scale(${(1.08 - .08 * lp).toFixed(4)})`; });
          ocs.forEach((o, k) => { const inT = k === 0 ? 1 : cl((tt[k] - .4) / .6), outT = k === 3 ? 0 : cl(tt[k + 1] / .6), v = inT * (1 - outT);
            o.style.opacity = v.toFixed(3); o.style.transform = `translateY(${(28 * (1 - inT) - 28 * outT).toFixed(1)}px)`; o.style.filter = `blur(${(6 * Math.max(1 - inT, outT)).toFixed(2)}px)`;
            const kj = $('.oc-k', o); kj.style.transform = `scale(${(1.25 - .25 * inT).toFixed(3)})`; o.setAttribute('aria-hidden', String(v < .5)); });
          const cur = Math.min(3, Math.floor(p * 4));
          segs.forEach((li, k) => { li.classList.toggle('on', k === cur); $('b', li).style.transform = `scaleY(${cl((p - k * .25) / .25).toFixed(4)})`; });
          load(cur + 1); load(cur + 2 > 3 ? 3 : cur + 1);
        };
        const state = { p: 0 };
        const tl = gsap.to(state, { p: 1, ease: 'none', onUpdate: () => upd(state.p), scrollTrigger: { trigger: org, start: 'top top', end: '+=400%', pin: $('.origin-pin', org), scrub: .6, anticipatePin: 1 } });
        triggers.push(tl.scrollTrigger, { kill: () => tl.kill() });
        upd(0);
      } else ocs.forEach(o => { ['opacity', 'transform', 'filter'].forEach(pr => o.style[pr] = ''); o.removeAttribute('aria-hidden'); $('.oc-k', o).style.transform = ''; });

      /* A3 principles: rules burn in, lines unmask, kanji stamps down */
      const prs = $('#prs', root), rules = $$('.pr-rule', prs), lines = $$('.ln>span', prs), rows = $$('.pr', prs);
      if (hasGsap && !reduce) {
        rules.forEach(r => r.style.transform = 'scaleX(0)'); lines.forEach(l => l.style.transform = 'translateY(105%)'); $$('.pr-k', prs).forEach(k => k.style.opacity = '0');
        const settle = (el, prop) => (an) => { an.target ? 0 : 0; el.style[prop] = ''; el.getAnimations().forEach(x => x.cancel()); if (prop === 'opacity') el.style.transform = ''; };
        triggers.push(ScrollTrigger.create({ trigger: prs, start: 'top 70%', once: true, onEnter: () => {
          rules.forEach((r, i) => r.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 500, delay: i * 120, easing: EO, fill: 'forwards' }).onfinish = settle(r, 'transform'));
          rows.forEach((row, i) => { const base = 120 + i * 120;
            $$('.ln>span', row).forEach((l, j) => l.animate([{ transform: 'translateY(105%)' }, { transform: 'none' }], { duration: 450, delay: base + j * 90, easing: EO, fill: 'forwards' }).onfinish = settle(l, 'transform'));
            const k = $('.pr-k', row);
            k.animate([{ transform: 'scale(1.4)', opacity: 0 }, { transform: 'scale(.94)', opacity: .35, offset: .7 }, { transform: 'scale(1)', opacity: .35 }], { duration: 300, delay: base + 60, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' }).onfinish = settle(k, 'opacity'); });
        } }));
      }

      /* A4 side quests: staggered leap, spring tilt, category flare, live screenshot drift */
      const vqs = $$('.vq', root);
      vqs.forEach(c => c.dataset.fx = '1'); // own tilt; skip the generic card handler
      if (hasGsap && !reduce) {
        vqs.forEach(c => c.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: '#vqs', start: 'top 80%', once: true, onEnter: () => vqs.forEach((c, i) => { c.style.opacity = '';
          c.animate([{ opacity: 0, transform: 'translateY(40px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: i * 70, easing: EO, fill: 'backwards' }); }) }));
      }
      if (fine && !reduce) {
        const S = vqs.map(c => ({ c, x: spring(180, 16), y: spring(180, 16) }));
        S.forEach(st => { st.c.addEventListener('pointermove', (e) => { const r = st.c.getBoundingClientRect(); st.y.t = ((e.clientX - r.left) / r.width - .5) * 12; st.x.t = (.5 - (e.clientY - r.top) / r.height) * 12; });
          st.c.addEventListener('pointerleave', () => { st.x.t = 0; st.y.t = 0; }); st.c.classList.add('tracking'); });
        cleanups.push(loop((dt) => S.forEach(st => { const a = st.x.step(dt), b = st.y.step(dt); if (!a && !b && !st.x.x && !st.y.x) return; const ang = Math.hypot(st.x.x, st.y.x);
          st.c.style.rotate = ang < .02 ? '' : `${st.x.x.toFixed(3)} ${st.y.x.toFixed(3)} 0 ${ang.toFixed(2)}deg`; })));
        cleanups.push(() => vqs.forEach(c => { c.style.rotate = ''; }));
      }

      /* A5 travel: Instagram-style grid. Tiles rise in a stagger, double-tap pops a heart, tap opens the viewer */
      { const grid = $('#igGrid', root), tiles = $$('.ig-tile', grid), hls = $$('.ig-hl', root), view = $('#igView'), vImg = $('#igImg', view), like = $('#igLike', view), cnt = $('#igCount', view), big = $('.ig-big', view);
        if (view.parentElement !== document.body) document.body.appendChild(view);
        const srcs = tiles.map(t => $('img', t).getAttribute('src')), liked = new Set(); let cur = 0, lastFocus = null;
        const pop = (el, big2) => { if (reduce) return; el.animate([{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1.15)', offset: .35 }, { opacity: 1, transform: 'scale(.95)', offset: .55 }, { opacity: 1, transform: 'scale(1)', offset: .75 }, { opacity: 0, transform: big2 ? 'scale(1.1) translateY(-14px)' : 'scale(1) translateY(-10px)' }], { duration: 900, easing: 'cubic-bezier(.23,1,.32,1)' }); };
        const paintLike = () => { const on = liked.has(cur); like.setAttribute('aria-pressed', String(on)); like.setAttribute('aria-label', on ? 'Unlike' : 'Like'); cnt.textContent = on ? 'Liked' : ''; };
        const show = (i, dir = 0) => { cur = (i + srcs.length) % srcs.length; vImg.src = srcs[cur]; vImg.alt = `Travel photo ${cur + 1} of ${srcs.length}`; paintLike();
          if (!reduce && dir) vImg.animate([{ opacity: 0, transform: `translateX(${dir * 28}px)` }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.23,1,.32,1)' }); };
        const open = (i) => { lastFocus = document.activeElement; show(i); view.hidden = false; if (lenis) lenis.stop(); document.documentElement.style.overflow = 'hidden';
          if (!reduce) { view.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' }); $('.ig-card', view).animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.23,1,.32,1)' }); }
          $('#igX', view).focus(); };
        const close = () => { if (view.hidden) return; view.hidden = true; document.documentElement.style.overflow = ''; if (lenis) lenis.start(); if (lastFocus) lastFocus.focus(); };
        const toggleLike = (force) => { const on = force === undefined ? !liked.has(cur) : force; on ? liked.add(cur) : liked.delete(cur); paintLike(); if (on && !reduce) like.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'cubic-bezier(.34,1.56,.64,1)' }); };
        tiles.forEach((t, i) => { let tmr = 0;
          t.addEventListener('click', () => { if (tmr) { clearTimeout(tmr); tmr = 0; liked.add(i); pop($('.ig-pop', t)); return; } tmr = setTimeout(() => { tmr = 0; open(i); }, 260); }); });
        hls.forEach(h => h.addEventListener('click', () => open(+h.dataset.i)));
        let lastTap = 0; vImg.parentElement.addEventListener('click', () => { const now = performance.now(); if (now - lastTap < 300) { toggleLike(true); pop(big, true); lastTap = 0; } else lastTap = now; });
        like.onclick = () => toggleLike(); $('#igX', view).onclick = close; $('#igPrev', view).onclick = () => show(cur - 1, -1); $('#igNext', view).onclick = () => show(cur + 1, 1);
        view.addEventListener('click', (e) => { if (e.target === view) close(); });
        const key = (e) => { if (view.hidden) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(cur + 1, 1); else if (e.key === 'ArrowLeft') show(cur - 1, -1);
          else if (e.key === 'Tab') { const f = $$('button, a[href]', view).filter(x => x.offsetParent); const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } } };
        addEventListener('keydown', key); cleanups.push(() => { removeEventListener('keydown', key); close(); });
        let sx = 0; view.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true }); view.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); });
        if (!reduce) {
          [...tiles, ...hls].forEach(x => x.style.opacity = '0');
          const ob = new IntersectionObserver((es) => es.forEach(e => { if (!e.isIntersecting) return; ob.unobserve(e.target); const el = e.target, k = el.classList.contains('ig-hl') ? hls.indexOf(el) : tiles.indexOf(el) % 4 + Math.floor(tiles.indexOf(el) / 4);
            el.animate([{ opacity: 0, transform: 'translateY(26px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: k * 60, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards' }); el.style.opacity = ''; }), { threshold: .15 });
          [...tiles, ...hls].forEach(x => ob.observe(x)); cleanups.push(() => ob.disconnect());
        } }

      /* A5 portrait + closing CTA */
      const close = $('#abClose', root), me = $('#me', close), meIn = $('.me-in', me), brush = $('.me-brush', me), c1 = $('.ab-cta-h .c1', close), c2 = $('.ab-cta-h .c2>span', close);
      if (!meIn.dataset.torn) { let q = 5; const r2 = () => (q = (q * 9301 + 49297) % 233280) / 233280; const pts = [], n = 18, j = () => (1 + r2() * 2.6).toFixed(2);
        for (let i = 0; i <= n; i++) pts.push(`${(i / n * 100).toFixed(1)}% ${j()}%`); for (let i = 1; i <= n; i++) pts.push(`${100 - j()}% ${(i / n * 100).toFixed(1)}%`);
        for (let i = n - 1; i >= 0; i--) pts.push(`${(i / n * 100).toFixed(1)}% ${100 - j()}%`); for (let i = n - 1; i >= 1; i--) pts.push(`${j()}% ${(i / n * 100).toFixed(1)}%`);
        meIn.style.clipPath = `polygon(${pts.join(',')})`; meIn.dataset.torn = '1'; me.style.filter = 'drop-shadow(0 0 1.5px rgba(252,160,58,.95)) drop-shadow(0 0 14px rgba(250,116,2,.3))'; }
      if (hasGsap && !reduce) {
        me.style.clipPath = 'inset(0 100% 0 0)'; [c1, c2].forEach(x => { fresh(x); x.style.clipPath = 'inset(-10% 100% -15% 0)'; });
        triggers.push(ScrollTrigger.create({ trigger: close, start: 'top 72%', once: true, onEnter: () => {
          me.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: 850, easing: EB, fill: 'forwards' }).onfinish = (e) => { me.style.clipPath = 'none'; me.getAnimations().forEach(x => x.cancel()); };
          brush.animate([{ left: '-16%', opacity: 0 }, { opacity: .95, offset: .15 }, { opacity: .95, offset: .8 }, { left: '100%', opacity: 0 }], { duration: 850, easing: EB });
          c1.animate(BRUSH, { duration: 650, delay: 200, easing: EB, fill: 'forwards' });
          c2.animate(BRUSH, { duration: 650, delay: 350, easing: EB, fill: 'forwards' }).onfinish = () => { const r = c2.getBoundingClientRect(); fxBurst(r.right - 12, r.bottom - r.height * .2, 12, 40, 450); };
        } }));
      } else { me.style.clipPath = 'none'; [c1, c2].forEach(x => x.style.clipPath = 'none'); }
      { const fxc = $('.abc-fx', close); if (fxc) runLive(fxc, 'embers', .7, (fn) => cleanups.push(fn)); }
      if (hasGsap && !reduce) { const pl = $$('.abc-paths li', close), sub2 = $('.abc-sub', close), soc = $('.abc-soc', close), tag = $('.me-tag', close), eb2 = $('.ab-cta .ab-eb', close);
        [eb2, sub2, soc, tag, ...pl].forEach(x => x.style.opacity = '0');
        triggers.push(ScrollTrigger.create({ trigger: close, start: 'top 72%', once: true, onEnter: () => {
          const up = (x, d) => { x.style.opacity = '1'; x.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: d, easing: EO, fill: 'backwards' }); };
          up(eb2, 0); up(sub2, 900); pl.forEach((x, i) => up(x, 1000 + i * 80)); up(soc, 1300);
          tag.style.opacity = ''; tag.animate([{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 800, easing: EO, fill: 'backwards' }); } }));
        const ph = $('.me-ph img', close); const t3 = gsap.fromTo(me, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: close, start: 'top bottom', end: 'bottom top', scrub: true } }); triggers.push(t3.scrollTrigger);
        const t4 = gsap.fromTo($('.abc-k', close), { y: 60 }, { y: -60, ease: 'none', scrollTrigger: { trigger: close, start: 'top bottom', end: 'bottom top', scrub: true } }); triggers.push(t4.scrollTrigger); }
      const sigWrap = $('#signal', close), go = $('.sig-go', sigWrap);
      magnet(sigWrap, { radius: 80, max: 10, k: 220, d: 14 });
      go.onclick = (e) => {
        if (reduce || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault(); pendingIntent = 'other';
        go.animate([{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 240, easing: EO });
        const r = go.getBoundingClientRect(); fxBurst(r.left + r.width / 2, r.top + r.height / 2, 12, 46, 480);
        setTimeout(() => { location.hash = '#contact'; }, 340);
      };
    },
    contact(root) {
      setIntent(pendingIntent || currentIntent); pendingIntent = null;
      if (!$('#cform').hidden || $('#sent').hidden) { $('#sent').hidden = true; $('#cform').hidden = false; }
      const EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)';
      const wm = $('.k-wm', root), k1 = $('.k1', root), k2 = $('.k2', root), cards = $$('.intent', root), items = $$('.direct .item, .direct .promise', root);
      [wm, k1, k2, ...cards, ...items].forEach(x => x.getAnimations().forEach(a => a.cancel()));
      if (reduce) { k1.style.clipPath = k2.style.clipPath = 'none'; [wm, ...cards, ...items].forEach(x => x.animate([{ opacity: 0 }, { opacity: x === wm ? .045 : 1 }], { duration: 200, fill: 'forwards' })); return; }
      const d0 = revealBase, BR = [{ clipPath: 'inset(-12% 100% -18% 0)' }, { clipPath: 'inset(-12% -4% -18% 0)' }];
      wm.animate([{ opacity: 0 }, { opacity: .07 }], { duration: 800, delay: d0, easing: EO, fill: 'both' });
      k1.animate(BR, { duration: 450, delay: d0, easing: EB, fill: 'forwards' });
      k2.animate(BR, { duration: 350, delay: d0 + 450, easing: EB, fill: 'forwards' }).onfinish = () => { const r = k2.getBoundingClientRect(); fxBurst(r.right - 6, r.bottom - r.height * .28, 8, 30, 400); };
      cards.forEach((c, i) => c.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: d0 + 600 + i * 40, easing: EO, fill: 'backwards' }));
      items.forEach((c, i) => c.animate([{ opacity: 0, transform: 'translateX(16px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: d0 + 700 + i * 50, easing: EO, fill: 'backwards' }));
    },
    lost(root) {
      const box = $('#lost', root);
      $$('.mist', box).forEach((cv, li) => {
        const w = innerWidth, h = box.offsetHeight || innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5);
        cv.width = w * 2 * dpr; cv.height = h * dpr; const c = cv.getContext('2d'); c.scale(dpr, dpr);
        let seed = li ? 7 : 3; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
        for (let i = 0; i < 26; i++) { const x = rnd() * w, y = h * (.25 + rnd() * .8), r = 120 + rnd() * 260;
          [x, x + w].forEach(px => { const g = c.createRadialGradient(px, y, 0, px, y, r); g.addColorStop(0, 'rgba(206,200,192,.32)'); g.addColorStop(1, 'rgba(206,200,192,0)'); c.fillStyle = g; c.fillRect(px - r, y - r, r * 2, r * 2); }); }
      });
      box.classList.remove('in'); setTimeout(() => box.classList.add('in'), reduce ? 0 : revealBase);
    }
  };

  // FAQ: answers settle in instead of snapping open
  $$('.faq:not(.cfaq) details').forEach(d => d.addEventListener('toggle', () => { if (d.open && !reduce) $('.ans', d).animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.23,1,.32,1)' }); }));

  /* ---------------- contact form ---------------- */
  const FIELDS = {
    hire: [['name', 'Your name', 'text', 'Farhana Kabir'], ['company', 'Company', 'text', 'Company name'], ['role', 'Role you are hiring for', 'text', 'Head of Product'], ['email', 'Work email', 'email', 'you@company.com'], ['msg', 'About the role', 'textarea', 'Team, scope, location or remote, timeline', 1]],
    consulting: [['name', 'Your name', 'text', 'Farhana Kabir'], ['company', 'Company', 'text', 'Company name'], ['email', 'Email', 'email', 'you@company.com'], ['budget', 'Budget range', 'text', 'Rough range is fine'], ['msg', 'What do you need help with?', 'textarea', 'The goal, what is in the way, and your timeline', 1]],
    partner: [['name', 'Your name', 'text', 'Farhana Kabir'], ['company', 'Agency or company', 'text', 'Company name'], ['email', 'Email', 'email', 'you@company.com'], ['start', 'Start date', 'text', 'Next month'], ['msg', 'The project', 'textarea', 'Project type, duration and where you need a senior PM or BA', 1]],
    other: [['name', 'Your name', 'text', 'Farhana Kabir'], ['email', 'Email', 'email', 'you@email.com'], ['msg', 'Message', 'textarea', 'What would you like to talk about?', 1]]
  };
  let currentIntent = 'hire', pendingIntent = null;
  var navOpts = null;
  const setIntent = (i) => {
    currentIntent = i;
    $$('.intent').forEach(b => b.setAttribute('aria-checked', String(b.dataset.i === i)));
    const box = $('#fields'), keep = {};
    $$('input,textarea', box).forEach(el => keep[el.name] = el.value);
    box.innerHTML = FIELDS[i].map(([n, l, t, p, full]) => `<div class="f${full ? ' full' : ''}"><label for="f-${n}">${l}</label>${t === 'textarea' ? `<textarea id="f-${n}" name="${n}" placeholder="${p}"></textarea>` : `<input id="f-${n}" name="${n}" type="${t}" placeholder="${p}" autocomplete="${n === 'email' ? 'email' : n === 'name' ? 'name' : 'off'}">`}<span class="err" id="e-${n}"></span></div>`).join('');
    $$('input,textarea', box).forEach(el => { if (keep[el.name]) el.value = keep[el.name]; });
    if (!reduce) $$('.f', box).forEach((f, k) => f.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: k * 40, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards' }));
  };
  $$('.intent').forEach(b => b.onclick = () => setIntent(b.dataset.i));
  $('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true; const data = {};
    $$('.f', e.target).forEach(f => {
      const el = $('input,textarea', f), v = el.value.trim(); data[el.name] = v; f.classList.remove('bad'); $('.err', f).textContent = '';
      let m = '';
      if (['name', 'email', 'msg'].includes(el.name) && !v) m = 'Add this so I can reply.';
      else if (el.name === 'email' && v && !/^\S+@\S+\.\S+$/.test(v)) m = 'Check the email address, it looks incomplete.';
      if (m) { ok = false; void f.offsetWidth; f.classList.add('bad'); $('.err', f).textContent = m; el.setAttribute('aria-describedby', 'e-' + el.name); el.setAttribute('aria-invalid', 'true'); }
      else { el.removeAttribute('aria-invalid'); }
    });
    if (!ok) { $('.f.bad input, .f.bad textarea').focus(); return; }
    const label = { hire: 'Full-time role', consulting: 'Consulting', partner: 'Project partnership', other: 'General' }[currentIntent];
    $('#sentText').textContent = `Subject: ${label} enquiry from ${data.name}\n\n` + FIELDS[currentIntent].map(([n, l]) => `${l}: ${data[n] || '-'}`).join('\n');
    const s = $('#sent'); s.classList.remove('go'); swapTo(true); void s.offsetWidth; s.classList.add('go');
  });
  $('#editMsg').onclick = () => swapTo(false);
  function swapTo(toSent) {
    const box = $('#cbox'), from = toSent ? $('#cform') : $('#sent'), to = toSent ? $('#sent') : $('#cform'), EO = 'cubic-bezier(.23,1,.32,1)';
    [box, from, to].forEach(x => x.getAnimations().forEach(a => a.cancel()));
    if (reduce) { from.hidden = true; to.hidden = false; to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 }); return; }
    const h0 = box.offsetHeight;
    to.hidden = false; to.classList.add('swap-in'); const h1 = to.offsetHeight;
    box.style.height = h0 + 'px'; box.classList.add('morphing');
    box.animate([{ height: h0 + 'px' }, { height: h1 + 'px' }], { duration: 300, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' });
    from.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 180, easing: EO, fill: 'forwards' }).onfinish = () => { from.hidden = true; from.getAnimations().forEach(a => a.cancel()); };
    to.animate([{ opacity: 0, transform: 'translateY(12px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: 120, easing: EO, fill: 'backwards' }).onfinish = () => {
      to.classList.remove('swap-in'); box.getAnimations().forEach(a => a.cancel()); box.style.height = ''; box.classList.remove('morphing'); };
    const first = $('button, input, textarea', to); setTimeout(() => first && first.focus({ preventScroll: true }), 300);
  }
  const copyText = async (txt, btn) => { try { await navigator.clipboard.writeText(txt); const lbl = $('.c-lbl', btn); clearTimeout(btn._t); btn.classList.add('ok'); if (lbl) lbl.textContent = 'Copied'; btn._t = setTimeout(() => { btn.classList.remove('ok'); if (lbl) lbl.textContent = 'Copy message'; }, 1400); } catch { const r = document.createRange(); r.selectNodeContents($('#sentText')); getSelection().removeAllRanges(); getSelection().addRange(r); } };
  $('#copyMsg').onclick = (e) => copyText($('#sentText').textContent, e.currentTarget);
  $('#mailMsg').onclick = (e) => { e.currentTarget.href = 'mailto:nayeebrahman@gmail.com?subject=' + encodeURIComponent('Hello from your portfolio') + '&body=' + encodeURIComponent($('#sentText').textContent); };
  $$('[data-copy]').forEach(b => b.onclick = () => copyText(b.dataset.copy, b));

  /*__SHELL__*/
  /* ---------------- router + chapter wipe ---------------- */
  const pages = Object.fromEntries($$('.page').map(p => [p.dataset.page, p]));
  const wipe = $('#wipe'), panel = $('.wipe-panel', wipe), label = $('.wipe-label', wipe);
  let current = null, busy = false;
  const WIPES = { lightning: 'linear-gradient(100deg,#BFE6FF,#3B82F6 45%,#1E3A8A)', shadow: 'linear-gradient(100deg,#D6C2FF,#A472E0 45%,#3B1F7A)', flame: 'linear-gradient(100deg,#FCA03A,#FA7402 45%,#C2410C)' };
  const parse = () => {
    const h = (location.hash || '#home').slice(1);
    if (h.startsWith('case-') && bySlug[h.slice(5)]) return { page: 'case', slug: h.slice(5) };
    if (pages[h] && h !== 'case') return { page: h };
    if (h === 'main') return null;
    return { page: 'lost' };
  };
  const show = (r) => {
    killPage();
    Object.values(pages).forEach(p => p.hidden = true);
    const el = pages[r.page];
    if (r.page === 'case') { const c = bySlug[r.slug]; renderCase(c); document.title = `${c.title} - Nayeeb Rahman`; }
    else document.title = el.dataset.title;
    el.hidden = false;
    $$('#navLinks > li > a').forEach(a => { const t = a.dataset.nav || a.getAttribute('href').slice(1); a.toggleAttribute('aria-current', t === r.page || (r.page === 'case' && t === 'cases')); if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page'); });
    $$('#navCases a, #sheetCases a').forEach(a => a.classList.toggle('on', r.page === 'case' && a.getAttribute('href') === '#case-' + r.slug));
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); window.scrollTo(0, 0);
    moveInd();
    reveal(el);
    SETUP[r.page] && SETUP[r.page](el);
    enhance(el);
    if (hasGsap) requestAnimationFrame(() => ScrollTrigger.refresh());
    current = r.page + (r.slug || '');
  };
  const go = async () => {
    const r = parse(); if (!r) return;
    const key = r.page + (r.slug || '');
    if (key === current) return;
    closeSheet(true);
    let seenBefore = false;
    try { const ss = JSON.parse(sessionStorage.getItem('nr_seen') || '[]'); seenBefore = ss.includes(key); if (!seenBefore) { ss.push(key); sessionStorage.setItem('nr_seen', JSON.stringify(ss)); } } catch (e) {}
    if (navOpts && navOpts.direct) { navOpts = null; show(r); return; }
    if (seenBefore && current !== null && !reduce && !busy) { navOpts = null; busy = true; const main = $('#main');
      await main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: 'ease-out', fill: 'forwards' }).finished.catch(() => {});
      revealBase = 0; quietUntil = performance.now() + 300; show(r); revealBase = 120;
      const el = pages[r.page], top = el.querySelector('.page-hero, .c1, .hero');
      document.getAnimations().forEach(an => { const t = an.effect && an.effect.target, tm = an.effect && an.effect.getComputedTiming(); if (t && top && top.contains(t) && tm && tm.iterations !== Infinity && !(typeof CSSAnimation !== 'undefined' && an instanceof CSSAnimation) && !(typeof CSSTransition !== 'undefined' && an instanceof CSSTransition)) { try { an.finish(); } catch (e) {} } });
      main.getAnimations().forEach(a => a.cancel()); main.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'ease-out' });
      busy = false; const again = parse(); if (again && again.page + (again.slug || '') !== current) go(); return; }
    if (current === null || reduce || busy || !panel.animate) { navOpts = null;
      if (current !== null && reduce) { await $('#main').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200 }).finished.catch(() => {}); show(r); $('#main').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 }); return; }
      show(r); return;
    }
    busy = true;
    const el = pages[r.page], main = $('#main'), sigEl = $('.wipe-sig', label), kEl = $('.k', label), nEl = $('.n', label);
    kEl.textContent = r.page === 'case' ? '第' + (CASES.indexOf(bySlug[r.slug]) + 1) + '話' : el.dataset.k;
    nEl.textContent = r.page === 'case' ? bySlug[r.slug].title : el.dataset.name;
    wipe.style.visibility = 'visible';
    const o = navOpts || {}; navOpts = null; const tin = o.tin || 250, hold = o.hold || 300, tout = o.tout || 250;
    panel.style.background = WIPES[o.theme] || ''; label.style.color = o.theme === 'shadow' || o.theme === 'lightning' ? '#F2EEE8' : '';
    const EIO = 'cubic-bezier(.77,0,.175,1)', EO = 'cubic-bezier(.23,1,.32,1)', EB = 'cubic-bezier(.65,0,.35,1)';
    // phase 1 (0-250): old page dims while the brush panel sweeps in
    const dim = main.animate([{ opacity: 1 }, { opacity: .6 }], { duration: tin, fill: 'forwards' });
    await panel.animate([{ transform: 'translateX(-125%) skewX(-14deg)' }, { transform: 'translateX(0) skewX(-14deg)' }], { duration: tin, easing: EIO, fill: 'forwards' }).finished;
    // phase 2 (250-550): sigil flash, kanji and title paint on
    label.style.opacity = '1';
    sigEl.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 220, easing: EO, fill: 'forwards' });
    kEl.animate([{ clipPath: 'inset(-10% 100% -10% 0)' }, { clipPath: 'inset(-10% -6% -10% 0)' }], { duration: 240, delay: 40, easing: EB, fill: 'forwards' });
    nEl.animate([{ clipPath: 'inset(-20% 100% -20% 0)' }, { clipPath: 'inset(-20% -2% -20% 0)' }], { duration: 220, delay: 110, easing: EB, fill: 'forwards' });
    dim.cancel(); revealBase = hold + 100; // new hero headline starts painting at ~650ms
    show(r); revealBase = 120;
    await new Promise(res => setTimeout(res, hold));
    // phase 3 (550-800): panel exits right, revealing the new page
    label.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: 'forwards' }).onfinish = () => { label.style.opacity = ''; label.getAnimations().forEach(an => an.cancel()); [sigEl, kEl, nEl].forEach(x => x.getAnimations().forEach(an => an.cancel())); };
    await panel.animate([{ transform: 'translateX(0) skewX(-14deg)' }, { transform: 'translateX(125%) skewX(-14deg)' }], { duration: tout, easing: EIO, fill: 'forwards' }).finished;
    wipe.style.visibility = 'hidden'; busy = false;
    const again = parse(); if (again && again.page + (again.slug || '') !== current) go();
  };
  document.addEventListener('click', (e) => { const a = e.target.closest('a[data-intent]'); if (a) pendingIntent = a.dataset.intent; });
  addEventListener('hashchange', go);

  go();
})();
