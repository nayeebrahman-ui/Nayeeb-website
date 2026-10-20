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
await p.goto('http://site/index.html#home'); await W(p,1200);
await p.evaluate(()=>{const e=document.querySelector('#panTrack'); scrollTo(0,e.getBoundingClientRect().top+scrollY-100)}); await W(p,1500); await S(p,'o2-pan');
await p.goto('http://site/index.html#work'); await W(p,1500); await p.evaluate(()=>scrollTo(0,1150)); await W(p,1500); await S(p,'o2-work2');
await p.evaluate(()=>scrollTo(0,1900)); await W(p,1500); await S(p,'o2-work3');
const m=await mk(390,844,true);
await m.goto('http://site/index.html#work'); await W(m,1500); await m.evaluate(()=>scrollTo(0,700)); await W(m,1500); await S(m,'o2-mwork');
await m.goto('http://site/index.html#case-tripploy'); await W(m,2500); await S(m,'o2-mcase');
await p.goto('http://site/index.html#case-tripploy'); await W(p,2500); await S(p,'o2-case');
console.log(p.errs,m.errs); await b.close();
