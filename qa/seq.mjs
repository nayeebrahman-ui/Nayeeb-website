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
await p.goto('http://site/index.html#home'); await W(p,2000);
for(const f of [.3,.5,.72,.97]){await at(p,'#hero',f,3); await S(p,'x-hero-'+f);}
console.log('stats',await p.evaluate(()=>[...document.querySelectorAll('#heroStats b')].map(b=>b.textContent).join(' ')));
await at(p,'#pan',.5,2); await S(p,'x-pan');
await p.evaluate(()=>location.hash='#about'); await W(p,1500);
for(const f of [.05,.25,.6]){await at(p,'#origin',f,4); await S(p,'x-origin-'+f);}
await p.evaluate(()=>{document.querySelector('#collage').scrollIntoView({block:'center'})}); await W(p,1800); await S(p,'x-collage');
await p.evaluate(()=>location.hash='#hire'); await W(p,1500);
for(const f of [.1,.5,.92]){await at(p,'#howSec',f,2.5); await S(p,'x-how-'+f);}
await p.evaluate(()=>location.hash='#partner'); await W(p,1500);
for(const f of [0,.5,1]){await at(p,'#fan',f,1.5); await S(p,'x-fan-'+f);}
const d=await p.locator('.doc').nth(1).boundingBox(); await p.mouse.move(d.x+d.width/2,d.y+d.height/2,{steps:5}); await W(p,500); await S(p,'x-fan-hover');
await p.mouse.click(d.x+d.width/2,d.y+d.height/2); await W(p,500); await p.click('#lbIn'); await W(p,400); await S(p,'x-lb'); await p.keyboard.press('Escape'); await W(p,200);
console.log('lb hidden', await p.evaluate(()=>document.getElementById('lightbox').hidden));
await p.evaluate(()=>location.hash='#case-apple-gadgets'); await W(p,1500);
await p.evaluate(()=>{const e=document.querySelector('#caseSteps');window.scrollTo(0,e.getBoundingClientRect().top+scrollY+e.offsetHeight*.4-innerHeight*.5)}); await W(p,1000); await S(p,'x-steps');
await p.evaluate(()=>{const e=document.querySelector('.results');e.scrollIntoView({block:'center'})}); await W(p,1300); await S(p,'x-results');
console.log('desk errors',p.errs);
const m=await mk(390,844,true);
for(const r of ['#home','#about','#hire','#partner','#case-tripploy']){await m.goto('http://site/index.html'+r); await W(m,1500); await m.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight*.5)); await W(m,900); await S(m,'x-m'+r.slice(1)); console.log(r, await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth));}
console.log('mob errors',m.errs);
await b.close();