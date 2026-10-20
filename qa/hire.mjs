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
await p.evaluate(()=>location.hash='#hire'); await W(p,1300); await S(p,'h-1'); await W(p,2200); await S(p,'h-2');
await W(p,3600); console.log('role', await p.evaluate(()=>document.querySelector('.slot-in').textContent));
await p.evaluate(()=>{const e=document.querySelector('#rtl');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-innerHeight*.15)}); await W(p,1300);
const c=await p.locator('.rt-card').first().boundingBox(); await p.mouse.move(c.x+c.width/2,c.y+c.height/2,{steps:5}); await W(p,500); await S(p,'h-rt');
await p.mouse.move(5,450);
await at(p,'#howSec',.62,2.5); await W(p,600); await S(p,'h-how');
await p.evaluate(()=>document.querySelector('#sks').scrollIntoView({block:'center'})); await W(p,1400);
const t=await p.locator('.tool').first().boundingBox(); await p.mouse.move(t.x+20,t.y+10,{steps:4}); await W(p,400); await S(p,'h-sk');
await p.evaluate(()=>document.querySelector('#crs').scrollIntoView({block:'center'})); await W(p,1200);
const cr=await p.locator('.cr').nth(1).boundingBox(); await p.mouse.move(cr.x+cr.width/2,cr.y+cr.height/2,{steps:4}); await W(p,200); await S(p,'h-cr');
await p.evaluate(()=>document.querySelector('#hClose').scrollIntoView({block:'center'})); await W(p,1500); await S(p,'h-close');
await p.click('#hClose .hr-go'); await W(p,1400); console.log('signal', await p.evaluate(()=>[location.hash, document.querySelector('.intent[aria-checked="true"]')?.dataset.i]));
console.log('desk errors',p.errs);
const m=await mk(390,844,true); await m.goto('http://site/index.html#hire'); await W(m,3000); await S(m,'h-m1');
await m.evaluate(()=>document.querySelector('#rtl').scrollIntoView()); await W(m,1200); await S(m,'h-m2');
console.log('mob', await m.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]), m.errs);
await b.close();