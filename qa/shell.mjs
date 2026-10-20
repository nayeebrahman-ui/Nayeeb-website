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
await p.goto('http://site/index.html#hire'); await W(p,150); await S(p,'d-load0'); await W(p,1100); await S(p,'d-load1');
const st=async()=>p.evaluate(()=>({cls:document.getElementById('nav').className, y:scrollY, ind:document.getElementById('navInd').getBoundingClientRect().x|0, cur:document.querySelector('#navLinks a[aria-current]')?.getBoundingClientRect().x|0, prog:document.querySelector('#progress i').style.transform}));
console.log('top',await st());
await p.mouse.move(700,500); for(let i=0;i<6;i++){await p.mouse.wheel(0,300); await W(p,60);} await W(p,900); console.log('after down',await st());
await p.mouse.wheel(0,-120); await W(p,500); console.log('after up',await st()); await S(p,'d-solid');
// tilt on a timeline card
const ep=p.locator('.ep').first(); await ep.scrollIntoViewIfNeeded(); await W(p,900); const bx=await ep.boundingBox(); await p.mouse.move(bx.x+bx.width*.85,bx.y+bx.height*.2,{steps:8}); await W(p,400); await S(p,'d-tilt'); console.log('rotate',await ep.evaluate(e=>e.style.rotate));
// cursor over a link
const cta=await p.locator('#navCta a').boundingBox(); await p.mouse.move(cta.x+20,cta.y+10,{steps:6}); await W(p,400); await S(p,'d-cur'); console.log('cur', await p.evaluate(()=>document.getElementById('cur').className));
// route wipe to work
await p.evaluate(()=>location.hash='#work'); await W(p,120); await S(p,'d-w1'); await W(p,300); await S(p,'d-w2'); await W(p,550); await S(p,'d-w3'); await W(p,800); console.log('on work',await st());
// footer
await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight)); await W(p,2200); await S(p,'d-foot');
// 404
await p.evaluate(()=>location.hash='#nope'); await W(p,2400); await S(p,'d-404');
console.log('desk errors',p.errs);
const m=await mk(390,844,true);
await m.goto('http://site/index.html#home'); await W(m,1500);
await m.tap('#menuBtn'); await W(m,140); await S(m,'m-menu1'); await W(m,600); await S(m,'m-menu2');
await m.tap('#sheet a[href="#about"]'); await W(m,60); await S(m,'m-exit'); await W(m,1400); await S(m,'m-about');
console.log('mob', await m.evaluate(()=>({open:document.getElementById('sheet').className, nav:document.getElementById('nav').className, ov:document.documentElement.scrollWidth>innerWidth})), m.errs);
await b.close();
