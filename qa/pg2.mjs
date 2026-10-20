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
for (const [w,h,t,d] of [[1440,900,false,'d'],[390,844,true,'m']]) {
 const p=await mk(w,h,t); const shot=async(sel,n)=>{const el=await p.$(sel); if(!el){console.log('miss',sel);return;} await el.scrollIntoViewIfNeeded(); await W(p,1600); await el.screenshot({path:`${root}/qa/sh-p2-${d}-${n}.png`}).catch(e=>console.log(n,e.message.slice(0,60)));};
 await p.goto('http://site/index.html#hire'); await W(p,1500); await shot('#hClose','hclose');
 await p.goto('http://site/index.html#consulting'); await W(p,1500); await shot('#cClose','cclose');
 await p.goto('http://site/index.html#partner'); await W(p,1500); await shot('#pClose','pclose');
 await p.goto('http://site/index.html#contact'); await W(p,2200); await p.screenshot({path:`${root}/qa/sh-p2-${d}-contact.png`});
 await p.evaluate(()=>{const s=document.getElementById('sent');s.hidden=false;document.getElementById('cform').hidden=true;}); await shot('#sent','sent');
 await shot('#foot','foot');
 await p.goto('http://site/index.html#work'); await W(p,2400); await p.screenshot({path:`${root}/qa/sh-p2-${d}-work.png`});
 await p.goto('http://site/index.html#lost'); await W(p,2200); await p.screenshot({path:`${root}/qa/sh-p2-${d}-lost.png`});
 await p.goto('http://site/index.html#about'); await W(p,2000);
 if (d==='d'){ for (const f of [.35,.6,.9]){ await p.evaluate((f)=>{const o=document.getElementById('origin');const sp=o.closest('.pin-spacer')||o;scrollTo(0,sp.getBoundingClientRect().top+scrollY+innerHeight*4*f)},f); await W(p,1800); await p.screenshot({path:`${root}/qa/sh-p2-${d}-ab${f}.png`}); } }
 else { const ocs=await p.$$('.oc-img'); for (let i=1;i<4;i++){ await ocs[i].scrollIntoViewIfNeeded(); await W(p,1400); await ocs[i].screenshot({path:`${root}/qa/sh-p2-${d}-ab${i}.png`}); } }
 console.log(d,'errs',p.errs); await p.close();
}
await b.close();
