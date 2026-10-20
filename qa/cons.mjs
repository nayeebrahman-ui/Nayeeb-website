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
await p.evaluate(()=>location.hash='#consulting'); await W(p,1300); await S(p,'c-h1'); await W(p,1600); await S(p,'c-h2');
await p.evaluate(()=>window.scrollTo(0,innerHeight*.6)); await W(p,900); await S(p,'c-h3');
await p.evaluate(()=>document.querySelector('#cts').scrollIntoView({block:'center'})); await W(p,1200);
const t=await p.locator('.ct').first().boundingBox(); await p.mouse.move(t.x+t.width*.3,t.y+t.height/2,{steps:6}); await W(p,700); await S(p,'c-tracks');
await p.evaluate(()=>document.querySelector('#cms').scrollIntoView({block:'center'})); await W(p,1200);
const m=await p.locator('#cms .model').nth(1).boundingBox(); await p.mouse.move(m.x+m.width*.8,m.y+m.height*.2,{steps:8}); await W(p,600); await S(p,'c-models');
await p.mouse.move(5,450);
for(const f of [.35,.7]){await p.evaluate(f=>{const e=document.querySelector('#pipe');const y=e.getBoundingClientRect().top+scrollY;window.scrollTo(0,y-innerHeight*(0.72-f*0.5))},f); await W(p,900); await S(p,'c-pipe-'+f);}
await p.evaluate(()=>document.querySelector('#consultGrid').scrollIntoView({block:'center'})); await W(p,2000); await S(p,'c-results');
console.log('bigs', await p.evaluate(()=>[...document.querySelectorAll('#consultGrid .big')].map(b=>b.textContent.slice(0,14))));
await p.evaluate(()=>document.querySelector('#cFaq').scrollIntoView({block:'center'})); await W(p,900);
await p.click('#cFaq details:nth-child(1) summary'); await W(p,600); await p.click('#cFaq details:nth-child(4) summary'); await W(p,600); await S(p,'c-faq');
console.log('open', await p.evaluate(()=>[...document.querySelectorAll('#cFaq details')].map(d=>d.open)));
await p.evaluate(()=>document.querySelector('#cClose').scrollIntoView({block:'center'})); await W(p,1600); await S(p,'c-close');
await p.click('.cc-go'); await W(p,1400); console.log('signal', await p.evaluate(()=>[location.hash, document.querySelector('.intent[aria-checked="true"]')?.dataset.i]));
console.log('desk errors',p.errs);
const mo=await mk(390,844,true); await mo.goto('http://site/index.html#consulting'); await W(mo,2600); await S(mo,'c-m1');
await mo.evaluate(()=>{const e=document.querySelector('#pipe');e.scrollIntoView({block:'start'})}); await W(mo,1000); await S(mo,'c-m2');
console.log('mob', await mo.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]), mo.errs);
await b.close();