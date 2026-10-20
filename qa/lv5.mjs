import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio'; const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const mk=async(w,h,touch)=>{const p=await b.newPage({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch}); p.errs=[]; p.on('pageerror',e=>p.errs.push(e.message));
await p.route('**/*',async r=>{const u=r.request().url();
 if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
 if(u.includes('jsdelivr')) return r.fulfill({path:root+'/node_modules/lenis/dist/lenis.min.js',contentType:'application/javascript'});
 if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
 if(u.includes('/fonts/')){return r.fulfill({path:root+'/node_modules/@fontsource/'+u.split('/fonts/')[1]});}
 if(u.startsWith('http://site/')){const fp=u.replace('http://site/','').split('#')[0]||'index.html'; if(fp.endsWith('.html')) return r.fulfill({body:'<meta name="viewport" content="width=device-width,initial-scale=1">'+fs.readFileSync(root+'/site/'+fp,'utf8'),contentType:'text/html; charset=utf-8'}); return r.fulfill({path:root+'/site/'+fp});}
 return r.abort();}); return p;};
const S=(p,n)=>p.screenshot({path:`${root}/qa/sh-${n}.png`});
const W=(p,ms)=>p.waitForTimeout(ms);

const at=async(p,sel,frac,dist)=>{await p.evaluate(([sel,frac,dist])=>{const el=document.querySelector(sel);const host=el.closest('.pin-spacer')||el;const y=host.getBoundingClientRect().top+scrollY+innerHeight*dist*frac;window.scrollTo(0,y)},[sel,frac,dist]); await W(p,900);};
const p=await mk(1440,900,false);
for (const s of ['apple-gadgets','ai-idp']) { await p.goto('http://site/index.html#case-'+s); await W(p,1500); await p.mouse.move(700,300); await W(p,200); await S(p,'lv5-'+s);
  console.log(s, await p.evaluate(()=>{const c=document.querySelector('.c1-live');return [c?.closest('[data-live]')?.dataset.live, c?.width]})); }
await p.goto('http://site/index.html#work'); await W(p,2000);
console.log('live cards', await p.locator('.case-card[data-live]').count(), 'with canvas', await p.locator('.case-card[data-live] .card-live').count());
const c0=p.locator('#workGrid .case-card[data-live="forge"]'); await c0.scrollIntoViewIfNeeded(); await W(p,900); await c0.locator('.media').hover(); await W(p,150); await S(p,'lv5-card-forge');
await p.goto('http://site/index.html#consulting'); await W(p,2000); console.log('consult live', await p.locator('#consultGrid .card-live').count());
console.log('desk errs',p.errs);
const m=await mk(390,844,true); await m.goto('http://site/index.html#case-apple-gadgets'); await W(m,2000); await S(m,'lv5-m');
console.log('mob',await m.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]),m.errs);
await b.close();
