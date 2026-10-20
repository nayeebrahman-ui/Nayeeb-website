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
const p=await mk(1440,900,false);
await p.goto('http://site/index.html#hire'); await W(p,1500);
await p.evaluate(()=>{const e=document.querySelector('.ep'); window.scrollTo(0,e.getBoundingClientRect().top+scrollY-200)}); await W(p,1500);
console.log(await p.evaluate(()=>{const e=document.querySelector('.ep');return {fx:e.dataset.fx,cls:e.className,top:e.getBoundingClientRect().top}}));
const bx=await p.locator('.ep').first().boundingBox(); await p.mouse.move(bx.x+10,bx.y+10); await p.mouse.move(bx.x+bx.width*.85,bx.y+bx.height*.2,{steps:8}); await W(p,300);
console.log(await p.locator('.ep').first().evaluate(e=>[e.style.rotate,getComputedStyle(e).rotate])); await S(p,'d-tilt');
const m=await mk(390,844,true); await m.goto('http://site/index.html#home'); await W(m,1200); await m.tap('#menuBtn'); await W(m,900);
console.log(await m.evaluate(()=>getComputedStyle(document.querySelector('.sheet-bg img')).opacity));
await b.close();