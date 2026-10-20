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
const p=await mk(1440,900,false); await p.goto('http://site/index.html#home'); await W(p,1800);
const n=await p.locator('#ddBtn').boundingBox(); await p.mouse.move(n.x+n.width/2,n.y+n.height/2,{steps:4}); await W(p,700); await S(p,'dd1');
await p.locator('#navCases a[href="#case-tripploy"]').click(); await W(p,1600);
console.log('route', await p.evaluate(()=>[location.hash, document.querySelector('#navLinks > li > a[aria-current]')?.textContent.trim(), document.querySelector('#navCases a.on')?.textContent]));
await p.mouse.move(700,600); await W(p,400); await S(p,'dd2');
await p.goto('http://site/index.html#work'); await W(p,1500); console.log('work current', await p.evaluate(()=>document.querySelector('#navLinks > li > a[aria-current]')?.textContent.trim()));
await p.keyboard.press('Tab'); 
console.log('desk errors',p.errs);
const m=await mk(390,844,true); await m.goto('http://site/index.html#home'); await W(m,1500); await m.tap('#menuBtn'); await W(m,700); await m.tap('#shCasesBtn'); await W(m,700); await S(m,'dd-m');
await m.tap('#sheetCases a[href="#case-nextlab"]'); await W(m,1600); console.log('mob route', await m.evaluate(()=>[location.hash, document.getElementById('sheet').className]), m.errs);
await b.close();