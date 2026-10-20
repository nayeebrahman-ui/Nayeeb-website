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
await p.evaluate(()=>location.hash='#partner'); await W(p,1200); await S(p,'p-h1'); await W(p,2000); await S(p,'p-h2');
await p.evaluate(()=>document.querySelector('#pts').scrollIntoView({block:'center'})); await W(p,1300);
const t=await p.locator('.pt').nth(2).boundingBox(); await p.mouse.move(t.x+t.width/2,t.y+t.height/2,{steps:6}); await W(p,500); await S(p,'p-tiles');
await p.mouse.move(5,450);
await p.evaluate(()=>{const e=document.querySelector('#pSpine');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-innerHeight*.2)}); await W(p,1000); await S(p,'p-spine');
for(const f of [.5,1]){await at(p,'#fan',f,1.5); await W(p,600); await S(p,'p-fan-'+f);}
const d=await p.locator('.doc').nth(0).boundingBox(); await p.mouse.move(d.x+d.width/2,d.y+d.height/2,{steps:5}); await W(p,500); await S(p,'p-fan-hover');
await p.mouse.click(d.x+d.width/2,d.y+d.height/2); await W(p,500); await p.keyboard.press('ArrowRight'); await W(p,500); await S(p,'p-lb');
console.log('lb title', await p.evaluate(()=>document.getElementById('lbTitle').textContent)); await p.keyboard.press('Escape');
await p.evaluate(()=>document.querySelector('#tms').scrollIntoView({block:'center'})); await W(p,1300); await S(p,'p-terms');
await p.evaluate(()=>document.querySelector('#pClose').scrollIntoView({block:'center'})); await W(p,1500); await S(p,'p-close');
await p.click('#pClose .cc-go'); await W(p,1400); console.log('signal', await p.evaluate(()=>[location.hash, document.querySelector('.intent[aria-checked="true"]')?.dataset.i]));
console.log('desk errors',p.errs);
const mo=await mk(390,844,true); await mo.goto('http://site/index.html#partner'); await W(mo,2600); await S(mo,'p-m1');
await mo.evaluate(()=>document.querySelector('#fan').scrollIntoView({block:'center'})); await W(mo,1000); await S(mo,'p-m2');
console.log('mob', await mo.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]), mo.errs);
await b.close();