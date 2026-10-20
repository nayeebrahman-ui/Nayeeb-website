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
await p.goto('http://site/index.html#home'); await W(p,1500);
await p.evaluate(()=>location.hash='#about'); await W(p,700); await S(p,'ab-intro1'); await W(p,1400); await S(p,'ab-intro2');
for(const f of [.12,.26,.5,.9]){await at(p,'#origin',f,4); await S(p,'ab-org-'+f);}
await p.evaluate(()=>document.querySelector('#prs').scrollIntoView({block:'center'})); await W(p,1400);
const r=await p.locator('.pr').nth(1).boundingBox(); await p.mouse.move(r.x+300,r.y+r.height/2,{steps:5}); await W(p,400); await S(p,'ab-prs');
await p.evaluate(()=>document.querySelector('#vqs').scrollIntoView({block:'center'})); await W(p,1300);
const v=await p.locator('.vq').nth(1).boundingBox(); await p.mouse.move(v.x+v.width*.8,v.y+v.height*.25,{steps:10}); await W(p,2200); await S(p,'ab-vq');
await p.evaluate(()=>document.querySelector('#collage').scrollIntoView({block:'center'})); await W(p,1500);
const pl=await p.locator('.pol').nth(1).boundingBox(); await p.mouse.move(pl.x+pl.width/2,pl.y+pl.height/2,{steps:5}); await W(p,700); await S(p,'ab-pol');
await p.evaluate(()=>document.querySelector('#abClose').scrollIntoView({block:'center'})); await W(p,1800); await S(p,'ab-close');
await p.click('#abClose .sig-go'); await W(p,1400); console.log('after signal', await p.evaluate(()=>[location.hash, document.querySelector('.intent[aria-checked="true"]')?.dataset.i]));
console.log('desk errors',p.errs);
const m=await mk(390,844,true); await m.goto('http://site/index.html#about'); await W(m,1800); await S(m,'ab-m1');
await m.evaluate(()=>document.querySelector('#origin').scrollIntoView()); await W(m,800); await S(m,'ab-m2');
await m.evaluate(()=>document.querySelector('#abClose').scrollIntoView({block:'center'})); await W(m,1500); await S(m,'ab-m3');
console.log('mob', await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth), m.errs);
await b.close();